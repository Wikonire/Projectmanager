import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreatePhaseDto {
    @IsString()
    name: string;

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

    @IsString()
    status: string;

    @IsUUID()
    projectId: string;
}

export class UpdatePhaseDto extends CreatePhaseDto {}
