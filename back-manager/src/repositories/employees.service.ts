import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {EmployeeEntity} from '../entities/employee.entity';
import {CreateEmployeeDto, CreateEmployeeUserDto, UpdateEmployeeDto} from '../dtos/employee.dto';
import {UserEntity} from '../entities/user.entity';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(EmployeeEntity)
        private readonly employeeRepository: Repository<EmployeeEntity>,
    ) {}

    async findAll(): Promise<any> {
        /*const employees = await this.employeeRepository.find({ relations: ['user',
                'employeePmFunctions', 'employeePmFunctions'] });
        employees.map(employee => {
            console.log(employee.employeePmFunctions)});*/

       return this.userRepository.find({ relations: ['employee', 'employee.employeePmFunctions.pmFunction']});


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
