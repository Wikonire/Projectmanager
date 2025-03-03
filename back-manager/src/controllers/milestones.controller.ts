import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import {CreateMilestoneDto, UpdateMilestoneDto} from '../dtos/milestone.dto';
import {MilestoneService} from '../repositories/milestones.service';


@Controller('milestones')
export class MilestonesController {
    constructor(private readonly milestoneService: MilestoneService) {}

    @Get()
    findAll() {
        return this.milestoneService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.milestoneService.findOneByIdOrFail(id);
    }

    @Post()
    create(@Body() createMilestoneDto: CreateMilestoneDto) {
        return this.milestoneService.create(createMilestoneDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto) {
        return this.milestoneService.update(id, updateMilestoneDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.milestoneService.remove(id);
    }
}
