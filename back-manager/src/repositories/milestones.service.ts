import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMilestoneDto, UpdateMilestoneDto } from '../dtos/milestone.dto';
import {MilestoneEntity} from '../entities/milestone.entity';
import {ProjectPhase} from '../entities/project-phase.entity';
import {ActivityEntity} from '../entities/activity.entity';

@Injectable()
export class MilestoneService {
    constructor(
        @InjectRepository(MilestoneEntity)
        private readonly milestoneRepository: Repository<MilestoneEntity>,
        @InjectRepository(ProjectPhase)
        private readonly phaseRepository: Repository<ProjectPhase>,
        @InjectRepository(ActivityEntity)
        private readonly activityRepository: Repository<ActivityEntity>,
    ) {}

    async findAll(): Promise<MilestoneEntity[]> {
        return this.milestoneRepository.find({ relations: ['project', 'phase', 'activity'] });
    }

    async findOneByIdOrFail(id: string): Promise<MilestoneEntity|undefined> {
        return await this.milestoneRepository.findOneOrFail({ where: { id }, relations: ['project', 'phase', 'activity'] });
    }

    async create(createMilestoneDto: CreateMilestoneDto): Promise<MilestoneEntity> {
        const milestone = new MilestoneEntity();
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

    async update(id: string, updateMilestoneDto: UpdateMilestoneDto): Promise<MilestoneEntity> {
        const milestone = await this.findOneByIdOrFail(id);
        if (!milestone) {
            throw new NotFoundException(`Milestone mit ID ${id} nicht gefunden`);
        }

        if (updateMilestoneDto.phase) {
            const phase:ProjectPhase|null = await this.phaseRepository.findOneOrFail({ where: { id: updateMilestoneDto.phase } });
                milestone.phase = phase|| undefined;
        }

        if (updateMilestoneDto.activity) {
            const activity:ActivityEntity|null = await this.activityRepository.findOneOrFail({ where: { id: updateMilestoneDto.activity } });
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
