import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {Project} from './project.entity';

@Injectable()
export class ProjectRepository extends Repository<Project> {
    constructor(private dataSource: DataSource) {
        super(Project, dataSource.createEntityManager());
    }

    async findByReference(reference: string): Promise<Project | null> {
        return this.findOne({ where: { project_reference: reference } });
    }
}
