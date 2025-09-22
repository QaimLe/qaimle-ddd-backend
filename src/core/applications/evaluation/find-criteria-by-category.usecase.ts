// src/core/applications/evaluation/find-criteria-by-category.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationCriterionRepository } from '../../../infrastructure/persistence/evaluation-criterion.repository';
import { EvaluationCriterion } from '../../domain/evaluation-criterion/entities/evaluation-criterion.entity';

@Injectable()
export class FindCriteriaByCategoryUseCase {
    constructor(private readonly repository: EvaluationCriterionRepository) { }

    async execute(categoryId: number): Promise<EvaluationCriterion[]> {
        return this.repository.findByCategoryId(categoryId);
    }
}
