import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Kein Token vorhanden, Zugriff verweigert');
        }
        const token = authHeader.split(' ')[1];
        const decoded = this.jwtService.verify(token);

        request.user = decoded;

        // Falls keine Rollen benötigt werden, Zugriff erlauben
        if (!requiredRoles) {
            return true;
        }

        // Falls der User mehrere Rollen hat, prüfen wir auf Überschneidungen
        const userRoles = Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles];
        const hasRole = requiredRoles.some((role) => userRoles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('Keine Berechtigung für diese Aktion');
        }

        return true;
    }
}
