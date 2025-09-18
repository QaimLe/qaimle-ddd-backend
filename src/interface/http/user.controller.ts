// src/application/user/user.controller.ts
import { Controller, Post, Get , Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SyncUserUseCase } from '../../core/applications/user/sync-user.usecase';

@Controller('users')
export class UsersController {
    constructor(private readonly syncUserUseCase: SyncUserUseCase) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('sync')
    async sync(
        @Body() body: { sub: string; email: string; name?: string },
        @Req() req: any,
    ) {
        console.log('📦 UsersController.sync called');
        console.log('Headers:', req.headers);
        console.log('Body:', body);
        return await this.syncUserUseCase.execute(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('debug-token')
    debug(@Req() req: any) {
        console.log('📢 /users/debug-token headers:', req.headers);
        console.log('📢 /users/debug-token user:', req.user); // set by JwtStrategy
        return { message: 'Token received', user: req.user };
    }
}
