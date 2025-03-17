import {
    BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put
} from '@nestjs/common';
import {ProjectService} from '../repositories/project.service';
import {ProjectEntity} from '../entities/project.entity';
import {CreateProjectDto, UpdateProjectDto} from '../dtos/project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectService) {
    }

    @Get('active') async findAllActive(): Promise<ProjectEntity[]> {
        return this.projectsService.findAllActive();
    }

    @Get('archived') async findAllArchived(): Promise<ProjectEntity[]> {
        return this.projectsService.findAllArchived();
    }

    @Get(':id') async findOne(@Param('id') id: string): Promise<ProjectEntity> {
        return this.projectsService.findOne(id);
    }

    @Post() async create(@Body() createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        if (!createProjectDto || Object.keys(createProjectDto).length === 0) {
            throw new BadRequestException('Das Projekt-DTO darf nicht leer sein.');
        }
        return this.projectsService.create(createProjectDto);
    }

    @Put(':id') @HttpCode(204) async update(@Param('id') id: string, @Body() updateProjectDto: Partial<UpdateProjectDto>): Promise<void> {
        console.log('update', id, updateProjectDto)
        if (!updateProjectDto || Object.keys(updateProjectDto).length === 0) {
            throw new BadRequestException('Das Update-DTO darf nicht leer sein.');
        }

        const updatedProject = await this.projectsService.update(id, updateProjectDto);
        if (!updatedProject) {
            throw new NotFoundException(`Projekt mit ID ${id} nicht gefunden oder keine Änderungen vorgenommen.`);
        }
    }

    @Delete(':id') @HttpCode(204) // Standard für DELETE, wenn erfolgreich
    async remove(@Param('id') id: string): Promise<void> {
        await this.projectsService.remove(id);
    }

    @Delete() @HttpCode(204) async removeMany(@Body() ids: string[]): Promise<void> {
        if (!Array.isArray(ids) || ids.length === 0) {
            throw new BadRequestException('Mindestens eine ID muss angegeben werden.');
        }
        await this.projectsService.removeMany(ids);
    }
}
