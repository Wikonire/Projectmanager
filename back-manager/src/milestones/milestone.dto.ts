import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreateMilestoneDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsDate()
    planned_date?: Date;

    @IsOptional()
    @IsDate()
    actual_date?: Date;

    @IsString()
    status: string;

    @IsUUID()
    phaseId: string;
}

export class UpdateMilestoneDto extends CreateMilestoneDto {}
