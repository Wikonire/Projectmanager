import { IsString, IsUUID, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    file_path: string;

    @IsOptional()
    @IsUUID()
    projectId?: string | undefined;

    @IsOptional()
    @IsUUID()
    phase_id?: string | undefined;

    @IsOptional()
    @IsUUID()
    activity_id?: string | undefined;
}

export class UpdateDocumentDto extends CreateDocumentDto {}
