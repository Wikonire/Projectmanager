import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import {Project} from '../project/project.entity';
import {Activity} from '../activities/activity.entity';
import {Milestone} from '../milestones/milestone.entity';
import {Document} from '../document/document.entity';

@Entity()
export class Phase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'date', nullable: true })
    planned_start_date?: Date;

    @Column({ type: 'date', nullable: true })
    planned_end_date?: Date;

    @Column({ type: 'date', nullable: true })
    actual_start_date?: Date;

    @Column({ type: 'date', nullable: true })
    actual_end_date?: Date;

    @Column()
    status: string;

    @ManyToOne(() => Project, (project) => project.phases, { onDelete: 'CASCADE' })
    project: Project;

    @OneToMany(() => Activity, (activity) => activity.phase, { cascade: true })
    activities: Activity[];

    @OneToMany(() => Milestone, (milestone) => milestone.phase, { cascade: true })
    milestones: Milestone[];

    @OneToMany(() => Document, (document) => document.phase, { cascade: true })
    documents: Document[];
}
