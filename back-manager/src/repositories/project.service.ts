import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/project.dto';
import { validate } from 'class-validator';
import {Project} from '../entities/project.entity';
import {ProjectPriority} from '../entities/project-priority.entity';
import {ProjectStatus} from '../entities/project-status.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(ProjectPriority)
        private readonly priorityRepository: Repository<ProjectPriority>,
        @InjectRepository(ProjectStatus)
        private readonly statusRepository: Repository<ProjectStatus>,
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

    private async validateDto(dto: object): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new BadRequestException('Ungültige Eingabedaten');
        }
    }

    private async saveProject(project: Project): Promise<Project> {
        return this.projectRepository.save(project);
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        await this.validateDto(createProjectDto);

        // Holt die Priority- und Status-Entitäten anhand der IDs
        const priority = await this.priorityRepository.findOne({ where: { id: createProjectDto.priority_id } });
        if (!priority) {
            throw new BadRequestException(`Priorität mit ID ${createProjectDto.priority_id} nicht gefunden`);
        }

        const status = await this.statusRepository.findOne({ where: { id: createProjectDto.status_id } });
        if (!status) {
            throw new BadRequestException(`Status mit ID ${createProjectDto.status_id} nicht gefunden`);
        }

        // Erstelle das Projekt mit den validierten Entitäten
        const project = this.projectRepository.create({
            ...createProjectDto,
            priority,
            status,
        });

        return this.saveProject(project);
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        await this.validateDto(updateProjectDto);

        const project = await this.findOne(id); // Sicherstellen, dass das Projekt existiert

        // Falls eine neue Priority-ID angegeben wurde, hole die zugehörige Entität
        if (updateProjectDto.priority_id) {
            const priority = await this.priorityRepository.findOne({ where: { id: updateProjectDto.priority_id } });
            if (!priority) {
                throw new BadRequestException(`Priorität mit ID ${updateProjectDto.priority_id} nicht gefunden`);
            }
            project.priority = priority;
        }

        // Falls eine neue Status-ID angegeben wurde, hole die zugehörige Entität
        if (updateProjectDto.status_id) {
            const status = await this.statusRepository.findOne({ where: { id: updateProjectDto.status_id } });
            if (!status) {
                throw new BadRequestException(`Status mit ID ${updateProjectDto.status_id} nicht gefunden`);
            }
            project.status = status;
        }

        // Aktualisiere die restlichen Felder des Projekts
        Object.assign(project, updateProjectDto);

        return this.saveProject(project);
    }


    async remove(id: string): Promise<void> {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }
}
