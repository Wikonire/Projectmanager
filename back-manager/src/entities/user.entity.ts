import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {Employee} from './employee.entity';
import {RoleEntity} from './role.entity';

@Entity('pm_user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50, unique: true})
    username: string;

    @Column({length: 100, unique: true})
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
    employees?: Employee[];

    @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
    @JoinTable({
        name: 'user_role',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    })
    roles: RoleEntity[];

    /**
     * Vor dem Speichern wird die E-Mail auf Kleinbuchstaben umgestellt.
     */
    @BeforeInsert()
    normalizeEmail() {
        this.email = this.email.toLowerCase();
    }


    /**
     * Vor dem Speichern wird das Passwort gehasht.
     */
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
