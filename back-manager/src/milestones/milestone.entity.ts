import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Phase } from '../phases/phase.entity';

@Entity()
export class Milestone {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'date', nullable: true })
    planned_date?: Date;

    @Column({ type: 'date', nullable: true })
    actual_date?: Date;

    @Column()
    status: string;

    @ManyToOne(() => Phase, (phase:Phase) => phase.milestones, { onDelete: 'CASCADE' })
    phase: Phase;
}
