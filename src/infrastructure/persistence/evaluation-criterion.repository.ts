// src/infrastructure/persistence/evaluation-criterion.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationCriterion } from '../../core/domain/evaluation-criterion/entities/evaluation-criterion.entity';
import { CreateEvaluationCriterionDto } from '../../core/domain/evaluation/dto/create-evaluation-criterion.dto';
import { EvaluationCriterionId } from '../../core/domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo';
import { EvaluationCategoryId } from '../../core/domain/evaluation-category/value-objects/evaluation-category-id.vo';

@Injectable()
export class EvaluationCriterionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(criterion: EvaluationCriterion): Promise<EvaluationCriterion> {
        const record = await this.prisma.evaluationCriterion.create({
            data: {
                id: criterion.id.toString(),
                categoryId: criterion.categoryId.toNumber(),
                description: criterion.description,
                inputType: criterion.inputType,
                orderIndex: criterion.orderIndex,
                deletedAt: criterion.deletedAt,
            },
        });

        return EvaluationCriterion.create({
            id: EvaluationCriterionId.fromString(record.id.toString()),
            categoryId: EvaluationCategoryId.fromNumber(record.categoryId),
            description: record.description,
            inputType: record.inputType,
            orderIndex: record.orderIndex ?? undefined,
            deletedAt: record.deletedAt ?? null,
        });
    }


    async findByCategoryId(categoryId: number): Promise<EvaluationCriterion[]> {
        const records = await this.prisma.evaluationCriterion.findMany({ where: { categoryId } });
        return records.map(record =>
            EvaluationCriterion.create({
                id: EvaluationCriterionId.fromString(record.id.toString()),
                categoryId: EvaluationCategoryId.fromNumber(record.categoryId),
                description: record.description,
                inputType: record.inputType,
                orderIndex: record.orderIndex ?? undefined,
                deletedAt: record.deletedAt ?? null
            })
        );
    }
}
