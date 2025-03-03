import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('document_type')
export class DocumentType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, length: 50 })
    name: string;
}
