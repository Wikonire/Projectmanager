import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EmployeePmFunction} from './employee-pm-function.entity';

@Entity()
export class PmFunction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100, unique: true})
    pmFunctionName: string;

    @OneToMany(() => EmployeePmFunction, (epf) => epf.pmFunction)
    employeePmFunctions: EmployeePmFunction[];
}
