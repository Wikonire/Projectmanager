import {
    Check,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ProjectPriority } from './project-priority.entity';
import { ProjectStatus } from './project-status.entity';
import { ProjectPhase } from './project-phase.entity';
import { Document } from './document.entity';
import {MethodologyEntity} from './methodology.entity';
import {ExternalCostsEntity} from './external-costs.entity';
import {EmployeeEntity} from './employee.entity';
import {UserEntity} from './user.entity';

@Entity('project')
@Check('progress >= 0 AND progress <= 100')
export class ProjectEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'varchar', length: 255 })
    title: string;

    @Column('text', { nullable: true })
    description?: string;

    @Column('date', { nullable: true })
    approvalDate?: Date;

    @Column({ length: 255, nullable: true })
    approvalSignature?: string;

    @ManyToOne(() => ProjectPriority, { onDelete: 'SET NULL'})
    @JoinColumn({ name: 'priority_id' })
    priority: ProjectPriority;

    @ManyToOne(() => EmployeeEntity, (employee) => employee.projectsToLead, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'leaderId' })
    leader: EmployeeEntity;

    @ManyToOne(() => ProjectStatus, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'status_id'})
    status: ProjectStatus;

    @Column('numeric', { precision: 5, scale: 2, default: 0 })
    progress: number;

    @CreateDateColumn({nullable: true, default: null})
    plannedStartDate?: Date;

    @CreateDateColumn({nullable: true, default: null})
    plannedEndDate?: Date;

    @CreateDateColumn({nullable: true, default: null})
    actualStartDate?: Date;

    @CreateDateColumn({nullable: true, default: null})
    actualEndDate?: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany(() => ProjectPhase, (phase) => phase.project, { cascade: true, eager: true, nullable: true })
    projectPhases: ProjectPhase[];

    @OneToMany(() => Document, (document) => document.project, { cascade: true, eager: true, nullable: true })
    documents: Document[];

    @ManyToMany(() => ExternalCostsEntity, (externalCosts:ExternalCostsEntity) => externalCosts.projects, { cascade: true, eager: true, nullable: true })
    @JoinTable({ name: 'project_external_costs', joinColumn: { name: 'project_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'external_costs_id', referencedColumnName: 'id' } })
    externalCosts: ExternalCostsEntity[];

    @ManyToOne(() => MethodologyEntity, (methodology:MethodologyEntity) => methodology.projects, { onDelete:'SET NULL', nullable: false , eager: true})
    @JoinColumn({ name: 'methodology_id' })
    methodology: MethodologyEntity;


}
