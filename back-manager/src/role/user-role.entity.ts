import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Role } from './role.entity';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.roles)
    user: User;

    @ManyToOne(() => Role, (role) => role.userRoles)
    role: Role;
}
