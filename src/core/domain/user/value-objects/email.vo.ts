export class Email {
  private readonly value: string;

  constructor(email: string) {
    email = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error('Invalid email format');
    }
    this.value = email.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }
}
