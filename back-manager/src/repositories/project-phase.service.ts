import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPhase } from '../entities/project-phase.entity';
import { PhaseStatus } from '../entities/phase-status.entity';
import { ProjectEntity } from '../entities/project.entity';
import {PhaseName} from '../entities/phase-name.entity';
import {ProjectPhaseDto} from '../dtos/project-phase.dto';

@Injectable()
export class ProjectPhaseService {
    constructor(
        @InjectRepository(ProjectPhase)
        private readonly phaseRepository: Repository<ProjectPhase>,

        @InjectRepository(PhaseStatus)
        private readonly phaseStatusRepository: Repository<PhaseStatus>,

        @InjectRepository(PhaseName)
        private readonly phaseNameRepository: Repository<PhaseName>,

        @InjectRepository(ProjectEntity)
        private readonly projectRepository: Repository<ProjectEntity>,
    ) {}

    async findAll(): Promise<ProjectPhase[]> {
        return this.phaseRepository.find({ relations: ['project', 'phaseStatus', 'documents', 'projectPhases', 'phaseName'] });
    }

    async findAllByProjectId(projectId: string): Promise<ProjectPhase[]> {
        const phases = await this.phaseRepository.find({
            where: { project: { id: projectId } },
            relations: ['project', 'phaseStatus', 'phaseName', 'documents'],
        });
        if (!phases || phases.length === 0) {
            throw new NotFoundException(`Keine Phasen für das Projekt mit ID ${projectId} gefunden.`);
        }
        return phases;
    }


    async findOneById(phaseId: string): Promise<ProjectPhase> {
        const phase = await this.phaseRepository.findOne({
            where: { id:phaseId },
            relations: ['project', 'phaseStatus', 'phaseName', 'documents'],
        });
        if (!phase) {
            throw new NotFoundException(`Phase mit ID ${phaseId} nicht gefunden.`);
        }
        return phase;
    }

    async create(createDto: ProjectPhaseDto): Promise<ProjectPhase|ProjectPhase[]> {
        // Überprüfen, ob das Projekt existiert
        if (!createDto.projectId) {
            throw new BadRequestException(`Projekt-ID ist erforderlich.`);
        }
        let project = await this.projectRepository.findOneBy({ id: createDto.projectId });
        if (!project) {
            throw new BadRequestException(`Projekt mit ID ${createDto.projectId} nicht gefunden.`);
        }
        project = project || undefined;

        let phaseName:PhaseName|undefined = createDto.phaseName
            ? (await this.phaseNameRepository.findOneBy({ name: createDto.phaseName.name })||undefined)
            : undefined;
        if (phaseName) {
            phaseName = this.phaseNameRepository.create({ name: createDto.phaseName?.name });
            phaseName = await this.phaseNameRepository.save(phaseName);
        }


        // Falls `statusId` vorhanden ist, überprüfen, ob es existiert
        let phaseStatus = createDto.phaseStatus
            ? await this.phaseStatusRepository.findOneBy({ name: createDto.phaseStatus.name })
            : undefined;

        if (createDto.phaseStatus && !phaseStatus) {
            throw new BadRequestException(`Phasenstatus mit ID ${createDto.phaseStatus} nicht gefunden.`);
        }
        phaseStatus = phaseStatus || undefined;

        // Phase erstellen (sicherstellen, dass alle Felder korrekt zugewiesen werden)
        const phase = this.phaseRepository.create({
            phaseName,
            project,
            phaseStatus,
            plannedStartDate: createDto.plannedStartDate ? new Date(createDto.plannedStartDate) : undefined,
            plannedEndDate: createDto.plannedEndDate ? new Date(createDto.plannedEndDate) : undefined,
            actualStartDate: createDto.actualStartDate ? new Date(createDto.actualStartDate) : undefined,
            actualEndDate: createDto.actualEndDate ? new Date(createDto.actualEndDate) : undefined,
            progress: createDto.progress ?? 0,
        });
        return this.phaseRepository.save(phase);
    }


    async update(id: string, updateDto: ProjectPhaseDto): Promise<ProjectPhase> {
        const phase = await this.findOneById(id);

        // Falls `statusId` übergeben wird, sicherstellen, dass der Status existiert
        if (updateDto.phaseStatus) {
            let phaseStatus:PhaseStatus|null = await this.phaseStatusRepository.findOneBy({ name: updateDto.phaseStatus.name });
            if (!phaseStatus) {
              phaseStatus = this.phaseStatusRepository.create({ name: updateDto.phaseStatus.name });
            }
            phase.phaseStatus = phaseStatus;
        }
        // update vorhandene phaseName oder erstelle phaseName neu
        if (updateDto.phaseName && updateDto.phaseName.name !== undefined) {
            let phaseName:PhaseName|null = await this.phaseNameRepository.findOneBy({ name: updateDto.phaseName.name });
            if (!phaseName) {
                phaseName = this.phaseNameRepository.create({ name: updateDto.phaseName.name });
            }
            phase.phaseName = phaseName;
        }

        if (updateDto.projectId) {
            const project:ProjectEntity|null = await this.projectRepository.findOneBy({ id: updateDto.projectId });
            if (!project) {
                throw new BadRequestException(`Projekt mit ID ${updateDto.projectId} nicht gefunden.`);
            }
            phase.project = project;
        }

        if (updateDto.plannedStartDate !== undefined) phase.plannedStartDate = new Date(updateDto.plannedStartDate);
        if (updateDto.plannedEndDate !== undefined) phase.plannedEndDate = new Date(updateDto.plannedEndDate);
        if (updateDto.actualStartDate !== undefined) phase.actualStartDate = new Date(updateDto.actualStartDate);
        if (updateDto.actualEndDate !== undefined) phase.actualEndDate = new Date(updateDto.actualEndDate);
        if (updateDto.progress !== undefined) phase.progress = updateDto.progress;

        return this.phaseRepository.save(phase);
    }

    async remove(id: string): Promise<void> {
        const phase = await this.findOneById(id);
        if (!phase) {
            throw new NotFoundException(`Phase mit ID ${id} nicht gefunden.`);
        }
        await this.phaseRepository.remove(phase);
    }
}
