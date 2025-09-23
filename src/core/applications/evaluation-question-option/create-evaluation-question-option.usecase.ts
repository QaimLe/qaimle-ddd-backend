import { Injectable } from '@nestjs/common';
import { EvaluationQuestionOptionRepository } from '../../../infrastructure/persistence/evaluation-question-option.repository';
import { EvaluationQuestionOption } from '../../domain/evaluation-question-option/entities/evaluation-question-option.entity';
import { EvaluationQuestionOptionId } from '../../domain/evaluation-question-option/value-objects/evaluation-question-option-id.vo';
import { EvaluationQuestionId } from '../../domain/evaluation-question/value-objects/evaluation-question-id.vo';

@Injectable()
export class CreateEvaluationQuestionOptionUseCase {
    constructor(private readonly repo: EvaluationQuestionOptionRepository) { }

    async execute(command: {
        questionId: string;
        text: string;
        value: number;        // 👈 should be number not string
        orderIndex?: number;
    }) {
        const option = EvaluationQuestionOption.create(
            EvaluationQuestionId.fromString(command.questionId),
            command.text,
            command.value,
            command.orderIndex,
        );

        await this.repo.create(option);
        return option;
    }
}
