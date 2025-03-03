import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Min} from 'class-validator';
import {ExternalCostType} from './external-cost-type.entity';

@Entity()
export class ExternalCosts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ExternalCostType, {onDelete: 'CASCADE'})
    costType: ExternalCostType;

    @Column('numeric', { precision: 10, scale: 2 })
    actualCosts: number;

}
