import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { take } from 'rxjs';

@Injectable()
export class GetAllUsersUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute( take: number, cursor?: string): Promise<User[]> {
        return this.userRepo.findActiveUsers(take, cursor);
    } 
}
