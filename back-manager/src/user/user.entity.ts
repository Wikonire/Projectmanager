import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {UserRole} from '../role/user-role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => UserRole, (userRole:UserRole) => userRole.user)
    roles: UserRole[];
}
