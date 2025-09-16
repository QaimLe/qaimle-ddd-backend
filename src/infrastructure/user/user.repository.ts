// // src/infrastructure/user/user.repository.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { type IUserRepository } from '../../core/domain/user/repositories/user.repository.interface';
// import { User } from '../../core/domain/user/entities/user.entity';
// import { Email } from '../../core/domain/user/value-objects/email.vo';
// import { UserId } from '../../core/domain/user/value-objects/user-id.vo';

// @Injectable()
// export class UserRepository implements IUserRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async save(user: User): Promise<void> {
//     // Fetch role IDs from Prisma
//     const roleRecords = await Promise.all(
//       user.getRoles().map(async (roleName) => {
//         return this.prisma.role.findUniqueOrThrow({
//           where: { name: roleName },
//         });
//       }),
//     );

//     await this.prisma.user.upsert({
//       where: { auth0Id: user.getId().getValue() },
//       update: {
//         email: user.getEmail().getValue(),
//         roles: {
//           deleteMany: {}, // remove old roles
//           create: roleRecords.map((r) => ({ roleId: r.id })),
//         },
//       },
//       create: {
//         id: user.getId().getValue(),
//         auth0Id: user.getId().getValue(),
//         email: user.getEmail().getValue(),
//         username: user.getEmail().getValue().split('@')[0], // for example
//         roles: {
//           create: roleRecords.map((r) => ({ roleId: r.id })),
//         },
//       },
//     });
//   }

//   async findById(id: UserId): Promise<User | null> {
//     const user = await this.prisma.user.findUnique({
//       where: { id: id.getValue() },
//       include: { roles: { include: { role: true } } }, // include nested role
//     });

//     if (!user) return null;

//     const roleNames = user.roles.map((ur) => ur.role.name);

//     return new User(new UserId(user.id), new Email(user.email), '', roleNames);
//   }

//   async findByEmail(email: Email): Promise<User | null> {
//     const user = await this.prisma.user.findUnique({
//       where: { email: email.getValue() },
//       include: { roles: { include: { role: true } } }, // include nested role
//     });

//     if (!user) return null;

//     const roleNames = user.roles.map((ur) => ur.role.name);

//     return new User(new UserId(user.id), new Email(user.email), '', roleNames);
//   }

//   async delete(user: User): Promise<void> {
//     await this.prisma.user.delete({
//       where: { id: user.getId().getValue() },
//     });
//   }
// }
