// src/infrastructure/persistence/evaluation-template.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationTemplate } from '../../core/domain/evaluation-template/evaluation-template.entity';

@Injectable()
export class EvaluationTemplateRepository {
    constructor(private readonly prisma: PrismaService) { }

    private toDomain(raw: any): EvaluationTemplate {
        return new EvaluationTemplate(
            raw.id,
            raw.sectorId,
            raw.version,
            raw.effectiveFrom,
            raw.isActive,
            raw.createdAt,
            raw.deletedAt,
        );
    }

    // src/infrastructure/persistence/evaluation-template.repository.ts
    async create(
        data: Omit<EvaluationTemplate, 'id' | 'createdAt' | 'deletedAt'>
    ): Promise<EvaluationTemplate> {
        const record = await this.prisma.evaluationTemplate.create({ data });
        return this.toDomain(record);
    }


    async findAll(): Promise<EvaluationTemplate[]> {
        const items = await this.prisma.evaluationTemplate.findMany({
            where: { deletedAt: null },
        });
        return items.map(this.toDomain);
    }

    async findById(id: number): Promise<EvaluationTemplate | null> {
        const item = await this.prisma.evaluationTemplate.findUnique({
            where: { id },
        });
        return item ? this.toDomain(item) : null;
    }

    async update(id: number, data: Omit<EvaluationTemplate, 'id' | 'createdAt' | 'deletedAt'>): Promise<EvaluationTemplate> {
        const updated = await this.prisma.evaluationTemplate.update({
            where: { id },
            data,
        });
        return this.toDomain(updated);
    }

    async softDelete(id: number): Promise<void> {
        await this.prisma.evaluationTemplate.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
