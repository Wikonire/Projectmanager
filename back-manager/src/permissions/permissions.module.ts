import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        },
    ],
})
export class PermissionsModule {}
