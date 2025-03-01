import {Controller, Get, Post, Put, Delete, Param, Body, UseGuards} from '@nestjs/common';
import { CreateDocumentDto, UpdateDocumentDto } from './document.dto';
import {DocumentsService} from './document.service';
import {PermissionsGuard} from '../permissions/permissions.guard';
import {Role} from '../permissions/roles.enum';
import {Roles} from '../permissions/roles.decorator';

@Controller('documents')
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

    @Roles(Role.Admin, Role.ProjectLeader)
    @UseGuards(PermissionsGuard)
    @Post()
    create(@Body() createDocumentDto: CreateDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }

    @Roles(Role.Admin, Role.ProjectLeader, Role.ProjectOwner)
    @UseGuards(PermissionsGuard)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }

    @Roles(Role.Admin)
    @UseGuards(PermissionsGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.documentsService.remove(id);
    }
}
