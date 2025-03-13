import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('project_status')
export class ProjectStatus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, length: 50})
    name: string;

    @Column({length: 250})
    description: string;
}
