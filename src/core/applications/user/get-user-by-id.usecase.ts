import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepo.findByAuth0Id(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
