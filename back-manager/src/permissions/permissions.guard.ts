import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';
import {Reflector} from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new ForbiddenException('Kein Token vorhanden, Zugriff verweigert');
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded;

            if (!requiredRoles.includes(decoded.role as Role)) {
                throw new ForbiddenException('Keine Berechtigung für diese Aktion');
            }
            return true;
        } catch (error) {
            throw new ForbiddenException('Ungültiges Token oder keine Berechtigung');
        }
    }
}
