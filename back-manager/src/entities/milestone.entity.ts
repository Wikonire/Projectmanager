import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectPhase} from './project-phase.entity';
import {ActivityEntity} from './activity.entity';

@Entity('milestone')
export class MilestoneEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProjectPhase, { onDelete: 'CASCADE', nullable: true })
    phase?: ProjectPhase;

    @ManyToOne(() => ActivityEntity, { onDelete: 'CASCADE', nullable: true })
    activity?: ActivityEntity;

    @Column({ length: 255 })
    title: string;

    @Column('date', { nullable: true })
    plannedDate?: Date;

    @Column('date', { nullable: true })
    actualDate?: Date;

    @Column('text', { nullable: true })
    description?: string;
}
