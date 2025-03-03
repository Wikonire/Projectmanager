import {Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';
import { DocumentRelation } from './document-relation.entity';

@Entity('document')
export class Document {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => DocumentRelation, (relation) => relation.document, { cascade: true })
    relations: DocumentRelation[];
}
