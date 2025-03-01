import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Document} from './document.entity';
import {CreateDocumentDto, UpdateDocumentDto} from './document.dto';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) {}

    async findAll(): Promise<Document[]> {
        return this.documentRepository.find({ relations: ['project', 'phase', 'activity'] });
    }

    async findOne(id: string): Promise<Document> {
        const document = await this.documentRepository.findOne({ where: { id }, relations: ['project', 'phase', 'activity'] });
        if (!document) {
            throw new NotFoundException(`Dokument mit ID ${id} nicht gefunden`);
        }
        return document;
    }

    async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
        const document = this.documentRepository.create(createDocumentDto);
        return this.documentRepository.save(document);
    }

    async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
        await this.findOne(id);
        await this.documentRepository.update(id, updateDocumentDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const document = await this.findOne(id);
        await this.documentRepository.remove(document);
    }
}
