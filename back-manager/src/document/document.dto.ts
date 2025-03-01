import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    name: string;

    @IsString()
    filePath: string;

    @IsOptional()
    @IsUUID()
    projectId?: string;

    @IsOptional()
    @IsUUID()
    phaseId?: string;

    @IsOptional()
    @IsUUID()
    activityId?: string;
}

export class UpdateDocumentDto extends CreateDocumentDto {}
