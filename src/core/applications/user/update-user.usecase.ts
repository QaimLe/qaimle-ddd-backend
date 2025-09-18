import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/persistence/user.repository';
import { User } from '../../domain/user/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto'; // define DTO above

@Injectable()
export class UpdateUserUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(auth0Id: string, updateData: UpdateUserDto): Promise<User> {
        const user = await this.userRepo.findByAuth0Id(auth0Id);
        if (!user) throw new NotFoundException('User not found');

        if (updateData.fullName) user.updateFullName(updateData.fullName);
        if (updateData.phone) user.updatePhone(updateData.phone);
        if (updateData.nickname) user.updateNickname(updateData.nickname);
        if (updateData.city) user.updateCity(updateData.city);
        if (updateData.gender) user.updateGender(updateData.gender);
        if (updateData.ageGroup) user.updateAgeGroup(updateData.ageGroup);
        if (updateData.nationality) user.updateNationality(updateData.nationality);
        if (updateData.employmentSector) user.updateEmploymentSector(updateData.employmentSector);
        if (updateData.profession) user.updateProfession(updateData.profession);
        if (updateData.personalEmail) user.updatePersonalEmail(updateData.personalEmail);
        if (updateData.loyaltyTier) user.setLoyaltyTier(updateData.loyaltyTier);
        if (updateData.subscriptionTier) user.setSubscriptionTier(updateData.subscriptionTier);
        if (updateData.profileStatus) user.updateProfileStatus(updateData.profileStatus);

        if (updateData.roles) {
            updateData.roles.forEach((r) => user.addRole(r));
        }

        return this.userRepo.update(user);
    }
}
