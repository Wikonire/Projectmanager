import { IsString, MaxLength, IsUUID, IsOptional } from 'class-validator';

export class ProjectStatusDto {
    @IsString()
    @MaxLength(50)
    name: string;
}
