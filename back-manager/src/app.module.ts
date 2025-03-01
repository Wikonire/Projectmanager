import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PhasesModule } from './phases/phases.module';
import { ActivitiesModule } from './activities/activities.module';
import { MilestonesModule } from './milestones/milestones.module';
import { PermissionsModule } from './permissions/permissions.module';
import {UsersModule} from './user/users.module';
import {ProjectsModule} from './project/project.module';
import {DocumentsModule} from './document/documents.module';

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
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
    PhasesModule,
    ActivitiesModule,
    MilestonesModule,
    DocumentsModule,
    PermissionsModule,
  ],
})
export class AppModule {}
