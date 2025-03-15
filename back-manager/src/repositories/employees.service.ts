import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {EmployeeEntity} from '../entities/employee.entity';
import {CreateEmployeeDto, UpdateEmployeeDto} from '../dtos/employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
    ) {}

    async findAll(): Promise<EmployeeEntity[]> {
        return this.employeeRepository.find({ relations: ['users', 'employeePmFunctions'] });
    }

    async findOne(id: string): Promise<EmployeeEntity> {
        const employee = await this.employeeRepository.findOne({
            where: { id },
            relations: ['users', 'employeePmFunctions'],
        });

        if (!employee) {
            throw new NotFoundException(`Mitarbeitende*r mit ID ${id} nicht gefunden.`);
        }

        return employee;
    }

    async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
        const employee = this.employeeRepository.create(createEmployeeDto);
        return this.employeeRepository.save(employee);
    }

    async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeEntity> {
        const employee = await this.findOne(id);
        Object.assign(employee, updateEmployeeDto);
        return this.employeeRepository.save(employee);
    }

    async remove(id: string): Promise<void> {
        const result = await this.employeeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Mitarbeitende*r mit ID ${id} nicht gefunden.`);
        }
    }
}
