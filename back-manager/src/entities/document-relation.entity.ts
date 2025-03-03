import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Document } from './document.entity';
import { DocumentType } from './document-type.entity';

@Entity('document_relation')
export class DocumentRelation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Document, (document) => document.relations, { onDelete: 'CASCADE' })
    document: Document;

    @ManyToOne(() => DocumentType, { onDelete: 'CASCADE' })
    relatedType: DocumentType;

    @Column({ type: 'uuid' })
    relatedId: string;
}
