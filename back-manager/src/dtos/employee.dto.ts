import { IsString, IsUUID, IsOptional } from 'class-validator';

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
