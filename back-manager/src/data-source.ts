import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";

import {Activity} from './entities/activity.entity';
import {Role} from './entities/role.entity';
import {Project} from './entities/project.entity';
import {Milestone} from './entities/milestone.entity';
import {ProjectPhase} from './entities/project-phase.entity';
import {ProjectPriority} from './entities/project-priority.entity';
import {ActivityStatus} from './entities/activity-status.entity';
import {Document} from './entities/document.entity';
import {ProjectStatus} from './entities/project-status.entity';
import {User} from './entities/user.entity';
import {PhaseStatus} from './entities/phase-status.entity';
import {DocumentType} from './entities/document-type.entity';
import {DocumentRelation} from './entities/document-relation.entity';
import {Employee} from './entities/employee.entity';
import {EmployeePmFunction} from './entities/employee-pm-function.entity';
import {PmFunction} from './entities/pm-function.entity';
dotenv.config({path: './.env'});


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "superuser",
    database: "DB_ProjectManager",
   /* entities: [
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
    ],*/
    logging: true,
    synchronize: true,
})
/*
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Nutze besser Migrations
    logging: true,
    entities: [
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
],
    subscribers: [],
});*/



