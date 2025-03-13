import {Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe} from '@nestjs/common';

import {DocumentsService} from '../repositories/document.service';
import {CreateDocumentDto, UpdateDocumentDto} from '../dtos/document.dto';

@Controller('documents')
@UsePipes(new ValidationPipe({ transform: true }))
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @Get()
    findAll() {
        return this.documentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id);
    }

   // @Roles(Role.Admin, Role.ProjectLeader)
    @Post()
    create(@Body() createDocumentDto: CreateDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }

    //@Roles(Role.Admin, Role.ProjectLeader, Role.ProjectOwner)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }

    // @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentsService.remove(id);
    }
}
