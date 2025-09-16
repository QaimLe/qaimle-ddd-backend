// application/user/services/user.service.ts
import { Injectable } from '@nestjs/common';
import { type IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';
import { UserId } from '..//value-objects/user-id.vo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  async findOrCreate(auth0Payload: any): Promise<User> {
    let user = await this.userRepo.findByAuth0Id(auth0Payload.sub);

    if (!user) {
      user = new User(
        new UserId(auth0Payload.sub),
        auth0Payload.sub,
        new Email(auth0Payload.email),
        auth0Payload.nickname || auth0Payload.email.split('@')[0],
        undefined, // phone
        auth0Payload.nickname,
        auth0Payload.name,
      );
      await this.userRepo.create(user);
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async updateRoles(auth0Id: string, roles: string[]): Promise<User> {
    const user = await this.userRepo.findByAuth0Id(auth0Id);
    if (!user) throw new Error('User not found');
    roles.forEach((r) => user.addRole(r));
    return this.userRepo.update(user);
  }
}
