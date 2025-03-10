import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {Project} from './project.entity';
import {PhaseStatus} from './phase-status.entity';

@Entity()
export class ProjectPhase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Project, {onDelete: 'CASCADE'})
    project: Project;

    @ManyToOne(() => PhaseStatus, {onDelete: 'CASCADE'})
    phaseStatus: PhaseStatus;

    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;
}
