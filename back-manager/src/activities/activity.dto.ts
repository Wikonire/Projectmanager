import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreateActivityDto {
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
    phaseId: string;
}

export class UpdateActivityDto extends CreateActivityDto {}
