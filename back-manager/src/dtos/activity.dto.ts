import {
    IsString,
    IsUUID,
    IsOptional,
    IsDateString,
    ValidateNested,
    IsNotEmpty,
    Min,
    Max,
    IsNumber
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { ProjectPhaseDto } from './project-phase.dto';
import { ActivityStatusResponseDto } from './activity-status.dto';

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsOptional()
    @IsDateString()
    plannedStartDate?: string;

    @IsOptional()
    @IsDateString()
    plannedEndDate?: string;

    @IsOptional()
    @IsDateString()
    actualStartDate?: string;

    @IsOptional()
    @IsDateString()
    actualEndDate?: string;

    @IsOptional()
    @Min(0)
    @Max(100)
    @IsNumber()
    progress?: number;

    @IsOptional()
    @IsNumber()
    estimation?: number;

    @IsUUID()
    @IsNotEmpty()
    activityStatusId: string;

    @IsUUID()
    @IsNotEmpty()
    phaseId: string;
}


export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class ResponseActivityDto {
    @IsUUID()
    id: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsDateString()
    plannedStartDate?: string;

    @IsOptional()
    @IsDateString()
    plannedEndDate?: string;

    @IsOptional()
    @IsDateString()
    actualStartDate?: string;

    @IsOptional()
    @IsDateString()
    actualEndDate?: string;

    @IsNotEmpty()
    @Min(0)
    @Max(100)
    @IsNumber()
    progress: number;

    @IsOptional()
    @IsNumber()
    estimation: number;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ActivityStatusResponseDto)
    activityStatus: ActivityStatusResponseDto;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ProjectPhaseDto)
    phase: ProjectPhaseDto;
}
