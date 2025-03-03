import { IsString, IsUUID, IsOptional, IsDate } from 'class-validator';

export class CreateMilestoneDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsDate()
    plannedDate?: Date;

    @IsOptional()
    @IsDate()
    actualDate?: Date;

    @IsOptional()
    @IsUUID()
    project?: string;

    @IsOptional()
    @IsUUID()
    phase?: string;

    @IsOptional()
    @IsUUID()
    activity?: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateMilestoneDto extends CreateMilestoneDto {}


