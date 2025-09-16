// src/core-application/user/user.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { SyncUserUseCase } from './sync-user.usecase';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';

@Module({
    controllers: [UsersController],
    providers: [SyncUserUseCase, UserRepository],
    exports: [UserRepository, SyncUserUseCase],
})
export class UsersModule { }
