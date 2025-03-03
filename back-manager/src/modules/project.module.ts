import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from '../repositories/project.service';
import { ActivitiesService } from '../repositories/activities.service';
import { ActivitiesController } from '../controllers/activities.conroller';
import { ProjectsController } from '../controllers/projects.controller';
import { PhasesService } from '../repositories/phases.service';
import { PhasesController } from '../controllers/phases.controller';
import { DocumentsController } from '../controllers/documents.controller';
import { MilestonesController } from '../controllers/milestones.controller';
import { MilestoneService } from '../repositories/milestones.service';
import { DocumentsService } from '../repositories/document.service';
import { UsersService } from '../repositories/users.service';
import { UsersController } from '../controllers/users.controller';
import {ProjectPhase} from '../entities/project-phase.entity';
import {Project} from '../entities/project.entity';
import {Activity} from '../entities/activity.entity';
import {Milestone} from '../entities/milestone.entity';
import {Document} from '../entities/document.entity';
import {User} from '../entities/user.entity';
import {Role} from '../entities/role.entity';
import {ProjectPriority} from '../entities/project-priority.entity';
import {ProjectStatus} from '../entities/project-status.entity';
import {PhaseStatus} from '../entities/phase-status.entity';
import {DocumentType} from '../entities/document-type.entity';
import {DocumentRelation} from '../entities/document-relation.entity';
import {Employee} from '../entities/employee.entity';
import {EmployeePmFunction} from '../entities/employee-pm-function.entity';
import {PmFunction} from '../entities/pm-function.entity';
import {ActivityStatus} from '../entities/activity-status.entity';


@Module({
    controllers: [
        ActivitiesController,
        ProjectsController,
        PhasesController,
        DocumentsController,
        MilestonesController,
        UsersController
    ],
    exports: [TypeOrmModule],
    imports: [
        TypeOrmModule.forFeature([
            Project,
            ProjectStatus,
            ProjectPriority,
            ProjectPhase,
            Activity,
            Milestone,
            Document,
            User,
            Role,
            PhaseStatus,
            DocumentType,
            DocumentRelation,
            Employee,
            EmployeePmFunction,
            PmFunction,
            ActivityStatus,

        ])
    ],
    providers: [
        ActivitiesService,
        ProjectService,
        PhasesService,
        DocumentsService,
        MilestoneService,
        UsersService
    ]
})
export class ProjectModule {}
