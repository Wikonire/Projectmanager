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
import { ProjectPhase } from '../entities/project-phase.entity';
import { ProjectEntity } from '../entities/project.entity';
import { ActivityEntity } from '../entities/activity.entity';
import { MilestoneEntity } from '../entities/milestone.entity';
import { Document } from '../entities/document.entity';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';
import { ProjectPriority } from '../entities/project-priority.entity';
import { ProjectStatus } from '../entities/project-status.entity';
import { PhaseStatus } from '../entities/phase-status.entity';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeePmFunction } from '../entities/employee-pm-function.entity';
import { PmFunction } from '../entities/pm-function.entity';
import { ActivityStatusEntity } from '../entities/activity-status.entity';
import { MethodologyEntity } from '../entities/methodology.entity';
import { PhaseName } from '../entities/phase-name.entity';
import { ProjectPhasesController } from '../controllers/project-phase.controller';
import { PhaseNameController } from '../controllers/phase-name.controller';
import { PhaseNameService } from '../repositories/phase-name.service';
import { ProjectStatusService } from '../repositories/project-status.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from '../auth/auth.controller';
import {RolesController} from '../controllers/roles.controller';
import {AuthService} from '../auth/auth.service';
import {JwtStrategy} from '../auth/jwt.strategy';
import {RoleService} from '../repositories/role.service';
import {StatusNameController} from '../controllers/status-name.controller';

@Module({
    controllers: [
        ActivitiesController,
        ProjectsController,
        ProjectPhasesController,
        DocumentsController,
        MilestonesController,
        UsersController,
        PhaseNameController,
        AuthController,
        UsersController,
        RolesController,
        StatusNameController,
    ],
    imports: [
        ConfigModule, // Stellt sicher, dass ConfigService verfügbar ist
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([
            ProjectEntity,
            ProjectStatus,
            ProjectPriority,
            ProjectPhase,
            ActivityEntity,
            MilestoneEntity,
            Document,
            UserEntity,
            RoleEntity,
            PhaseStatus,
            EmployeeEntity,
            EmployeePmFunction,
            PmFunction,
            ActivityStatusEntity,
            MethodologyEntity,
            PhaseName,
            UserEntity,
            RoleEntity,
        ])
    ],
    exports: [TypeOrmModule, JwtModule],
    providers: [
        ActivitiesService,
        ProjectService,
        ProjectStatusService,
        ProjectPhaseService,
        DocumentsService,
        MilestoneService,
        UsersService,
        PhaseNameService,
        AuthService,
        JwtStrategy,
        RoleService
    ]
})
export class ProjectModule {}
