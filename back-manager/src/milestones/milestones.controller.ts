import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './milestone.dto';

@Controller('milestones')
export class MilestonesController {
    constructor(private readonly milestonesService: MilestonesService) {}

    @Get()
    findAll() {
        return this.milestonesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.milestonesService.findOne(id);
    }

    @Post()
    create(@Body() createMilestoneDto: CreateMilestoneDto) {
        return this.milestonesService.create(createMilestoneDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateMilestoneDto: UpdateMilestoneDto) {
        return this.milestonesService.update(id, updateMilestoneDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.milestonesService.remove(id);
    }
}
