// src/core/applications/evaluation/create-evaluation-category.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationCategoryRepository } from '../../../infrastructure/persistence/evaluation-category.repository';
import { EvaluationCategory } from '../../domain/evaluation-category/evaluation-category.entity';
import { CreateEvaluationCategoryDto } from '../../domain/evaluation/dto/create-evaluation-category.dto';

@Injectable()
export class CreateEvaluationCategoryUseCase {
    constructor(private readonly repo: EvaluationCategoryRepository) { }

    async execute(data: CreateEvaluationCategoryDto): Promise<EvaluationCategory> {
        return this.repo.create(data);
    }
}
