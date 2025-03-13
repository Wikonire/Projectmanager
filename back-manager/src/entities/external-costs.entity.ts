import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ExternalCostType} from './external-cost-type.entity';
import {ProjectEntity} from './project.entity';

@Entity('external_costs')
export class ExternalCostsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExternalCostType, {onDelete: 'SET NULL'})
    @JoinColumn({ name: 'costTypeId' })
    costType: ExternalCostType;

    @Column('numeric', { precision: 10, scale: 2 , default: 0})
    actualCosts: number;

    @ManyToMany(() => ProjectEntity, (project) => project.externalCosts, { onDelete: 'SET NULL' })
    projects: ProjectEntity[];



}
