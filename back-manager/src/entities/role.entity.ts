import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from './user.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 80, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 250, nullable: true })
    description: string;

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];
}
