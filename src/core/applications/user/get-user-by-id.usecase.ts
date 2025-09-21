import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UserId } from '../../domain/user/value-objects/user-id.vo';
@Injectable()
export class GetUserByIdUseCase {
    constructor(private readonly userRepo: UserRepository) { }
    async execute(id: string): Promise<User> {
        // const userId = new UserId(id);  // wrap into VO
        const user = await this.userRepo.findById(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}


export class GetUserByAuth0IdUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(id: string): Promise<User> {
        const user = await this.userRepo.findByAuth0Id(id);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}