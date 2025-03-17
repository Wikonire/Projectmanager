import { IsString, IsUUID, IsOptional } from 'class-validator';
import {UserResponseDto} from './user.dto';
import {EmployeePmFunction} from '../entities/employee-pm-function.entity';

export class CreateEmployeeUserDto {
    @IsUUID()
    id: string;

    @IsOptional()
    user: UserResponseDto;

    @IsOptional()
    employeesFunction: EmployeePmFunction[];

    @IsString()
    last_name: string;

    @IsString()
    first_name: string;
}


export class CreateEmployeeDto {
    @IsString()
    last_name: string;

    @IsString()
    first_name: string;
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    last_name?: string;

    @IsOptional()
    @IsString()
    first_name?: string;
}
