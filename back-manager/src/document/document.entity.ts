import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Phase } from '../phases/phase.entity';
import { Activity } from '../activities/activity.entity';
import { Project } from '../project/project.entity';

@Entity()
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'bytea' })
    content: Buffer;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    upload_date: Date;

    @ManyToOne(() => Project, (project) => project.documents, { onDelete: 'CASCADE', nullable: true })
    project?: Project;

    @ManyToOne(() => Phase, (phase) => phase.documents, { onDelete: 'CASCADE', nullable: true })
    phase?: Phase;

    @ManyToOne(() => Activity, (activity) => activity.documents, { onDelete: 'CASCADE', nullable: true })
    activity?: Activity;
}
