import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(auth0Id: string): Promise<void> {
        const user = await this.userRepo.findByAuth0Id(auth0Id);
        if (!user) throw new NotFoundException('User not found');

        await this.userRepo.delete(auth0Id);
    }
}
