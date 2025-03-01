import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Milestone } from './milestone.entity';
import { CreateMilestoneDto, UpdateMilestoneDto } from './milestone.dto';

@Injectable()
export class MilestonesService {
    constructor(
        @InjectRepository(Milestone)
        private readonly milestoneRepository: Repository<Milestone>,
    ) {}

    async findAll(): Promise<Milestone[]> {
        return this.milestoneRepository.find({ relations: ['phase'] });
    }

    async findOne(id: string): Promise<Milestone> {
        const milestone = await this.milestoneRepository.findOne({ where: { id }, relations: ['phase'] });
        if (!milestone) {
            throw new NotFoundException(`Meilenstein mit ID ${id} nicht gefunden`);
        }
        return milestone;
    }

    async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
        const milestone = this.milestoneRepository.create(createMilestoneDto);
        return this.milestoneRepository.save(milestone);
    }

    async update(id: string, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
        await this.findOne(id);
        await this.milestoneRepository.update(id, updateMilestoneDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const milestone = await this.findOne(id);
        await this.milestoneRepository.remove(milestone);
    }
}
