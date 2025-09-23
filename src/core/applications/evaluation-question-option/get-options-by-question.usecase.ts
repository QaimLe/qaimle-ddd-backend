import { Injectable } from '@nestjs/common';
import { EvaluationQuestionOptionRepository } from '../../../infrastructure/persistence/evaluation-question-option.repository';
import { EvaluationQuestionOption } from '../../domain/evaluation-question-option/entities/evaluation-question-option.entity';

@Injectable()
export class GetOptionsByQuestionUseCase {
    constructor(private readonly repo: EvaluationQuestionOptionRepository) { }

    async execute(questionId: string): Promise<EvaluationQuestionOption[]> {
        return this.repo.findByQuestionId(questionId);
    }
}
