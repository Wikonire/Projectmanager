import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto, UpdateUserDto} from '../dtos/user.dto';
import {UserEntity} from '../entities/user.entity';
import {RoleEntity} from '../entities/role.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['roles', 'employee'] });
        if (!user) {
            throw new NotFoundException(`Benutzer mit ID ${id} nicht gefunden`);
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<UserEntity | null> {
        return  await this.userRepository.findOneOrFail({ where: { username}, relations: ['roles', 'employee'] });
    }


    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const { role, ...userData } = createUserDto;

        const roleEntity = await this.roleRepository.findOne({ where: { name: role } });
        const { username, email } = createUserDto;

        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });

        if (existingUser) {
            throw new ConflictException('Benutzername oder E-Mail sind bereits vergeben');
        }


        if (!roleEntity) {
            throw new NotFoundException(`Rolle '${role}' existiert nicht.`);
        }

        const user = this.userRepository.create({
            ...userData,
            roles: [roleEntity],
        });
        return this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findOne(id);
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }


    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}
