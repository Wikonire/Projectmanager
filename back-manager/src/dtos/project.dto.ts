import {
    IsString,
    IsUUID,
    IsOptional,
    IsDate,
    IsDecimal,
    ValidateNested,
    IsBoolean,
    Min,
    Max,
    IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

import {ProjectPhaseResponseDto} from './project-phase.dto';
import { ProjectStatusDto } from './project-status.dto';
import {CreateMethodologyDto} from '../repositories/methodology.service';
import {MethodologyEntity} from '../entities/methodology.entity';
import {ProjectPriorityDto} from './project-priority.dto';
import {ProjectPhase} from '../entities/project-phase.entity';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDateString()
    approvalDate?: Date;

    @IsOptional()
    priority?: ProjectPriorityDto;

    @IsOptional()
    status?: ProjectStatusDto;

    @IsOptional()
    @IsDateString()
    plannedStartDate?: Date;

    @IsOptional()
    @IsDateString()
    plannedEndDate?: Date;

    @IsOptional()
    @IsDateString()
    actualStartDate?: Date;

    @IsOptional()
    @IsDateString()
    actualEndDate?: Date;

    @IsOptional()
    methodology?: CreateMethodologyDto;

    @IsOptional()
    @IsDecimal()
    @Min(0)
    @Max(100)
    progress?: number;

    @IsOptional()
    phases?: ProjectPhaseResponseDto[];
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}


export class ResponseProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @ValidateNested()
    @Type(() => ProjectPriorityDto)
    priority: ProjectPriorityDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ProjectStatusDto)
    status: ProjectStatusDto;
}
