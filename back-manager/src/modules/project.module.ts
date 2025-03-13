import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from '../repositories/project.service';
import { ActivitiesService } from '../repositories/activities.service';
import { ActivitiesController } from '../controllers/activities.conroller';
import { ProjectsController } from '../controllers/projects.controller';
import { ProjectPhaseService } from '../repositories/project-phase.service';
import { DocumentsController } from '../controllers/documents.controller';
import { MilestonesController } from '../controllers/milestones.controller';
import { MilestoneService } from '../repositories/milestones.service';
import { DocumentsService } from '../repositories/document.service';
import { UsersService } from '../repositories/users.service';
import { UsersController } from '../controllers/users.controller';
import {ProjectPhase} from '../entities/project-phase.entity';
import {ProjectEntity} from '../entities/project.entity';
import {ActivityEntity} from '../entities/activity.entity';
import {MilestoneEntity} from '../entities/milestone.entity';
import {Document} from '../entities/document.entity';
import {User} from '../entities/user.entity';
import {Role} from '../entities/role.entity';
import {ProjectPriority} from '../entities/project-priority.entity';
import {ProjectStatus} from '../entities/project-status.entity';
import {PhaseStatus} from '../entities/phase-status.entity';
import {Employee} from '../entities/employee.entity';
import {EmployeePmFunction} from '../entities/employee-pm-function.entity';
import {PmFunction} from '../entities/pm-function.entity';
import {ActivityStatusEntity} from '../entities/activity-status.entity';
import {MethodologyEntity} from '../entities/methodology.entity';
import {PhaseName} from '../entities/phase-name.entity';
import {ProjectPhasesController} from '../controllers/project-phase.controller';
import {PhaseNameController} from '../controllers/phase-name.controller';
import {PhaseNameService} from '../repositories/phase-name.service';
import {ProjectStatusService} from '../repositories/project-status.service';


@Module({
    controllers: [
        ActivitiesController,
        ProjectsController,
        ProjectPhasesController,
        DocumentsController,
        MilestonesController,
        UsersController,
        PhaseNameController
    ],
    exports: [TypeOrmModule],
    imports: [
        TypeOrmModule.forFeature([
            ProjectEntity,
            ProjectStatus,
            ProjectPriority,
            ProjectPhase,
            ActivityEntity,
            MilestoneEntity,
            Document,
            User,
            Role,
            PhaseStatus,
            Employee,
            EmployeePmFunction,
            PmFunction,
            ActivityStatusEntity,
            MethodologyEntity,
            PhaseName

        ])
    ],
    providers: [
        ActivitiesService,
        ProjectService,
        ProjectStatusService,
        ProjectPhaseService,
        DocumentsService,
        MilestoneService,
        UsersService,
        PhaseNameService
    ]
})
export class ProjectModule {}
