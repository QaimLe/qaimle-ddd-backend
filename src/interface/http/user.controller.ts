import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SyncUserUseCase } from '../../core/applications/user/sync-user.usecase';
import { GetAllUsersUseCase } from '../../core/applications/user/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../core/applications/user/get-user-by-id.usecase';
import { UpdateUserUseCase } from '../../core/applications/user/update-user.usecase';
import { DeleteUserUseCase } from '../../core/applications/user/delete-user.usecase';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { PermissionsGuard } from '../../auth/permissions.guard';
import { Permissions } from '../../auth/permissions.decorator';
import { UserId } from 'src/core/domain/user/value-objects/user-id.vo';


@UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard) // apply globally to all routes in this controller if you want
@Controller('users')
export class UsersController {
    constructor(
        private readonly syncUserUseCase: SyncUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    @Post('sync')
    async sync(@Body() body: { sub: string; email: string; name?: string }) {
        return await this.syncUserUseCase.execute(body);
    }

    @Roles('Super Admin', 'Platform Admin') // must have one of these roles
    @Permissions('read:users') // must also have this permission
    @Get()
    async getAll() {
        return this.getAllUsersUseCase.execute( 10, undefined);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.getUserByIdUseCase.execute(id);
    }

    @Roles('Super Admin', 'Platform Admin') // must have one of these roles
    @Permissions('update:users') // must also have this permission
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: any) {
        return this.updateUserUseCase.execute(id, updateData);
    }

    @Roles('Super Admin', 'Platform Admin') // must have one of these roles
    @Permissions('delete:users') // must also have this permission
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id);
        return { message: 'User deleted successfully' };
    }

    @Get('me')
    me(@Req() req: any) {
        return req.user;
    }
}
