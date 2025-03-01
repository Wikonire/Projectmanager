import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MilestonesService } from './milestones.service';
import { MilestonesController } from './milestones.controller';
import { Milestone } from './milestone.entity';
import { PhasesModule } from '../phases/phases.module';

@Module({
    imports: [TypeOrmModule.forFeature([Milestone]), PhasesModule],
    providers: [MilestonesService],
    controllers: [MilestonesController],
    exports: [MilestonesService],
})
export class MilestonesModule {}
