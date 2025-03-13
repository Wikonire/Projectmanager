import { IsString, MaxLength} from 'class-validator';

export class ProjectStatusDto {
    @IsString()
    @MaxLength(50)
    name: string;
}
