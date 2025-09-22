// src/core/applications/evaluation/create-evaluation-criterion.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationCriterionRepository } from '../../../infrastructure/persistence/evaluation-criterion.repository';
import { EvaluationCriterion } from '../../domain/evaluation-criterion/entities/evaluation-criterion.entity';
import { EvaluationCriterionId } from '../../domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo';
import { EvaluationCategoryId } from '../../domain/evaluation-category/value-objects/evaluation-category-id.vo';
import { CreateEvaluationCriterionDto } from '../../domain/evaluation/dto/create-evaluation-criterion.dto';

@Injectable()
export class CreateEvaluationCriterionUseCase {
    constructor(private readonly repository: EvaluationCriterionRepository) { }

    async execute(dto: CreateEvaluationCriterionDto): Promise<EvaluationCriterion> {
        const criterion = EvaluationCriterion.create({
            id: EvaluationCriterionId.generate(),
            categoryId: EvaluationCategoryId.fromNumber(dto.categoryId),
            description: dto.description,
            inputType: dto.inputType,
            orderIndex: dto.orderIndex,
        });

        await this.repository.create(criterion);

        return criterion;
    }
}
