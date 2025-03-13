import { Controller, Get } from '@nestjs/common';
import {RoleService} from '../repositories/role.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly roleService: RoleService) {}

    @Get()
    findAll(): Promise<any> {
        return this.roleService.findAll();
    }
}
