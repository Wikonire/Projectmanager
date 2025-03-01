import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Phase} from '../phases/phase.entity';
import {Document} from '../document/document.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    project_reference: string;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'date', nullable: true })
    approval_date: Date;

    @Column()
    priority: string;

    @Column()
    status: string;

    @Column({ type: 'date', nullable: true })
    planned_start_date: Date;

    @Column({ type: 'date', nullable: true })
    planned_end_date: Date;

    @Column({ type: 'date', nullable: true })
    actual_start_date: Date;

    @Column({ type: 'date', nullable: true })
    actual_end_date: Date;

    @Column()
    methodology: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    progress: number;

    @OneToMany(() => Phase, (phase) => phase.project, { cascade: true })
    phases: Phase[];

    @OneToMany(() => Document, (document) => document.project, { cascade: true })
    documents: Document[];
}
