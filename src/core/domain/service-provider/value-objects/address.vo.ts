// domain/value-objects/address.vo.ts
export class AddressVO {
    constructor(
        public readonly country: string,
        public readonly city: string,
        public readonly street: string,
        public readonly postalCode: string,
    ) {
        if (!country || !city) {
            throw new Error('Address must include at least country and city');
        }
    }

    static create(country: string, city: string, street: string, postalCode: string) {
        return new AddressVO(country, city, street, postalCode);
    }
}
