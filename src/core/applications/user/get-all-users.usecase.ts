import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class GetAllUsersUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(): Promise<User[]> {
        return this.userRepo.findAll();
    }
}
