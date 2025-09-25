// domain/value-objects/contact.vo.ts
export class ContactVO {
    constructor(
        public readonly email: string,
        public readonly phone: string,
    ) {
        if (!email.includes('@')) {
            throw new Error('Invalid email address');
        }
        if (!phone.match(/^\+?\d+$/)) {
            throw new Error('Invalid phone number');
        }
    }

    static create(email: string, phone: string): ContactVO {
        return new ContactVO(email, phone);
    }
}
