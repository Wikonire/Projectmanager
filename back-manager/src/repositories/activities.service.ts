import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto, UpdateActivityDto } from '../dtos/activity.dto';
import { ActivityEntity } from '../entities/activity.entity';
import { ActivityStatusEntity } from '../entities/activity-status.entity';
import {ProjectPhase} from '../entities/project-phase.entity';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(ActivityEntity)
        private readonly activityRepository: Repository<ActivityEntity>,
        @InjectRepository(ProjectPhase)
        private readonly projectPhaseRepository: Repository<ProjectPhase>,
        @InjectRepository(ActivityStatusEntity)
        private readonly activityStatusRepository: Repository<ActivityStatusEntity>,
    ) {}

    async findAll(): Promise<ActivityEntity[]> {
        return this.activityRepository.find({ relations: ['phase', 'activityStatus', 'documents'] });
    }

    async findOne(id: string): Promise<ActivityEntity> {
        const activity = await this.activityRepository.findOne({ where: { id }, relations: ['phase', 'activityStatus', 'documents'] });
        if (!activity) {
            throw new NotFoundException(`Activity mit ID ${id} nicht gefunden.`);
        }
        return activity;
    }

    async create(createActivityDto: CreateActivityDto): Promise<ActivityEntity> {
        const phase = await this.projectPhaseRepository.findOneBy({ id: createActivityDto.phaseId });
        if (!phase) {
            throw new BadRequestException(`Phase mit ID ${createActivityDto.phaseId} nicht gefunden.`);
        }
        const activityStatus = await this.activityStatusRepository.findOneBy({ id: createActivityDto.activityStatusId });
        if (!activityStatus) {
            throw new BadRequestException(`ActivityStatus mit ID ${createActivityDto.activityStatusId} nicht gefunden.`);
        }

        // Aktivität erstellen und verknüpfte Entitäten zuweisen
        const activity = this.activityRepository.create({
            ...createActivityDto,
            phase,
            activityStatus,
        });

        return this.activityRepository.save(activity);
    }

    async update(id: string, updateActivityDto: UpdateActivityDto): Promise<ActivityEntity> {
        const activityToUpdate = await this.findOne(id);

        if (updateActivityDto.phaseId) {
            const phase = await this.projectPhaseRepository.findOneBy({ id: updateActivityDto.phaseId });
            if (!phase) {
                throw new BadRequestException(`Phase mit ID ${updateActivityDto.phaseId} nicht gefunden.`);
            }
            activityToUpdate.phase = phase;
        }

        if (updateActivityDto.activityStatusId) {
            const activityStatus = await this.activityStatusRepository.findOneBy({ id: updateActivityDto.activityStatusId });
            if (!activityStatus) {
                throw new BadRequestException(`ActivityStatus mit ID ${updateActivityDto.activityStatusId} nicht gefunden.`);
            }
            activityToUpdate.activityStatus = activityStatus;
        }

        this.activityRepository.merge(activityToUpdate, updateActivityDto);
        return this.activityRepository.save(activityToUpdate);
    }

    async remove(id: string): Promise<void> {
        const activity = await this.activityRepository.findOneOrFail({ where: { id } });
        await this.activityRepository.remove(activity);
    }
}
