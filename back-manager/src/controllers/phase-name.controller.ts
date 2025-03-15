import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import {PhaseNameService} from '../repositories/phase-name.service';
import {PhaseName} from '../entities/phase-name.entity';

@Controller('phase-name')
export class PhaseNameController {
    constructor(private readonly phaseNameService: PhaseNameService) {}

    @Get()
    async getAll() {
        return this.phaseNameService.findAll();
    }

    @Post()
    async create(@Body('name') name: string):Promise<PhaseName> {
        return this.phaseNameService.createPhaseName(name);
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
        return this.phaseNameService.findOne(id);
    }
}
