import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('project_priority')
export class ProjectPriority {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50})
    name: string;
}
