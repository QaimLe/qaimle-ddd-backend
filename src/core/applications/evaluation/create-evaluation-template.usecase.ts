// src/core/application/evaluation/create-evaluation-template.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationTemplate } from '../../domain/evaluation-template/evaluation-template.entity';
import { EvaluationTemplateRepository } from '../../../infrastructure/persistence/evaluation-template.repository';

@Injectable()
export class CreateEvaluationTemplateUseCase {
    constructor(private readonly repo: EvaluationTemplateRepository) { }

    async execute(
        data: Omit<EvaluationTemplate, 'id' | 'createdAt' | 'deletedAt'>
    ): Promise<EvaluationTemplate> {
        return this.repo.create(data);
    }
}
