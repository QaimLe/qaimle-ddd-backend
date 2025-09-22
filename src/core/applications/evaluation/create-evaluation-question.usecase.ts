// src/core/applications/evaluation/create-evaluation-question.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationQuestionRepository } from '../../../infrastructure/persistence/evaluation-question.repository';
import { EvaluationQuestion } from '../../domain/evaluation-question/entities/evaluation-question.entity';
import { EvaluationQuestionId } from '../../domain/evaluation-question/value-objects/evaluation-question-id.vo';
import { EvaluationCriterionId } from '../../domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo';
import { CreateEvaluationQuestionDto } from '../../domain/evaluation/dto/create-evaluation-question.dto';

@Injectable()
export class CreateEvaluationQuestionUseCase {
    constructor(private readonly repository: EvaluationQuestionRepository) { }

    async execute(dto: CreateEvaluationQuestionDto): Promise<EvaluationQuestion> {
        const question = EvaluationQuestion.create({
            id: EvaluationQuestionId.generate(),
            criterionId: EvaluationCriterionId.fromString(dto.criterionId.toString()),
            text: dto.text,
            weight: dto.weight,
            inputType: dto.inputType,
            orderIndex: dto.orderIndex
        });

        await this.repository.create({
            criterionId: dto.criterionId,
            text: dto.text,
            weight: dto.weight,
            inputType: dto.inputType,
            orderIndex: dto.orderIndex
        });

        return question;
    }
}
