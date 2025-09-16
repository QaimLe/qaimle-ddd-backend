// infrastructure/persistence/user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // your Prisma client
import { User } from '../../core/domain/user/entities/user.entity';
import { type IUserRepository } from '../../core/domain/user/repositories/user.repository.interface';
import { Email } from '../../core/domain/user/value-objects/email.vo';
import { UserId } from '../../core/domain/user/value-objects/user-id.vo';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findByAuth0Id(auth0Id: string): Promise<User | null> {
        const u = await this.prisma.user.findUnique({ where: { auth0Id } });
        return u ? this.toDomain(u) : null;
    }

    async findById(id: UserId): Promise<User | null> {
        const u = await this.prisma.user.findUnique({ where: { id: id.getValue() } });
        return u ? this.toDomain(u) : null;
    }

    async create(user: User): Promise<User> {
        const roleNames = user.getRoles(); // ['admin', 'user', ...]

        // 1. Fetch existing roles
        const existingRoles = await this.prisma.role.findMany({
            where: { name: { in: roleNames } },
        });
        const existingRoleMap = Object.fromEntries(
            existingRoles.map((r) => [r.name, r.id]),
        );

        // 2. Create missing roles
        const missingRoles = roleNames.filter((name) => !existingRoleMap[name]);
        if (missingRoles.length) {
            await this.prisma.role.createMany({
                data: missingRoles.map((name) => ({ name })),
                skipDuplicates: true,
            });
            const allRoles = await this.prisma.role.findMany({
                where: { name: { in: roleNames } },
            });
            allRoles.forEach((r) => (existingRoleMap[r.name] = r.id));
        }

        // 3. Create the user with roles
        const u = await this.prisma.user.create({
            data: {
                auth0Id: user.getAuth0Id(),
                email: user.getEmail().getValue(),
                username: user.getUsername(),
                mobileVerified: false,
                roles: {
                    create: roleNames.map((roleName) => ({
                        role: { connect: { id: existingRoleMap[roleName] } },
                    })),
                },
            },
            include: { roles: { include: { role: true } } },
        });

        return this.toDomain(u);
    }

    async update(user: User): Promise<User> {
        const roleNames = user.getRoles();

        const existingRoles = await this.prisma.role.findMany({
            where: { name: { in: roleNames } },
        });
        const existingRoleMap = Object.fromEntries(
            existingRoles.map((r) => [r.name, r.id]),
        );

        const missingRoles = roleNames.filter((name) => !existingRoleMap[name]);
        if (missingRoles.length) {
            await this.prisma.role.createMany({
                data: missingRoles.map((name) => ({ name })),
                skipDuplicates: true,
            });
            const allRoles = await this.prisma.role.findMany({
                where: { name: { in: roleNames } },
            });
            allRoles.forEach((r) => (existingRoleMap[r.name] = r.id));
        }

        const u = await this.prisma.user.update({
            where: { auth0Id: user.getAuth0Id() },
            data: {
                email: user.getEmail().getValue(),
                username: user.getUsername(),
                mobileVerified: user['mobileVerified'],
                roles: {
                    deleteMany: {}, // remove old role assignments
                    create: roleNames.map((roleName) => ({
                        role: { connect: { id: existingRoleMap[roleName] } },
                    })),
                },
            },
            include: { roles: { include: { role: true } } },
        });

        return this.toDomain(u);
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map((u) => this.toDomain(u));
    }

    private toDomain(u: any): User {
        return new User(
            new UserId(u.id),
            u.auth0Id,
            new Email(u.email),
            u.username,
            u.phone,
            u.nickname,
            u.fullName,
            u.gender,
            u.ageGroup,
            u.nationality,
            u.employmentSector,
            u.profession,
            u.city,
            u.personalEmail,
            u.mobileVerified,
            u.loyaltyTier,
            u.subscriptionTier,
            u.profileStatus,
            u.roles,
            u.createdAt,
        );
    }
}
