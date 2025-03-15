import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import {ProjectPhaseService} from '../repositories/project-phase.service';
import {ProjectPhaseDto} from '../dtos/project-phase.dto';


@Controller('phases')
export class ProjectPhasesController {
    constructor(private readonly projectPhasesService: ProjectPhaseService) {}

    @Get()
    findAll() {
        return this.projectPhasesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectPhasesService.findOneById(id);
    }

    @Post()
    create(@Body() createProjectPhaseDto: ProjectPhaseDto) {
        return this.projectPhasesService.create(createProjectPhaseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectPhaseDto: ProjectPhaseDto) {
        console.log(updateProjectPhaseDto.phaseName)
        return this.projectPhasesService.update(id, updateProjectPhaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectPhasesService.remove(id);
    }
}
