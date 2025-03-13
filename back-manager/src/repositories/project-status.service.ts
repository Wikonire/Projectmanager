import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProjectStatus} from '../entities/project-status.entity';


@Injectable()
export class ProjectStatusService {
    constructor(
        @InjectRepository(ProjectStatus)
        private statusRepository: Repository<ProjectStatus>,
    ) {}

    /**
     * Retrieves a project status based on either its name or ID.
     *
     * @param {Object} option - An object that contains either an ID or a name to identify the status.
     * @param {string} [option.id] - The unique identifier of the status.
     * @param {string} [option.name] - The name of the status.
     * @return {Promise<ProjectStatus>} A promise that resolves to the matching project status.
     * @throws {NotFoundException} If no status is found matching the provided ID or name.
     */
    async getStatusByNameOrId(option: Partial<{ id: string; name: string }>): Promise<ProjectStatus> {
        const whereCondition = option.id ? { id: option.id } : { name: option.name };
        const status = await this.statusRepository.findOneBy(whereCondition);
   if (!status) {
       throw new NotFoundException(`Status with ${option.id ? 'ID' : 'Name'} ${option.id || option.name} not found`);
        }
        return status;
    }
}
