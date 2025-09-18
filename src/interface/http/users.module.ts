// src/core-application/user/user.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { SyncUserUseCase } from '../../core/applications/user/sync-user.usecase';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { NotificationModule } from '../notification/notification.module';
@Module({
    controllers: [UsersController],
    providers: [SyncUserUseCase, UserRepository],
    imports: [NotificationModule], // ✅ brings SendNotificationUseCase into scope

    exports: [UserRepository, SyncUserUseCase],
})
export class UsersModule { }
