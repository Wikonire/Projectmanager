import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { CreateActivityDto, UpdateActivityDto } from './activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityRepository: Repository<Activity>,
    ) {}

    async findAll(): Promise<Activity[]> {
        return this.activityRepository.find({ relations: ['phase'] });
    }

    async findOne(id: string): Promise<Activity> {
        const activity = await this.activityRepository.findOne({ where: { id }, relations: ['phase'] });
        if (!activity) {
            throw new NotFoundException(`Aktivität mit ID ${id} nicht gefunden`);
        }
        return activity;
    }

    async create(createActivityDto: CreateActivityDto): Promise<Activity> {
        const activity = this.activityRepository.create(createActivityDto);
        return this.activityRepository.save(activity);
    }

    async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
        await this.findOne(id);
        await this.activityRepository.update(id, updateActivityDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const activity: Activity = await this.findOne(id);
        await this.activityRepository.remove(activity);
    }
}
