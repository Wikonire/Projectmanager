import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {EmployeeEntity} from './employee.entity';
import {PmFunction} from './pm-function.entity';

@Entity()
export class EmployeePmFunction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => EmployeeEntity, {onDelete: 'CASCADE'})
    employee: EmployeeEntity;


    @ManyToOne(() => PmFunction, {onDelete: 'CASCADE'})
    pmFunction: PmFunction;

    @Column('numeric', {precision: 5, scale: 2})
    @Min(0)
    @Max(100)
    workload: number;
}
