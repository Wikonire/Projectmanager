import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import { ProjectEntity } from './project.entity';
import { PhaseStatus } from './phase-status.entity';
import {PhaseName} from './phase-name.entity';
import {Document} from './document.entity';
import {ActivityEntity} from './activity.entity';

@Entity('project_phase')
export class ProjectPhase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => PhaseName, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'nameId' })
    phaseName: PhaseName;


    @ManyToOne(() => ProjectEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'projectId' })
    project: ProjectEntity;

    @OneToMany(() => ActivityEntity, (activity) => activity.phase, { cascade: true, nullable: true })
    activities: ProjectPhase[];

    @ManyToOne(() => PhaseStatus, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'phaseStatusId' })
    phaseStatus?: PhaseStatus;

    @OneToMany(() => Document, (document) => document.phase, { cascade: true, nullable: true })
    documents: Document[];


    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;

    @Column({ type: 'timestamp', nullable: true })
    plannedStartDate?: Date;

    @Column({ type: 'timestamp', nullable: true })
    plannedEndDate?: Date;

    @Column({ type: 'timestamp', nullable: true })
    actualStartDate?: Date;

    @Column({ type: 'timestamp', nullable: true })
    actualEndDate?: Date;
}
