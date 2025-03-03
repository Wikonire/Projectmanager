import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProjectStatus} from '../entities/project-status.entity';


@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(ProjectStatus)
        private roleRepository: Repository<ProjectStatus>,
    ) {}

    /**
     * Holt den Status anhand der UUID
     * @param statusId - ID des Status (UUID)
     * @returns ProjectStatusDto
     */
    async getStatusById(statusId: string): Promise<ProjectStatus> {
        const status = await this.roleRepository.findOneBy({ id: statusId });
   if (!status) {
            throw new NotFoundException(`Status with ID ${statusId} not found`);
        }
        return {
            id: status.id,
            name: status.name,
        };
    }
}
