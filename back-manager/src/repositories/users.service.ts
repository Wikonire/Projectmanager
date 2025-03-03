import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto, UpdateUserDto} from '../dtos/user.dto';
import {User} from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Benutzer mit ID ${id} nicht gefunden`);
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { username } });
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id);
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
}
