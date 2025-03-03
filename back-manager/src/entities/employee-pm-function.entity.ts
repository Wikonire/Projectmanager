import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Max, Min} from 'class-validator';
import {Employee} from './employee.entity';
import {PmFunction} from './pm-function.entity';

@Entity()
export class EmployeePmFunction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Employee, {onDelete: 'CASCADE'})
    employee: Employee;


    @ManyToOne(() => PmFunction, {onDelete: 'CASCADE'})
    pmFunction: PmFunction;

    @Column('numeric', {precision: 5, scale: 2})
    @Min(0)
    @Max(100)
    workload: number;
}
