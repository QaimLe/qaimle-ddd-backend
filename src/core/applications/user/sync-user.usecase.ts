// src/core/applications/user/sync-user.usecase.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
import { Email } from '../../domain/user/value-objects/email.vo';

@Injectable()
export class SyncUserUseCase {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(auth0User: { sub: string; email: string; name?: string; roles?: string[] }) {
    let user = await this.userRepository.findByAuth0Id(auth0User.sub);

    // ✅ Use Auth0 roles if provided, otherwise fallback to 'user'
    const roleNames = auth0User.roles?.length ? auth0User.roles : ['user'];

    if (!user) {
      user = new User(
        new UserId(),                  // Generate internal UUID
        auth0User.sub,                 // Auth0 ID
        new Email(auth0User.email),    // Email VO
        auth0User.name || auth0User.email, // username
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        false,
        undefined,
        undefined,
        'pending',
        roleNames,                     // ✅ pass roles
        new Date(),
      );

      await this.userRepository.create(user);
    } else {
      // ✅ Sync email if changed
      if (user.getEmail().getValue() !== auth0User.email) {
        user.changeEmail(new Email(auth0User.email));
      }

      // ✅ Sync roles: add new roles if not already present
      roleNames.forEach((role) => user?.addRole(role));

      await this.userRepository.update(user);
    }

    return user;
  }
}
