import {IsString, IsUUID, IsOptional, IsDate, ValidateNested} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';
import {Type} from 'class-transformer';
import {ActivityStatus} from '../entities/activity-status.entity';
import {UpdatePhaseDto} from './phases.dto';

export class CreateActivityDto {
    @IsString()
    title: string;

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

    @IsUUID()
    activity_status_id: string;

    @IsUUID()
    phase_id: string;
}

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class ResponseActivityDto extends PartialType(CreateActivityDto) {
    @IsOptional()
    @ValidateNested()
    @Type(() => ActivityStatus)
    activity_status?: ActivityStatus;


    @IsOptional()
    @ValidateNested()
    @Type(() => UpdatePhaseDto)
    phase?: UpdatePhaseDto;
}
