import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ActivityStatus {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, length: 50})
    name: string;
}
