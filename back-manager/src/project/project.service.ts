// project.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Project} from './project.entity';
import {CreateProjectDto, UpdateProjectDto} from './project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findOne(id: string): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Projekt mit ID ${id} nicht gefunden`);
        }
        return project;
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create(createProjectDto);
        return this.projectRepository.save(project);
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        await this.findOne(id);
        await this.projectRepository.update(id, updateProjectDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }
}
