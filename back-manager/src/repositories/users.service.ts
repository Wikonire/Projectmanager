import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto, UpdateUserDto} from '../dtos/user.dto';
import {UserEntity} from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Benutzer mit ID ${id} nicht gefunden`);
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: { username },
            relations: ['roles'],
        });
    }


    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        await this.findOne(id);
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}
