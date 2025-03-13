import {Controller, Get, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProjectMetadataService} from '../repositories/project-metadata.service';

@Controller('project-metadata')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectMetadataController {
    constructor(private readonly projectMetadataService: ProjectMetadataService ) {}

    @Get('project-status')
    findAllProjectStatus() {
        return this.projectMetadataService.findAllProjectStatus();
    }

    @Get('project-priorities')
    findAllProjectPriorities() {
        return this.projectMetadataService.findAllProjectPriorities();
    }

    @Get('phase-status')
    findAllPhaseStatus() {
        return this.projectMetadataService.findAllPhaseStatus();
    }

    @Get('activity-status')
    findAllActivityStatus() {
        return this.projectMetadataService.findAllActivityStatus();
    }

    @Get('methodologies')
    findAllMethodologies() {
        return this.projectMetadataService.findAllMethodologies();
    }
}
