import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../repositories/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Ungültige Zugangsdaten');
    }

    async login(user: any) {
        const fullUser = await this.usersService.findOneByUsername(user.username);

        if (!fullUser) {
            throw new UnauthorizedException('Benutzer*in nicht gefunden');
        }

        const roles = fullUser.roles.map(role => role.name); // Array mit Rollennamen
        const payload = { username: fullUser.username, sub: fullUser.id, roles };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }


}
