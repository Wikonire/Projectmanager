import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhasesModule } from '../phases/phases.module';
import { ActivitiesModule } from '../activities/activities.module';
import {ProjectsModule} from '../project/project.module';
import {DocumentsService} from './document.service';
import {DocumentsController} from './documents.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Document]), ProjectsModule, PhasesModule, ActivitiesModule],
    providers: [DocumentsService],
    controllers: [DocumentsController],
    exports: [DocumentsService],
})
export class DocumentsModule {}
