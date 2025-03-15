import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import {PhaseName} from '../entities/phase-name.entity';

@Injectable()
export class PhaseNameService {
    constructor(
        @InjectRepository(PhaseName)
        private readonly phaseNameRepository: Repository<PhaseName>,
    ) {}

    async findAll(): Promise<PhaseName[]> {
        return this.phaseNameRepository.find();
    }

    async findOne(id: string): Promise<PhaseName> {
        const phaseName = await this.phaseNameRepository.findOneBy({ id });
        if (!phaseName) {
            throw new NotFoundException(`PhaseName with ID ${id} not found`);
        }
        return phaseName;
    }

    async createPhaseName(phaseName:string): Promise<PhaseName> {
        const createPhaseNameDto = {name: phaseName};
        const newPhase = this.phaseNameRepository.create(createPhaseNameDto);
        return this.phaseNameRepository.save(newPhase);
    }

    async delete(id: string): Promise<void> {
        await this.phaseNameRepository.delete(id);
    }
}
