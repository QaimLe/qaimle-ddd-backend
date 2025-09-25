// infrastructure/persistence/prisma-service-provider.repository.ts
import { PrismaClient } from '@prisma/client';

export class PrismaServiceProviderRepository implements PrismaServiceProviderRepository {
    constructor(private prisma: PrismaClient) { }

    async findById(id: number) {
        return await this.prisma.serviceProvider.findUnique({ where: { id } });
    }

    async findAllBySector(sectorId: string) {
        return await this.prisma.serviceProvider.findMany({ where: { sectorId } });
    }

    async save(provider: any) {
        return await this.prisma.serviceProvider.upsert({
            where: { id: provider.id },
            update: { ...provider },
            create: { ...provider },
        });
    }

    async delete(id: number) {
        await this.prisma.serviceProvider.delete({ where: { id } });
    }
}
