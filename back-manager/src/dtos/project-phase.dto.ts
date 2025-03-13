import { IsString, IsUUID, IsOptional, IsNotEmpty, IsDateString, ValidateNested, Min, Max, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PhaseStatusResponseDto } from './phase-status.dto';
import {PhaseNameResponseDto} from './phase-name.dto';

export class CreateProjectPhaseDto {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PhaseNameResponseDto)
    phaseName: PhaseNameResponseDto;

    @IsUUID()
    @IsNotEmpty()
    projectId: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PhaseStatusResponseDto)
    status?: PhaseStatusResponseDto;

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
    @IsNumber()
    @Min(0)
    @Max(100)
    progress?: number;
}

export class UpdateProjectPhaseDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PhaseNameResponseDto)
    phaseName: PhaseNameResponseDto;

    @IsOptional()
    @IsUUID()
    projectId?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PhaseStatusResponseDto)
    status?: PhaseStatusResponseDto;

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
    @IsNumber()
    @Min(0)
    @Max(100)
    progress?: number;
}

export class ProjectPhaseResponseDto {
    @IsUUID()
    id: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PhaseNameResponseDto)
    phaseName?: PhaseNameResponseDto;


    @IsUUID()
    projectId: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => PhaseStatusResponseDto)
    status?: PhaseStatusResponseDto;

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
    @IsNumber()
    @Min(0)
    @Max(100)
    progress?: number;
}
