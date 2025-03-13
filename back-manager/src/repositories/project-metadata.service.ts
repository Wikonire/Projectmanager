import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {ProjectStatus} from '../entities/project-status.entity';
import {ProjectPriority} from '../entities/project-priority.entity';
import {PhaseStatus} from '../entities/phase-status.entity';
import {ActivityStatusEntity} from '../entities/activity-status.entity';
import {MethodologyEntity} from '../entities/methodology.entity';

@Injectable()
export class ProjectMetadataService {
    constructor(
        @InjectRepository(ProjectStatus)
        private readonly projectStatusRepository: Repository<ProjectStatus>,

        @InjectRepository(ProjectPriority)
        private readonly projectPriorityRepository: Repository<ProjectPriority>,

        @InjectRepository(PhaseStatus)
        private readonly phaseStatusRepository: Repository<PhaseStatus>,

        @InjectRepository(ActivityStatusEntity)
        private readonly activityStatusRepository: Repository<ActivityStatusEntity>,

        @InjectRepository(MethodologyEntity)
        private readonly methodologyRepository: Repository<MethodologyEntity>,
    ) {}

    async findAllProjectStatus() {
        return this.projectStatusRepository.find();
    }

    async findAllProjectPriorities() {
        return this.projectPriorityRepository.find();
    }

    async findAllPhaseStatus() {
        return this.phaseStatusRepository.find();
    }

    async findAllActivityStatus() {
        return this.activityStatusRepository.find();
    }

    async findAllMethodologies() {
        return this.methodologyRepository.find();
    }
}
