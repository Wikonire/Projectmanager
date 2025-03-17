import {IsString, IsUUID, IsOptional, IsNotEmpty, IsDateString, ValidateNested} from 'class-validator';
import {ResponseProjectDto} from './project.dto';
import {ProjectPhaseDto} from './project-phase.dto';
import {CreateActivityDto, ResponseActivityDto} from './activity.dto';
import {Type} from 'class-transformer';
import {ActivityEntity} from '../entities/activity.entity';
import {ProjectEntity} from '../entities/project.entity';
import {ProjectPhase} from '../entities/project-phase.entity';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsDateString()
    createdAt: string;


    @IsString()
    @IsOptional()
    path?: string;

    @IsOptional()
    @Type(() => ResponseProjectDto)
    project?: ResponseProjectDto;

    @IsOptional()
    @Type(() => ProjectPhaseDto)
    phase?: ProjectPhaseDto;

    @IsOptional()
    @Type(() => ResponseActivityDto)
    activity?: ResponseActivityDto;


}

export class UpdateDocumentDto extends CreateDocumentDto {}
