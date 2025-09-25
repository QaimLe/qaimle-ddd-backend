// infrastructure/repositories/prisma-sector.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ISectorRepository } from '../../core/domain/sector/sector.repository';
import { Sector } from '../../core/domain/sector/sector.entity';

@Injectable()
export class PrismaSectorRepository implements ISectorRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(sector: Sector): Promise<Sector> {
        const record = await this.prisma.sector.create({
            data: {
                id: sector.id,
                name: sector.name,
                description: sector.description,
                createdAt: sector.createdAt,
                // updatedAt: sector.updatedAt,
            },
        });
        return new Sector(record.name, record.description ?? undefined, record.id);
    }



    async findById(id: string): Promise<Sector | null> {
        const record = await this.prisma.sector.findUnique({
            where: { id },
        });
        if (!record) return null;
        return new Sector(record.name, record.description ?? undefined, record.id);
    }

    async findAll(): Promise<Sector[]> {
        const records = await this.prisma.sector.findMany();
        return records.map(
            (r) => new Sector(r.name, r.description ?? undefined, r.id),
        );
    }

    async update(sector: Sector): Promise<Sector> {
        const record = await this.prisma.sector.update({
            where: { id: sector.id },
            data: {
                name: sector.name,
                description: sector.description,
                // updatedAt: new Date(),
            },
        });
        return new Sector(record.name, record.description ?? undefined, record.id);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.sector.delete({ where: { id } });
    }
}
