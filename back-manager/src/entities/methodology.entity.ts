import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ProjectEntity} from './project.entity';

@Entity('methodology')
export class MethodologyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, length: 100})
    name: string;

    @Column({type: 'varchar', nullable: false, length: 255 })
    description: string;

    @OneToMany(() => ProjectEntity, (project) => project.methodology)
    projects: ProjectEntity[];

}
