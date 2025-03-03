import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {ProjectPriority} from './project-priority.entity';
import {ProjectStatus} from './project-status.entity';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, length: 50})
    projectReference: string;

    @Column({length: 255})
    title: string;

    @Column('text', {nullable: true})
    description?: string;

    @Column('date', {nullable: true})
    approvalDate?: Date;

    @Column({length: 255, nullable: true})
    approvalSignature?: string;

    @ManyToOne(() => ProjectPriority, {onDelete: 'CASCADE'})
    priority: ProjectPriority;

    @ManyToOne(() => ProjectStatus, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'status_id' })
    status: ProjectStatus;


    @Column('numeric', {precision: 5, scale: 2, default: 0})
    @Min(0)
    @Max(100)
    progress: number;

    @Column('date', {nullable: true})
    plannedStartDate?: Date;

    @Column('date', {nullable: true})
    plannedEndDate?: Date;

    @Column('date', {nullable: true})
    actualStartDate?: Date;

    @Column('date', {nullable: true})
    actualEndDate?: Date;

    @Column({length: 50})
    methodology: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}
