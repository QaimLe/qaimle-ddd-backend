// core/domain/user/repositories/user.repository.interface.ts
import { User } from '../entities/user.entity';
import { UserId } from '../value-objects/user-id.vo';
export interface IUserRepository {
    findByAuth0Id(auth0Id: string): Promise<User | null>;
    findById(id: UserId): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}
