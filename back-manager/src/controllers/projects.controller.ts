import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import {ProjectService} from '../repositories/project.service';
import {CreateProjectDto, UpdateProjectDto} from '../dtos/project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectService) {}

   // @Roles()
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id/details')
    async getProjectDetailsById(@Param('id') id: string) {
        return this.projectsService.findOne(id)
    }


    // @Roles(Role.Admin, Role.ProjectLeader, Role.Employee)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

   // @Roles(Role.Admin, Role.ProjectLeader)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

   // @Roles(Role.Admin, Role.ProjectLeader)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

   // @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
