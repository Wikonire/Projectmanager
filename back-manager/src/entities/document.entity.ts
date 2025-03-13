import {Check, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BeforeUpdate, BeforeInsert, ManyToOne, JoinColumn} from 'typeorm';
import {ActivityEntity} from './activity.entity';
import {ProjectPhase} from './project-phase.entity';
import {ProjectEntity} from './project.entity';
import {BadRequestException} from '@nestjs/common';

@Entity('document')
@Check('(path IS NULL AND content IS NOT NULL) OR (path IS NOT NULL AND content IS NULL)')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    title: string;

    @Column({type: 'text', nullable: true, default: null, })
    content: string;

    @Column({type: 'text', nullable: true, default: null, })
    path: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => ProjectEntity, (project) => project.documents, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'projectId' })
    project?: ProjectEntity;

    @ManyToOne(() => ProjectPhase, (phase) => phase.documents, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'phaseId' })
    phase?: ProjectPhase;

    @ManyToOne(() => ActivityEntity, (activity) => activity.documents, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'activityId' })
    activity?: ActivityEntity;


    @BeforeInsert()
    @BeforeUpdate()
    validateRelations() {
        const assignedRelations = [this.project, this.phase, this.activity].filter((relation) => relation !== undefined);
        if (assignedRelations.length !== 1) {
            throw new BadRequestException(
                'Ein Dokument muss genau einem Projekt, einer Phase oder einer Aktivität zugewiesen sein.'
            );
        }
    }
}
