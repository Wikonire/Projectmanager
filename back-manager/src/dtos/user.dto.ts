import {IsString, IsOptional, IsUUID} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';

export class CreateUserDto {
    @IsUUID()
    id?: string;

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
