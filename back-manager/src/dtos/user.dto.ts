import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    role?: string;
}
