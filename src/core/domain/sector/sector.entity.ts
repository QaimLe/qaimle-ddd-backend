// domain/entities/sector.entity.ts
import { v4 as uuid } from 'uuid';

export class Sector {
    private _id: string;
    private _name: string;
    private _description?: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(name: string, description?: string, id?: string) {
        this._id = id ?? uuid();
        this._name = name;
        this._description = description;
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
    get description(): string | undefined {
        return this._description;
    }
    get createdAt(): Date {
        return this._createdAt;
    }
    get updatedAt(): Date {
        return this._updatedAt;
    }

    // --- Business Logic ---
    updateName(newName: string) {
        if (!newName || newName.trim().length === 0) {
            throw new Error('Sector name cannot be empty');
        }
        this._name = newName;
        this._updatedAt = new Date();
    }

    updateDescription(desc: string) {
        this._description = desc;
        this._updatedAt = new Date();
    }
}
