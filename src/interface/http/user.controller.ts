// interface/http/user.controller.ts
import { Controller, Get, Req, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserService } from '../../core/domain/user/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req) {
    return this.userService.findOrCreate(req.user);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Patch(':auth0Id/roles')
  async updateRoles(@Req() req, @Body() body: { roles: string[] }) {
    return this.userService.updateRoles(req.params.auth0Id, body.roles);
  }
}
