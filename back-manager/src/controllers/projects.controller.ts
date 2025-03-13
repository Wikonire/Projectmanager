import {Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe, Patch, Put} from '@nestjs/common';
import {ProjectService} from '../repositories/project.service';
import {CreateProjectDto, UpdateProjectDto} from '../dtos/project.dto';
import {ProjectEntity} from '../entities/project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectService) {}

    @Get()
    findAll():Promise<ProjectEntity[]> {
        return this.projectsService.findAllActive();
    }

    @Get('archived')
    findAllArchived():Promise<ProjectEntity[]> {
        return this.projectsService.findAllArchived();
    }

    @Get(':id')
    findOne(@Param('id') id: string):Promise<ProjectEntity> {
        return this.projectsService.findOne(id);
    }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto):Promise<ProjectEntity> {
        return this.projectsService.create(createProjectDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto):Promise<ProjectEntity> {
        console.log(updateProjectDto);
        return this.projectsService.update(id, updateProjectDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string):Promise<void> {
        return this.projectsService.remove(id);
    }
}
