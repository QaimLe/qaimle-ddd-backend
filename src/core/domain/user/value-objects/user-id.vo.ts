import { randomUUID } from 'crypto';

export class UserId {
  private readonly value: string;

  constructor(id?: string) {
    if (id && !this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    this.value = id ?? randomUUID();
  }

  getValue(): string {
    return this.value;
  }

  private isValidUUID(id: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
      id,
    );
  }
}
