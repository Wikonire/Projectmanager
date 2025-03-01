import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import { Phase } from '../phases/phase.entity';
import { Document } from '../document/document.entity';

@Entity()
export class Activity {
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

    @ManyToOne(() => Phase, (phase) => phase.activities, { onDelete: 'CASCADE' })
    phase: Phase;

    @OneToMany(() => Document, (document) => document.activity, { cascade: true })
    documents: Document[];
}
