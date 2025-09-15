// src/core/domain/user/entities/user.entity.ts
import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private passwordHash: string | null = null,
    private roles: string[] = ['user'], // default role
  ) {}

  getId(): UserId {
    return this.id;
  }

  getEmail(): Email {
    return this.email;
  }

  getRoles(): string[] {
    return this.roles;
  }

  changeEmail(newEmail: Email) {
    this.email = newEmail;
  }

  checkPassword(hash: string): boolean {
    if (!this.passwordHash) return false;
    return this.passwordHash === hash;
  }

  addRole(role: string) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role: string) {
    this.roles = this.roles.filter((r) => r !== role);
  }
}
