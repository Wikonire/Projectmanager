import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty, IsString, Max, Min} from 'class-validator';
import {Project} from './project.entity';
import {PhaseStatus} from './phase-status.entity';

@Entity()
export class ProjectPhase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, nullable: false})
    title: string;

    @ManyToOne(() => Project, {onDelete: 'CASCADE'})
    project: Project;

    @ManyToOne(() => PhaseStatus, {onDelete: 'CASCADE'})
    phaseStatus: PhaseStatus;

    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;
}
