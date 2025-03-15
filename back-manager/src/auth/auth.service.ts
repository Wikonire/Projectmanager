import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../repositories/users.service';
import {LoginDto} from '../dtos/login.dto';
import {RoleEntity} from '../entities/role.entity';
import {EmployeeEntity} from '../entities/employee.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entities/user.entity';
import {Repository} from 'typeorm';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result} = user; // entferne password
            return result;
        }
        throw new UnauthorizedException('Ungültige Zugangsdaten');
    }

    async login(user: LoginDto):Promise<{access_token:string}> {
        const fullUser = await this.validateUser(user.username, user.password);
        const payload = { username: fullUser.username, sub: fullUser.id, roles: fullUser.roles.map(role => role.name) };
        return {
            access_token: this.jwtService.sign(payload)
        };

    }
}
