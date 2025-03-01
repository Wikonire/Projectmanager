import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phase } from './phase.entity';
import {CreatePhaseDto, UpdatePhaseDto} from './phases.dto';

@Injectable()
export class PhasesService {
    constructor(
        @InjectRepository(Phase)
        private readonly phaseRepository: Repository<Phase>,
    ) {}

    async findAll(): Promise<Phase[]> {
        return this.phaseRepository.find();
    }

    async findOne(id: string): Promise<Phase> {
        const phase = await this.phaseRepository.findOne({ where: { id } });
        if (!phase) {
            throw new NotFoundException(`Phase mit ID ${id} nicht gefunden`);
        }
        return phase;
    }

    async create(createPhaseDto: CreatePhaseDto): Promise<Phase> {
        const phase = this.phaseRepository.create(createPhaseDto);
        return this.phaseRepository.save(phase);
    }

    async update(id: string, updatePhaseDto: UpdatePhaseDto): Promise<Phase> {
        await this.findOne(id);
        await this.phaseRepository.update(id, updatePhaseDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const phase = await this.findOne(id);
        await this.phaseRepository.remove(phase);
    }
}
