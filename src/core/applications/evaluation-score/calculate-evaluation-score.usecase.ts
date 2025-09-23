import { Injectable, Provider } from '@nestjs/common';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';
import { EvaluationAnswerRepository } from '../../../infrastructure/persistence/evaluation-answer.repository';
import { EvaluationQuestionRepository } from '../../../infrastructure/persistence/evaluation-question.repository';
import { EvaluationScoreRepository } from '../../../infrastructure/persistence/evaluation-score.repository';
import { EvaluationScore } from '../../domain/evaluation-score/entities/evaluation-score.entity';
import { EvaluationScoreId } from '../../domain/evaluation-score/value-objects/evaluation-score-id.vo';
import { ProviderRepository } from '../../../infrastructure/persistence/provider.repository';
@Injectable()
export class CalculateEvaluationScoreUseCase {
    constructor(
        private readonly evaluationRepo: EvaluationRepository,
        private readonly answerRepo: EvaluationAnswerRepository,
        private readonly questionRepo: EvaluationQuestionRepository,
        private readonly scoreRepo: EvaluationScoreRepository,
        private readonly providerRepo: ProviderRepository
    ) { }

    async execute(evaluationId: string): Promise<EvaluationScore> {
        // 1️⃣ Load evaluation
        const evaluation = await this.evaluationRepo.findById(evaluationId);
        if (!evaluation) throw new Error('Evaluation not found');

        // 2️⃣ Load all answers for this evaluation
        const answers = await this.answerRepo.findByEvaluationId(evaluationId);

        let totalScore = 0;
        let totalWeight = 0;

        // 3️⃣ For each answer, fetch the question to get its weight
        for (const answer of answers) {
            if (!answer.score || !answer.questionId) continue;

            const question = await this.questionRepo.findById(answer.questionId.toString());
            if (!question) continue;

            const weight = question.weight || 1;
            totalScore += answer.score * weight;
            totalWeight += weight;
        }

        const normalizedScore = totalWeight ? (totalScore / totalWeight) * 100 : 0;

        // 3️⃣ Fetch provider to get the sectorId
        const provider = await this.providerRepo.findById(evaluation.providerId);
        if (!provider) throw new Error('Provider not found');

        // 4️⃣ Create EvaluationScore entity using provider.sectorId
        const scoreEntity = EvaluationScore.create({
            id: EvaluationScoreId.generate(),
            providerId: evaluation.providerId,
            sectorId: provider.sectorId,
            month: evaluation.submittedAt,
            scorePercentage: normalizedScore,
        });

        // 5️⃣ Save
        await this.scoreRepo.save(scoreEntity);

        return scoreEntity;
    }
}
