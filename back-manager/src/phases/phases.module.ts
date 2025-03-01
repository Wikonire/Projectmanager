import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhasesService } from './phases.service';
import { PhasesController } from './phases.controller';
import { Phase } from './phase.entity';
import {ProjectsModule} from '../project/project.module';
import {ActivitiesModule} from '../activities/activities.module';
import {DocumentsModule} from '../document/documents.module';
import {MilestonesModule} from '../milestones/milestones.module';

@Module({
    imports: [TypeOrmModule.forFeature([Phase]), ProjectsModule, ActivitiesModule, DocumentsModule, MilestonesModule],
    providers: [PhasesService],
    controllers: [PhasesController],
    exports: [PhasesService],
})
export class PhasesModule {}
