import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {EmployeePmFunction} from './employee-pm-function.entity';
import {User} from './user.entity';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    last_name: string;

    @Column({length: 100})
    first_name: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @ManyToMany(() => User, (user) => user.employees)
    users: User[];

    @OneToMany(() => EmployeePmFunction, (epf) => epf.employee)
    employeePmFunctions: EmployeePmFunction[];


}
