// domain/entities/service-provider.entity.ts
import { v4 as uuid } from 'uuid';
import { AddressVO } from './value-objects/address.vo';
import { ContactVO } from './value-objects/contact.vo';

export enum ProviderStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    PENDING_APPROVAL = 'PENDING_APPROVAL',
}

export class ServiceProvider {
    private _id: string;
    private _name: string;
    private _description?: string;
    private _sectorId: string;
    private _contact: ContactVO;
    private _address: AddressVO;
    private _status: ProviderStatus;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        name: string,
        sectorId: string,
        contact: ContactVO,
        address: AddressVO,
        description?: string,
        id?: string,
    ) {
        this._id = id ?? uuid();
        this._name = name;
        this._sectorId = sectorId;
        this._contact = contact;
        this._address = address;
        this._description = description;
        this._status = ProviderStatus.PENDING_APPROVAL;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    // --- Getters ---
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get sectorId(): string {
        return this._sectorId;
    }
    get contact(): ContactVO {
        return this._contact;
    }
    get address(): AddressVO {
        return this._address;
    }
    get status(): ProviderStatus {
        return this._status;
    }

    // --- Business Logic ---
    activate() {
        this._status = ProviderStatus.ACTIVE;
        this._updatedAt = new Date();
    }

    deactivate() {
        this._status = ProviderStatus.INACTIVE;
        this._updatedAt = new Date();
    }

    updateContact(contact: ContactVO) {
        this._contact = contact;
        this._updatedAt = new Date();
    }

    updateAddress(address: AddressVO) {
        this._address = address;
        this._updatedAt = new Date();
    }
}
