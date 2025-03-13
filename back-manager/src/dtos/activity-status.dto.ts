import {IsString, IsNotEmpty, Length, IsOptional, IsUUID} from 'class-validator';
import {PartialType} from '@nestjs/mapped-types';

export class CreateActivityStatusDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    description: string;
}

export class UpdateActivityStatusDto extends PartialType(CreateActivityStatusDto) {
    @IsOptional()
    @IsString()
    @Length(1, 80)
    name?: string;
}

export class ActivityStatusResponseDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsString()
    description: string;
}
