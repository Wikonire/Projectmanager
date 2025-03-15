import { Controller, Get } from '@nestjs/common';
import {ProjectStatusService} from '../repositories/project-status.service';
import {ProjectStatus} from '../entities/project-status.entity';

@Controller('status-names')
export class StatusNameController {
    constructor(private readonly statusService: ProjectStatusService) {}

    @Get()
    async getAll():Promise<ProjectStatus[]>  {
        return this.statusService.findAllName();
    }

}
