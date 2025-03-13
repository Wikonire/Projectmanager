import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, Not} from 'typeorm';
import {CreateProjectDto, UpdateProjectDto} from '../dtos/project.dto';
import {validate} from 'class-validator';
import {ProjectEntity} from '../entities/project.entity';
import {ProjectPriority} from '../entities/project-priority.entity';
import {ProjectStatus} from '../entities/project-status.entity';
import {MethodologyEntity} from '../entities/methodology.entity';
import {ProjectStatusService} from './project-status.service';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>, @InjectRepository(ProjectPriority) private readonly priorityRepository: Repository<ProjectPriority>, @InjectRepository(ProjectStatus) private readonly statusRepository: Repository<ProjectStatus>, @InjectRepository(MethodologyEntity) private readonly methodologyRepository: Repository<MethodologyEntity>, private readonly projectStatusService: ProjectStatusService) {
    }

    async findAllActive(): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            relations: ['priority', 'status', 'methodology', 'projectPhases', 'documents', 'projectPhases.phaseName'],
            order: {
                title: 'ASC',
            },
            where: {
                status: { name: Not('Archiviert') }
            }
        });
    }

    async findAllArchived(): Promise<ProjectEntity[]> {
        return this.projectRepository.find({
            relations: ['priority', 'status', 'methodology', 'projectPhases.phaseName'],
            order: {
                title: 'ASC',
            },
            where: {
                status: { name: Not('Archiviert') }
            }
        });
    }

    async findOne(id: string): Promise<ProjectEntity> {
        const project = await this.projectRepository.findOne({
            where: {id},
            relations: ['priority', 'status', 'methodology', 'projectPhases', 'documents', 'projectPhases.phaseName'],
        });
        if (!project) {
            throw new NotFoundException(`Projekt mit ID ${id} nicht gefunden`);
        }
        return project;
    }

    async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
        await this.validateDto(createProjectDto);

        const projectPriority = await this.getOrCreatePriority(createProjectDto.priority?.name);
        const projectStatus = await this.getStatusByName(createProjectDto.status?.name);
        const projectMethodology = await this.getOrCreateMethodology(createProjectDto.methodology?.name);

        // Nur gültige Felder übergeben
        const project = this.projectRepository.create({
            title: createProjectDto.title,
            description: createProjectDto.description,
            approvalDate: createProjectDto.approvalDate ? new Date(createProjectDto.approvalDate) : undefined,
            plannedStartDate: createProjectDto.plannedStartDate ? new Date(createProjectDto.plannedStartDate) : undefined,
            plannedEndDate: createProjectDto.plannedEndDate ? new Date(createProjectDto.plannedEndDate) : undefined,
            actualStartDate: createProjectDto.actualStartDate ? new Date(createProjectDto.actualStartDate) : undefined,
            actualEndDate: createProjectDto.actualEndDate ? new Date(createProjectDto.actualEndDate) : undefined,
            progress: createProjectDto.progress ?? 0, // Standardwert setzen
            priority: projectPriority,
            status: projectStatus,
            methodology: projectMethodology,
        });

        return this.saveProject(project);
    }

    async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {
        await this.validateDto(updateProjectDto);

        const project = await this.findOne(id); // Sicherstellen, dass das Projekt existiert

        if (updateProjectDto.status?.name) {
            const status = await this.getStatusByName(updateProjectDto.status.name);
            if (status) {
                project.status = status;
            }
        }

        if (updateProjectDto.priority?.name) {
            const priority = await this.getOrCreatePriority(updateProjectDto.priority.name);
            if (priority) {
                project.priority = priority;
            }
        }

        Object.assign(project, updateProjectDto);

        return this.saveProject(project);
    }

    async remove(id: string): Promise<void> {
        const project = await this.findOne(id);
        await this.projectRepository.remove(project);
    }

    private async validateDto(dto: object): Promise<void> {
        const errors = await validate(dto);
        if (errors.length > 0) {
            throw new BadRequestException('Ungültige Eingabedaten');
        }
    }

    private async saveProject(project: ProjectEntity): Promise<ProjectEntity> {
        return this.projectRepository.save(project);
    }

    /**
     * Holt eine Status-Entität anhand des Namens oder wirft eine Exception.
     */
    private async getStatusByName(name?: string): Promise<ProjectStatus | undefined> {
        if (!name) return undefined;
        return this.projectStatusService.getStatusByNameOrId({name});
    }

    /**
     * Holt eine Priorität anhand des Namens oder erstellt sie, falls sie nicht existiert.
     */
    private async getOrCreatePriority(name?: string): Promise<ProjectPriority | undefined> {
        if (!name) return undefined;

        let priority = await this.priorityRepository.findOne({where: {name}});
        if (!priority) {
            priority = this.priorityRepository.create({name});
            priority = await this.priorityRepository.save(priority);
        }
        return priority;
    }

    /**
     * Holt eine Methodologie anhand des Namens oder erstellt sie, falls sie nicht existiert.
     */
    private async getOrCreateMethodology(name?: string): Promise<MethodologyEntity | undefined> {
        if (!name) return undefined;

        let methodology = await this.methodologyRepository.findOne({where: {name}});
        if (!methodology) {
            methodology = this.methodologyRepository.create({name});
            methodology = await this.methodologyRepository.save(methodology);
        }
        return methodology;
    }
}
