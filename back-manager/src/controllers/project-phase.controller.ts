import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import {ProjectPhaseService} from '../repositories/project-phase.service';
import {CreateProjectPhaseDto, UpdateProjectPhaseDto} from '../dtos/project-phase.dto';


@Controller('phases')
@UsePipes(new ValidationPipe({ transform: true }))
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
    create(@Body() createProjectPhaseDto: CreateProjectPhaseDto) {
        return this.projectPhasesService.create(createProjectPhaseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectPhaseDto: UpdateProjectPhaseDto) {
        return this.projectPhasesService.update(id, updateProjectPhaseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectPhasesService.remove(id);
    }
}
