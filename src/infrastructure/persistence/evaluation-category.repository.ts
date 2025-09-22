import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationCategory } from '../../core/domain/evaluation-category/evaluation-category.entity';
import { CreateEvaluationCategoryDto } from '../../core/domain/evaluation/dto/create-evaluation-category.dto';
import { EvaluationCategoryId } from '../../core/domain/evaluation-category/value-objects/evaluation-category-id.vo';
@Injectable()
export class EvaluationCategoryRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateEvaluationCategoryDto): Promise<EvaluationCategory> {
        const created = await this.prisma.evaluationCategory.create({ data });
        return new EvaluationCategory(
            EvaluationCategoryId.fromNumber(created.id),
            created.templateId,
            created.title,              // fixed: title instead of name
            created.weight ?? 0,
            created.orderIndex ?? 0,
            created.deletedAt ?? null,  // optional
        );
    }

    async findAll(): Promise<EvaluationCategory[]> {
        const cats = await this.prisma.evaluationCategory.findMany();
        return cats.map(c =>
            new EvaluationCategory(
                EvaluationCategoryId.fromNumber(c.id),
                c.templateId,
                c.title,                 // fixed
                c.weight ?? 0,
                c.orderIndex ?? 0,
                c.deletedAt ?? null,
            )
        );
    }

    async findById(id: number): Promise<EvaluationCategory | null> {
        const cat = await this.prisma.evaluationCategory.findUnique({ where: { id } });
        return cat
            ? new EvaluationCategory(EvaluationCategoryId.fromNumber(cat.id), cat.templateId, cat.title, cat.weight ?? 0, cat.orderIndex ?? 0, cat.deletedAt ?? null)
            : null;
    }

    async update(id: number, data: Partial<CreateEvaluationCategoryDto>): Promise<EvaluationCategory> {
        const updated = await this.prisma.evaluationCategory.update({ where: { id }, data });
        return new EvaluationCategory(EvaluationCategoryId.fromNumber(updated.id), updated.templateId, updated.title, updated.weight ?? 0, updated.orderIndex ?? 0, updated.deletedAt ?? null);
    }

    async softDelete(id: number): Promise<void> {
        await this.prisma.evaluationCategory.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
