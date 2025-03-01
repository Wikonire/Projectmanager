import {IsString, IsUUID, IsOptional, IsDate, IsDecimal, ValidateNested} from 'class-validator';
import {CreatePhaseDto} from '../phases/phases.dto';
import { Type } from 'class-transformer';

export class CreateProjectDto {
    @IsString()
    project_reference: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    approval_date?: Date;

    @IsString()
    priority: string;

    @IsString()
    status: string;

    @IsOptional()
    @IsDate()
    planned_start_date?: Date;

    @IsOptional()
    @IsDate()
    planned_end_date?: Date;

    @IsOptional()
    @IsDate()
    actual_start_date?: Date;

    @IsOptional()
    @IsDate()
    actual_end_date?: Date;

    @IsString()
    methodology: string;

    @IsOptional()
    @IsDecimal()
    progress?: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePhaseDto)
    phases?: CreatePhaseDto[];
}

export class UpdateProjectDto extends CreateProjectDto {}

