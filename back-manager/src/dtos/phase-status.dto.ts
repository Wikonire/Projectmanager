import {IsString, IsNotEmpty, Length, IsOptional, IsUUID} from 'class-validator';

export class CreatePhaseStatusDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;
}

export class UpdatePhaseStatusDto {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    name?: string;
}

export class PhaseStatusResponseDto {
    @IsUUID()
    id: string;

    @IsString()
    name: string;
}
