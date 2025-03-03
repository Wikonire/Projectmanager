import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {PhasesService} from '../repositories/phases.service';
import {CreatePhaseDto, UpdatePhaseDto} from '../dtos/phases.dto';


@Controller('phases')
export class PhasesController {
    constructor(private readonly phasesService: PhasesService) {}

    @Get()
    findAll() {
        return this.phasesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.phasesService.findOne(id);
    }

    @Post()
    create(@Body() createPhaseDto: CreatePhaseDto) {
        return this.phasesService.create(createPhaseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePhaseDto: UpdatePhaseDto) {
        return this.phasesService.update(id, updatePhaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.phasesService.remove(id);
    }
}
