import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {ProjectPhase} from './project-phase.entity';

@Entity('phase_name')
@Unique(['name'])
export class PhaseName {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 80, unique: true})
    name: string;

    @OneToMany(() => ProjectPhase, (phase) => phase.phaseName)
    projectPhases: ProjectPhase[];
}
