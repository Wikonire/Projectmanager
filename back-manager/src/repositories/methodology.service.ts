import {PartialType} from '@nestjs/mapped-types';

export class CreateMethodologyDto {
    name: string;
    description: string;
}

export class UpdateMethodologyDto extends PartialType(CreateMethodologyDto) {}
