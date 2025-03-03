import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ProjectPriority {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 50})
    name: string;
}
