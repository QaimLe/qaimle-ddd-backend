import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { UserId } from 'src/core/domain/user/value-objects/user-id.vo';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(userId: string): Promise<void> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        await this.userRepo.delete(userId);
    }
}
