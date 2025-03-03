import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectPhase} from './project-phase.entity';
import {Activity} from './activity.entity';

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ProjectPhase, { onDelete: 'CASCADE', nullable: true })
    phase?: ProjectPhase;

    @ManyToOne(() => Activity, { onDelete: 'CASCADE', nullable: true })
    activity?: Activity;

    @Column({ length: 255 })
    title: string;

    @Column('date', { nullable: true })
    plannedDate?: Date;

    @Column('date', { nullable: true })
    actualDate?: Date;

    @Column('text', { nullable: true })
    description?: string;
}
