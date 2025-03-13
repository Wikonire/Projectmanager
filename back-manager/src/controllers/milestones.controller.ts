import {Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe} from '@nestjs/common';

import {CreateMilestoneDto, UpdateMilestoneDto} from '../dtos/milestone.dto';
import {MilestoneService} from '../repositories/milestones.service';


@Controller('milestones')
@UsePipes(new ValidationPipe({ transform: true }))
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
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createMilestoneDto: CreateMilestoneDto) {
        return this.milestoneService.create(createMilestoneDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto) {
        return this.milestoneService.update(id, updateMilestoneDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.milestoneService.remove(id);
    }
}
