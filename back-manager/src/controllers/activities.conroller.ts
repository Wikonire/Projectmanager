import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {ActivitiesService} from '../repositories/activities.service';
import {CreateActivityDto, UpdateActivityDto} from '../dtos/activity.dto';


@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get()
    findAll() {
        return this.activitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activitiesService.findOne(id);
    }

    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activitiesService.update(id, updateActivityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activitiesService.remove(id);
    }
}
