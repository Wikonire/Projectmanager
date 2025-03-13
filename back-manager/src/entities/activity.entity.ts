import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {ProjectPhase} from './project-phase.entity';
import {ActivityStatusEntity} from './activity-status.entity';
import {Document} from './document.entity';

@Entity('activity')
export class ActivityEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 255})
    title: string;

    @CreateDateColumn({nullable: true, default: null})
    plannedStartDate?: Date;

    @CreateDateColumn({nullable: true, default: null})
    plannedEndDate?: Date;

    @CreateDateColumn({type: 'timestamp', nullable: true, default: null})
    actualStartDate?: Date;

    @CreateDateColumn({type: 'timestamp', nullable: true, default: null})
    actualEndDate?: Date;

    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;

    @Column('smallint')
    estimation: number;

    @ManyToOne(() => ProjectPhase, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'phase_id' })
    phase?: ProjectPhase;

    @ManyToOne(() => ActivityStatusEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_status_id' })
    activityStatus: ActivityStatusEntity;

    @OneToMany(() => Document, (document) => document.activity, { cascade: true, nullable: true })
    documents?: Document[];
}
