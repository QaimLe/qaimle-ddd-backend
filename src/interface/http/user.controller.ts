import { Controller, Post, Get, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SyncUserUseCase } from '../../core/applications/user/sync-user.usecase';
import { GetAllUsersUseCase } from '../../core/applications/user/get-all-users.usecase';
import { GetUserByIdUseCase } from '../../core/applications/user/get-user-by-id.usecase';
import { UpdateUserUseCase } from '../../core/applications/user/update-user.usecase';
import { DeleteUserUseCase } from '../../core/applications/user/delete-user.usecase';

@Controller('users')
export class UsersController {
    constructor(
        private readonly syncUserUseCase: SyncUserUseCase,
        private readonly getAllUsersUseCase: GetAllUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('sync')
    async sync(@Body() body: { sub: string; email: string; name?: string }) {
        return await this.syncUserUseCase.execute(body);
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    async getAll() {
        return this.getAllUsersUseCase.execute();
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.getUserByIdUseCase.execute(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: any) {
        return this.updateUserUseCase.execute(id, updateData);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUserUseCase.execute(id);
        return { message: 'User deleted successfully' };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@Req() req: any) {
        return req.user;
    }
}
