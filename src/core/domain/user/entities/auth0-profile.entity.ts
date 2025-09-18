// src/core/domain/user/entities/auth0-profile.entity.ts
export class Auth0Profile {
    constructor(
        private readonly auth0Id: string,
        private readonly provider: string,
        private readonly email: string,
        private readonly userId: string,
        private readonly id?: string,
        private readonly createdAt?: Date,
        private readonly updatedAt?: Date,
    ) { }

    getId(): string | undefined {
        return this.id;
    }

    getAuth0Id(): string {
        return this.auth0Id;
    }

    getProvider(): string {
        return this.provider;
    }

    getEmail(): string {
        return this.email;
    }

    getUserId(): string {
        return this.userId;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUpdatedAt(): Date | undefined {
        return this.updatedAt;
    }
}