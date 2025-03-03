import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {ProjectPhase} from './project-phase.entity';
import {ActivityStatus} from './activity-status.entity';

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ManyToOne(() => ProjectPhase, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'phase_id' })
    phase?: ProjectPhase;

    @ManyToOne(() => ActivityStatus, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activity_status_id' })
    activityStatus: ActivityStatus;

    @Column({length: 255})
    title: string;

    @Column('date', {nullable: true})
    plannedStartDate?: Date;

    @Column('date', {nullable: true})
    plannedEndDate?: Date;

    @Column('timestamp', {nullable: true})
    actualStartDate?: Date;

    @Column('timestamp', {nullable: true})
    actualEndDate?: Date;

    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;

    @Column('smallint')
    estimation: number;
}
