import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMilestoneDto, UpdateMilestoneDto } from '../dtos/milestone.dto';
import {Milestone} from '../entities/milestone.entity';
import {ProjectPhase} from '../entities/project-phase.entity';
import {Activity} from '../entities/activity.entity';

@Injectable()
export class MilestoneService {
    constructor(
        @InjectRepository(Milestone)
        private readonly milestoneRepository: Repository<Milestone>,
        @InjectRepository(ProjectPhase)
        private readonly phaseRepository: Repository<ProjectPhase>,
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) {}

    async findAll(): Promise<Milestone[]> {
        return this.milestoneRepository.find({ relations: ['project', 'phase', 'activity'] });
    }

    async findOneByIdOrFail(id: string): Promise<Milestone|undefined> {
        return await this.milestoneRepository.findOneOrFail({ where: { id }, relations: ['project', 'phase', 'activity'] });
    }

    async create(createMilestoneDto: CreateMilestoneDto): Promise<Milestone> {
        const milestone = new Milestone();
        milestone.title = createMilestoneDto.title;
        milestone.plannedDate = createMilestoneDto.plannedDate;
        milestone.actualDate = createMilestoneDto.actualDate;
        milestone.description = createMilestoneDto.description;

        if (createMilestoneDto.phase) {
            const phase = await this.phaseRepository.findOne({ where: { id: createMilestoneDto.phase } });
            if (!phase) {
                throw new BadRequestException(`Phase mit ID ${createMilestoneDto.phase} nicht gefunden`);
            }
            milestone.phase = phase || undefined;
        }

        if (createMilestoneDto.activity) {
            const activity = await this.activityRepository.findOne({ where: { id: createMilestoneDto.activity } });
            if (!activity) {
                throw new BadRequestException(`Aktivität mit ID ${createMilestoneDto.activity} nicht gefunden`);
            }
            milestone.activity = activity;
        }

        return this.milestoneRepository.save(milestone);
    }

    async update(id: string, updateMilestoneDto: UpdateMilestoneDto): Promise<Milestone> {
        const milestone = await this.findOneByIdOrFail(id);
        if (!milestone) {
            throw new NotFoundException(`Milestone mit ID ${id} nicht gefunden`);
        }

        if (updateMilestoneDto.phase) {
            const phase:ProjectPhase|null = await this.phaseRepository.findOneOrFail({ where: { id: updateMilestoneDto.phase } });
                milestone.phase = phase|| undefined;
        }

        if (updateMilestoneDto.activity) {
            const activity:Activity|null = await this.activityRepository.findOneOrFail({ where: { id: updateMilestoneDto.activity } });
            milestone.activity = activity|| undefined;
        }
        return this.milestoneRepository.save(milestone);
    }

    async remove(id: string): Promise<void> {
        const milestone = await this.findOneByIdOrFail(id);
        if (!milestone) {
            throw new NotFoundException(`Milestone mit ID ${id} nicht gefunden`);
        }
        await this.milestoneRepository.remove(milestone);
    }
}
