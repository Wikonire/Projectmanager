import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProjectPriority} from '../entities/project-priority.entity';
import {ProjectPriorityDto} from '../dtos/project-priority.dto';

@Injectable()
export class PriorityService {
    constructor(
        @InjectRepository(ProjectPriority)
        private readonly priorityRepository: Repository<ProjectPriority>,
    ) {}

    /**
     * Holt die Priorität anhand der UUID
     * @param priorityId - ID der Priorität (UUID)
     * @returns ProjectPriorityDto
     */
    async getPriorityById(priorityId: string): Promise<ProjectPriorityDto> {
        const priority = await this.priorityRepository.findOne({ where: { id: priorityId } });
        if (!priority) {
            throw new NotFoundException(`Priorität mit ID ${priorityId} nicht gefunden`);
        }

        return {
            id: priority.id,
            name: priority.name,
        };
    }
    /**
     * Holt die Priorität anhand der UUID
     * @param priorityName - ID der Priorität (UUID)
     * @returns ProjectPriorityDto
     */
    async getPriorityByName(priorityName: string): Promise<ProjectPriorityDto> {
        const priority = await this.priorityRepository.findOneOrFail({ where: { name: priorityName }});
        if (!priority) {
            throw new NotFoundException(`Priority with Name ${priorityName} not found`);
        }
        return {
            id: priority.id,
            name: priority.name,
        };
    }
}
