import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn('uuid') // UUID wird automatisch generiert
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true }) // Name ist eindeutig und hat eine Maximal-Länge von 50
    name: string;
}
