import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { SyncUserUseCase } from '../../../core/applications/user/sync-user.usecase';
import { GetAllUsersUseCase } from '../../../core/applications/user/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../../core/applications/user/get-user-by-id.usecase';
import { GetUserByAuth0IdUseCase } from '../../../core/applications/user/get-user-by-id.usecase';
import { UpdateUserUseCase } from '../../../core/applications/user/update-user.usecase';
import { DeleteUserUseCase } from '../../../core/applications/user/delete-user.usecase';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';

@Module({
    controllers: [UsersController],
    providers: [
        SyncUserUseCase,
        GetAllUsersUseCase,
        GetUserByIdUseCase,
        GetUserByAuth0IdUseCase,
        UpdateUserUseCase,
        DeleteUserUseCase,
        UserRepository,
    ],
    exports: [UserRepository],
})
export class UsersModule { }
