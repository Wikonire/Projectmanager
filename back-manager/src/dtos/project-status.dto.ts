import { IsString, MaxLength} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';

export class ProjectStatusDto {
    @IsString()
    @MaxLength(50)
    name: string;
}

export class CreateProjectStatusDto {
    @IsString()
    @MaxLength(50)
    name: string;
}

export class UpdateProjectStatusDto extends PartialType(CreateProjectStatusDto) {}
