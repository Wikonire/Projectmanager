// projects.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { Roles } from '../permissions/roles.decorator';
import { Role } from '../permissions/roles.enum';
import { PermissionsGuard } from '../permissions/permissions.guard';
import {ProjectService} from './project.service';

@Controller('projects')
@UseGuards(PermissionsGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectService) {}

    @Roles(Role.Admin, Role.ProjectLeader, Role.Employee)
    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Roles(Role.Admin, Role.ProjectLeader, Role.Employee)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Roles(Role.Admin, Role.ProjectLeader)
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @Roles(Role.Admin, Role.ProjectLeader)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.update(id, updateProjectDto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
