import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhaseDto, UpdatePhaseDto } from '../dtos/phases.dto';
import {ProjectPhase} from '../entities/project-phase.entity';
import {PhaseStatus} from '../entities/phase-status.entity';

@Injectable()
export class PhasesService {
    constructor(
        @InjectRepository(ProjectPhase)
        private readonly phaseRepository: Repository<ProjectPhase>,
        @InjectRepository(PhaseStatus)
        private readonly phaseStatusRepository: Repository<PhaseStatus>,
    ) {}

    async findAll(): Promise<ProjectPhase[]> {
        return this.phaseRepository.find();
    }

    async findOne(id: string): Promise<ProjectPhase> {
        const phase = await this.phaseRepository.findOne({ where: { id } });
        if (!phase) {
            throw new NotFoundException(`Phase mit ID ${id} nicht gefunden`);
        }
        return phase;
    }

    async create(createPhaseDto: CreatePhaseDto): Promise<ProjectPhase> {
        const status = await this.phaseStatusRepository.findOne({ where: { id: createPhaseDto.status } });
        if (!status) {
            throw new BadRequestException(`Phasenstatus mit ID ${createPhaseDto.status} nicht gefunden`);
        }

        const phase = this.phaseRepository.create({
            ...createPhaseDto,
            phaseStatus: status,
        });
        return this.phaseRepository.save(phase);
    }

    async update(id: string, updatePhaseDto: UpdatePhaseDto): Promise<ProjectPhase> {
        const phase = await this.findOne(id);

        if (updatePhaseDto.status) {
            const status = await this.phaseStatusRepository.findOne({ where: { id: updatePhaseDto.status } });
            if (!status) {
                throw new BadRequestException(`Phasenstatus mit ID ${updatePhaseDto.status} nicht gefunden`);
            }
            phase.phaseStatus = status;
        }

        Object.assign(phase, updatePhaseDto);
        return this.phaseRepository.save(phase);
    }

    async remove(id: string): Promise<void> {
        const phase = await this.findOne(id);
        await this.phaseRepository.remove(phase);
    }
}
