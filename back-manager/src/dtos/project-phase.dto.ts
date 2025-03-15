import {
    IsDate,
    IsDateString,
    IsDecimal,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    ValidateNested
} from 'class-validator';
import {Type} from 'class-transformer';
import {PhaseStatusResponseDto} from './phase-status.dto';
import {PhaseNameResponseDto} from './phase-name.dto';

export class ProjectPhaseDto {

    @IsString()
    @IsOptional()
    projectId: string;

    @IsOptional()
    phaseName?: PhaseNameResponseDto;

    @IsOptional()
    phaseStatus?: PhaseStatusResponseDto;

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
    @IsDecimal()
    @Min(0)
    @Max(100)
    progress?: number;
}
