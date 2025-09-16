// src/core/domain/auth/auth.service.ts
import { Auth } from './auth.entity';
import { Tokens } from './tokens.vo';
import { IAuthRepository } from './auth.repository';

export class AuthService {
  constructor(private readonly authRepo: IAuthRepository) {}

  async loginWithAuth0(externalId: string, email: string, roles: string[]): Promise<Auth> {
    let user = await this.authRepo.findByExternalId(externalId);

    if (!user) {
      // create new internal Auth entity
      user = new Auth(
        crypto.randomUUID(),
        externalId,
        email,
        roles,
      );

      await this.authRepo.save(user);
    }

    return user;
  }

  async attachTokens(auth: Auth, tokens: Tokens): Promise<{ auth: Auth; tokens: Tokens }> {
    // in case you need to persist refresh tokens later
    return { auth, tokens };
  }
}
