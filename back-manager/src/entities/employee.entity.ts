import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {EmployeePmFunction} from './employee-pm-function.entity';
import {UserEntity} from './user.entity';
import {Document} from './document.entity';
import {ProjectEntity} from './project.entity';

@Entity('employee')
export class EmployeeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    last_name: string;

    @Column({length: 100})
    first_name: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @OneToMany(() => ProjectEntity, (project) => project.leader, { cascade: true, eager: true, nullable: true })
    projectsToLead: ProjectEntity[];

    @OneToOne(() => UserEntity, (user) => user.employee)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @OneToMany(() => EmployeePmFunction, (epf) => epf.employee)
    employeePmFunctions: EmployeePmFunction[];


}
