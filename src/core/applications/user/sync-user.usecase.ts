// src/core/applications/user/sync-user.usecase.ts
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
import { Email } from '../../domain/user/value-objects/email.vo';
// import { SendNotificationUseCase } from "../notification/send-notification.usecase";
// import { NotificationType } from "../../domain/notification/value-objects/notification-type.enum";
// import { NotificationChannel } from "../../domain/notification/value-objects/notification-channel.enum";

@Injectable()
export class SyncUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly sendNotificationUseCase: SendNotificationUseCase,

  ) { }

  async execute(auth0User: {
    sub: string;
    email: string;
    name?: string;
    roles?: string[];
    // Optional: Auth0 may include identities info after linking
    identities?: Array<{
      provider: string;
      user_id: string;
      connection: string;
      isSocial: boolean;
    }>;
  }) {
    console.log('🔄 Syncing user:', auth0User.sub, 'Email:', auth0User.email);

    // After account linking, auth0User.sub is ALWAYS the primary user ID
    // let user = await this.userRepository.findByAuth0Id(auth0User.sub);
    let user = await this.userRepository.findByEmail(auth0User.email);
    // Use Auth0 roles if provided, otherwise fallback to 'user'
    const roleNames = auth0User.roles?.length ? auth0User.roles : ['user'];

    if (!user) {
      console.log('➕ Creating new user for:', auth0User.sub);

      user = new User(
        new UserId(),                    // Generate internal UUID
        auth0User.sub,                   // Auth0 ID (primary ID after linking)
        new Email(auth0User.email),      // Email VO
        auth0User.name || auth0User.email, // username
        undefined, // phone
        undefined, // nickname
        undefined, // fullName
        undefined, // gender
        undefined, // ageGroup
        undefined, // nationality
        undefined, // employmentSector
        undefined, // profession
        undefined, // city
        undefined, // personalEmail
        false,     // mobileVerified
        undefined, // loyaltyTier
        undefined, // subscriptionTier
        'pending', // profileStatus
        roleNames, // roles
        new Date(), // createdAt
      );
      console.log ('user', user);

      await this.userRepository.create(user);
      console.log('✅ Created new user:', user.getId().getValue());
    } else {
      console.log('🔄 Updating existing user:', user.getId().getValue());

      // Sync email if changed (user might have updated it in Auth0)
      if (user.getEmail().getValue() !== auth0User.email) {
        console.log('📧 Updating email from', user.getEmail().getValue(), 'to', auth0User.email);
        user.changeEmail(new Email(auth0User.email));
      }

      // Sync username if provided and different
      if (auth0User.name && auth0User.name !== user.getUsername()) {
        console.log('👤 Updating username from', user.getUsername(), 'to', auth0User.name);
        user.changeUsername(auth0User.name);
      }

      // Sync roles: add new roles if not already present
      const currentRoles = user.getRoles();
      roleNames.forEach((role) => {
        if (!currentRoles.includes(role) && user) {
          console.log('🔒 Adding new role:', role);
          user.addRole(role);
        }
      });

      await this.userRepository.update(user);
      console.log('✅ Updated existing user');
    }

    // Optional: Log available login methods for debugging
    if (auth0User.identities && auth0User.identities.length > 1) {
      const providers = auth0User.identities.map(id => id.provider).join(', ');
      console.log(`🔗 User ${auth0User.sub} can login via: ${providers}`);
    }

    // // After user created or updated:
    // await this.sendNotificationUseCase.execute({
    //   userId: user.getId().getValue(),
    //   email: user.getEmail().getValue(),
    //   type: NotificationType.LOGIN,
    //   channel: NotificationChannel.EMAIL,
    //   message: `Welcome back ${user.getUsername()}, you have successfully logged in!`
    // });
    return user;
  }

}