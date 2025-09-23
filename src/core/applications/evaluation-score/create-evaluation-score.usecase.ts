// src/core/applications/evaluation-score/create-evaluation-score.usecase.ts
import { Injectable } from '@nestjs/common';
import { EvaluationScoreRepository } from '../../../infrastructure/persistence/evaluation-score.repository';
import { EvaluationScore } from '../../domain/evaluation-score/entities/evaluation-score.entity';
import { EvaluationScoreId } from '../../domain/evaluation-score/value-objects/evaluation-score-id.vo';

@Injectable()
export class CreateEvaluationScoreUseCase {
    constructor(private readonly repo: EvaluationScoreRepository) { }

    async execute(command: {
        providerId: number;
        sectorId: number;
        month: Date;
        scorePercentage: number;
        rankingPosition?: number;
        totalProvidersInSector?: number;
        publishedAt?: Date;
    }): Promise<EvaluationScore> {
        const score = EvaluationScore.create({
            id: EvaluationScoreId.generate(), // domain VO
            providerId: command.providerId,
            sectorId: command.sectorId,
            month: command.month,
            scorePercentage: command.scorePercentage,
            rankingPosition: command.rankingPosition,
            totalProvidersInSector: command.totalProvidersInSector,
            publishedAt: command.publishedAt,
        });

        return this.repo.save(score);
    }
}
