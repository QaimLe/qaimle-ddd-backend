// src/core/applications/evaluation-answer/create-evaluation-answer.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationAnswerRepository } from '../../../infrastructure/persistence/evaluation-answer.repository';
import { EvaluationAnswer } from '../../domain/evaluation-answer/entities/evaluation-answer.entity';
import { EvaluationAnswerId } from '../../domain/evaluation-answer/value-objects/evaluation-answer-id.vo';
import { EvaluationId } from '../../domain/evaluation/value-objects/evaluation-id.vo';
// import { UserId } from '../../domain/user/value-objects/user-id.vo';
// import { QuestionId } from '../../domain/evaluation-question/value-objects/question-id.vo';
import { EvaluationQuestionId } from 'src/core/domain/evaluation-question/value-objects/evaluation-question-id.vo';
type CreateEvaluationAnswerInput = {
    evaluationId: string;  // string UUID
    questionId: string;   // corresponds to criterion
    score?: number;
};


@Injectable()
export class CreateEvaluationAnswerUseCase {
    constructor(
        private readonly evaluationAnswerRepository: EvaluationAnswerRepository,
    ) { }

    async execute(input: CreateEvaluationAnswerInput): Promise<EvaluationAnswer> {
        // ✅ Create domain object
        const evaluationAnswer = EvaluationAnswer.create({
            id: await EvaluationAnswerId.generate(),
            evaluationId: EvaluationId.fromString(input.evaluationId),
            questionId: EvaluationQuestionId.fromString(input.questionId),  // input.questionId, // number
            score: input.score ?? null,
            createdAt: new Date(),
        });

        // ✅ Persist entity
        await this.evaluationAnswerRepository.save(evaluationAnswer);

        return evaluationAnswer;
    }

}
