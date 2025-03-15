import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RoleEntity} from '../entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
    ) {}

    async findAll() {
        return this.roleRepository.find();
    }

    async findOne(id: string):Promise<RoleEntity> {
       return await this.roleRepository.findOneByOrFail({id})
    }

}
