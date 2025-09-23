import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';
import { EvaluationAnswer } from '../../domain/evaluation-answer/entities/evaluation-answer.entity';
import { EvaluationQuestionOptionRepository } from '../../../infrastructure/persistence/evaluation-question-option.repository';
import { EvaluationQuestionRepository } from '../../../infrastructure/persistence/evaluation-question.repository';

@Injectable()
export class CalculateScoreUseCase {
    constructor(
        private readonly evaluationRepo: EvaluationRepository,
        private readonly questionRepo: EvaluationQuestionRepository,
        private readonly optionRepo: EvaluationQuestionOptionRepository,
    ) { }

    /**
     * Calculate the overall evaluation score as a percentage.
     * Formula:
     *  - For each criterion:
     *      weightedScore = sum(answer.value * question.weight)
     *      maxScore = sum(maxOptionValue * question.weight)
     *      criterionPercentage = (weightedScore / maxScore) * 100
     *  - Overall evaluation percentage = sum(criterionPercentage) / numberOfCriteria
     */
    async execute(evaluationId: string): Promise<number> {
        // 1️⃣ Load evaluation and its answers
        const evaluation = await this.evaluationRepo.findByIdWithAnswers(evaluationId);
        if (!evaluation) throw new Error('Evaluation not found');

        if (!evaluation.answers.length) return 0;

        // 2️⃣ Group answers by criterion
        const answersByCriterion: Record<string, EvaluationAnswer[]> = {};
        for (const answer of evaluation.answers) {
            if (!answer.questionId) continue;
            if (!answer.question) continue;

            const criterionId = answer.question.criterionId;
            if (!answersByCriterion[criterionId]) answersByCriterion[criterionId] = [];
            answersByCriterion[criterionId].push(answer);
        }

        const criterionPercentages: number[] = [];

        // 3️⃣ Calculate percentage per criterion
        for (const [criterionId, answers] of Object.entries(answersByCriterion)) {
            let totalWeightedScore = 0;
            let totalPossibleScore = 0;

            for (const answer of answers) {
                const question = answer.question!;
                const weight = question.weight ?? 1;

                // 👇 take the actual score from the answer
                const value = answer.score ?? 0;

                totalWeightedScore += value * weight;

                // 👇 assume max score for ratings is 5 (or configurable per inputType)
                const maxValue = question.inputType === 'yes_no' ? 1 : 5;
                totalPossibleScore += maxValue * weight;
            }

            if (totalPossibleScore > 0) {
                criterionPercentages.push((totalWeightedScore / totalPossibleScore) * 100);
            }
        }

        // 4️⃣ Normalize across criteria
        const overallPercentage =
            criterionPercentages.reduce((sum, p) => sum + p, 0) / criterionPercentages.length;

        // 5️⃣ Update evaluation score in DB
        await this.evaluationRepo.update(evaluationId, { scorePercentage: overallPercentage });

        return overallPercentage;
    }

}
