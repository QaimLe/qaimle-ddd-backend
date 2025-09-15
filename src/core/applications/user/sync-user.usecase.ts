// src/application/user/sync-user.usecase.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/user/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
import { Email } from '../../domain/user/value-objects/email.vo';

@Injectable()
export class SyncUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(auth0User: { sub: string; email: string; name?: string }) {
    const user = new User(
      new UserId(auth0User.sub),
      new Email(auth0User.email),
      '', // no password since Auth0 handles auth
      ['user'],
    );
    await this.userRepository.save(user);
    return user;
  }
}
