import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {ProjectModule} from './modules/project.module';
import {Project} from './entities/project.entity';
import {ProjectPhase} from './entities/project-phase.entity';
import {Activity} from './entities/activity.entity';
import {Milestone} from './entities/milestone.entity';
import {Document} from './entities/document.entity';
import {User} from './entities/user.entity';
import {Role} from './entities/role.entity';
import {ProjectPriority} from './entities/project-priority.entity';
import {ProjectStatus} from './entities/project-status.entity';
import {PhaseStatus} from './entities/phase-status.entity';
import {DocumentRelation} from './entities/document-relation.entity';
import {Employee} from './entities/employee.entity';
import {EmployeePmFunction} from './entities/employee-pm-function.entity';
import {PmFunction} from './entities/pm-function.entity';
import {ActivityStatus} from './entities/activity-status.entity';
import {DocumentType} from './entities/document-type.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // Migrations nutzen, nicht automatisch synchronisieren
      dropSchema: false, // Falls die gesamte DB nicht bei jedem Start gelöscht werden soll
      logging: ["query", "error"], // Debugging aktivieren
      entities: [__dirname + "/entities/*.entity{.ts,.js}"],
      migrations: [__dirname + "/migrations/*.ts"],
    }),
    ProjectModule,

  ],
})
export class AppModule {}
