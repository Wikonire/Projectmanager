import { IsString, IsUUID, IsOptional, IsDate, IsDecimal, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePhaseDto } from './phases.dto';
import { ProjectStatusDto } from './project-status.dto';
import { ProjectPriorityDto } from './dtos.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    approval_date?: Date;

    @IsUUID()
    priority_id: string;

    @IsUUID()
    status_id: string;

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

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}


export class ResponseProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProjectPriorityDto)
    priority?: ProjectPriorityDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProjectStatusDto)
    status?: ProjectStatusDto;
}
