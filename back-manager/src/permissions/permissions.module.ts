import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { APP_GUARD } from '@nestjs/core';
import {JwtModule} from '@nestjs/jwt';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
    imports: [JwtModule],
})
export class PermissionsModule {}
