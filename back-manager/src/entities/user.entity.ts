import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Employee} from './employee.entity';

@Entity('pm_user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, unique: true})
    username: string;

    @Column({length: 320, unique: true})
    email: string;

    @Column({length: 255})
    password: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ManyToMany(() => Employee, (employee) => employee.users, { cascade: true })
    @JoinTable({
        name: 'employee_user',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'employee_id', referencedColumnName: 'id' }
    })
    employees: Employee[];
}
