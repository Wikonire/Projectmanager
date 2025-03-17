import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto, UpdateDocumentDto } from '../dtos/document.dto';
import { Document } from '../entities/document.entity';

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
        return await this.documentRepository.findOneOrFail({
            where: { id },
            relations: ['project', 'phase', 'activity'],
        }).catch(() => {
            throw new NotFoundException(`Dokument mit ID ${id} nicht gefunden`);
        });
    }

    async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
        const document = this.documentRepository.create(createDocumentDto);
        return await this.documentRepository.save(document);
    }

    async update(id: string, updateDocumentDto: CreateDocumentDto): Promise<Document> {
        const document = await this.documentRepository.preload({ id, ...updateDocumentDto });
        console.log("updateDocumentDto")
        console.log(updateDocumentDto)
        if (!document) {
            throw new NotFoundException(`Dokument mit ID ${id} nicht gefunden`);
        }

        return await this.documentRepository.save(document);
    }

    async remove(id: string): Promise<void> {
        const document = await this.findOne(id);
        await this.documentRepository.remove(document);
    }
}
