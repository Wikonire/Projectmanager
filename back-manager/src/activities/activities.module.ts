import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';
import { PhasesModule } from '../phases/phases.module';
import {ActivitiesController} from './activities.conroller';
import {DocumentsModule} from '../document/documents.module';

@Module({
    imports: [TypeOrmModule.forFeature([Activity]), PhasesModule, DocumentsModule],
    providers: [ActivitiesService],
    controllers: [ActivitiesController],
    exports: [ActivitiesService],
})
export class ActivitiesModule {}
