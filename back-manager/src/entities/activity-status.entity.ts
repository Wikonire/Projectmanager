import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('activity_status')
export class ActivityStatusEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', unique: true, length: 50, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 80, nullable: true})
    description: string;
}
