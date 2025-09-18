// // src/infrastructure/persistence/auth0-profile.repository.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { Auth0Profile } from '../../core/domain/user/entities/auth0-profile.entity';

// @Injectable()
// export class Auth0ProfileRepository {
//     constructor(private readonly prisma: PrismaService) { }

//     async findByAuth0Id(auth0Id: string): Promise<Auth0Profile | null> {
//         const profile = await this.prisma.auth0Profile.findUnique({
//             where: { auth0Id },
//         });

//         if (!profile) return null;

//         return new Auth0Profile(
//             profile.auth0Id,
//             profile.provider,
//             profile.email,
//             profile.userId,
//             profile.id,
//             profile.createdAt,
//             profile.updatedAt,
//         );
//     }

//     async findByUserId(userId: string): Promise<Auth0Profile[]> {
//         const profiles = await this.prisma.auth0Profile.findMany({
//             where: { userId },
//         });

//         return profiles.map(
//             (profile) =>
//                 new Auth0Profile(
//                     profile.auth0Id,
//                     profile.provider,
//                     profile.email,
//                     profile.userId,
//                     profile.id,
//                     profile.createdAt,
//                     profile.updatedAt,
//                 ),
//         );
//     }

//     async create(auth0Profile: Auth0Profile): Promise<Auth0Profile> {
//         const created = await this.prisma.auth0Profile.create({
//             data: {
//                 auth0Id: auth0Profile.getAuth0Id(),
//                 provider: auth0Profile.getProvider(),
//                 email: auth0Profile.getEmail(),
//                 userId: auth0Profile.getUserId(),
//             },
//         });

//         return new Auth0Profile(
//             created.auth0Id,
//             created.provider,
//             created.email,
//             created.userId,
//             created.id,
//             created.createdAt,
//             created.updatedAt,
//         );
//     }

//     async delete(auth0Id: string): Promise<void> {
//         await this.prisma.auth0Profile.delete({
//             where: { auth0Id },
//         });
//     }

//     async findByEmail(email: string): Promise<Auth0Profile[]> {
//         const profiles = await this.prisma.auth0Profile.findMany({
//             where: { email },
//         });

//         return profiles.map(
//             (profile) =>
//                 new Auth0Profile(
//                     profile.auth0Id,
//                     profile.provider,
//                     profile.email,
//                     profile.userId,
//                     profile.id,
//                     profile.createdAt,
//                     profile.updatedAt,
//                 ),
//         );
//     }
// }