import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';

describe('AuthGuard', () => {
    let authGuard: AuthGuard;
    let jwtService: JwtService;
    let reflector: Reflector;

    beforeEach(() => {
        jwtService = new JwtService({ secret: 'test' });
        reflector = new Reflector();
        authGuard = new AuthGuard(jwtService, reflector);
    });

    function createMockExecutionContext(headers: Record<string, string | undefined>, roles?: string[]): ExecutionContext {
        return {
            getHandler: jest.fn(() => ({})),
            switchToHttp: () => ({
                getRequest: () => ({
                    headers,
                    user: roles ? { roles } : undefined,
                }),
            }),
        } as unknown as ExecutionContext;
    }

    it('should throw an UnauthorizedException if no token is provided', () => {
        const context = createMockExecutionContext({});

        expect(() => authGuard.canActivate(context)).toThrowError(new UnauthorizedException('Kein Token vorhanden, Zugriff verweigert'));
    });

    it('should return true if no roles are required and a valid token is provided', () => {
        const context = createMockExecutionContext({ authorization: 'Bearer validtoken' });

        jest.spyOn(jwtService, 'verify').mockReturnValue({ roles: ['User*in'] });
        jest.spyOn(reflector, 'get').mockReturnValue(undefined); // Keine Rollen benötigt

        expect(authGuard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException if user does not have the required role', () => {
        const context = createMockExecutionContext({ authorization: 'Bearer validtoken' });

        jest.spyOn(jwtService, 'verify').mockReturnValue({ roles: ['User*in'] });
        jest.spyOn(reflector, 'get').mockReturnValue(['Admin']); // Admin-Rolle wird benötigt

        expect(() => authGuard.canActivate(context)).toThrow(new ForbiddenException('Keine Berechtigung für diese Aktion'));
    });

    it('should allow access if the user has the required role', () => {
        const context = createMockExecutionContext({ authorization: 'Bearer validtoken' });

        jest.spyOn(jwtService, 'verify').mockReturnValue({ roles: ['Admin'] });
        jest.spyOn(reflector, 'get').mockReturnValue(['Admin']); // Admin-Rolle wird benötigt

        expect(authGuard.canActivate(context)).toBe(true);
    });

    it('should throw ForbiddenException for an invalid token', () => {
        const context = createMockExecutionContext({ authorization: 'Bearer invalidtoken' });

        jest.spyOn(jwtService, 'verify').mockImplementation(() => {
            throw new ForbiddenException('Ungültiges Token');
        });

        expect(() => authGuard.canActivate(context)).toThrowError(new ForbiddenException('Ungültiges Token'));
    });

});
