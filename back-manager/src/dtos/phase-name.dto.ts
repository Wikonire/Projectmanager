import {IsNotEmpty, IsString, Length} from 'class-validator';

export class CreatePhaseNameDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 80)
    name: string;
}
export class UpdatePhaseNameDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 80)
    name?: string;
}
export class PhaseNameResponseDto {
    id: string;
    @IsNotEmpty()
    @IsString()
    @Length(1, 80)
    name: string;
}
