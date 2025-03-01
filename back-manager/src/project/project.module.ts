import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import {ProjectService} from './project.service';
import {DocumentsModule} from '../document/documents.module';
import {PhasesModule} from '../phases/phases.module';

@Module({
    imports: [TypeOrmModule.forFeature([Project]), DocumentsModule, PhasesModule],
    providers: [ProjectService],
    controllers: [ProjectsController],
    exports: [ProjectService],
})
export class ProjectsModule {}
