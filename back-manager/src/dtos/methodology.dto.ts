import {IsNotEmpty, IsOptional, IsString, IsUUID, Length, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ResponseProjectDto} from './project.dto';

export class CreateMethodologyDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    name: string;

}

export class UpdateMethodologyDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    name?: string;
}

export class MethodologyResponseDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ResponseProjectDto)
    projects?: ResponseProjectDto[];
}
