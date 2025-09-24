// src/interface/http/evaluation-score/evaluation-score.module.ts
import { Module } from '@nestjs/common';
import { EvaluationScoreController } from './evaluation-score.controller';
import { EvaluationScoreRepository } from '../../../infrastructure/persistence/evaluation-score.repository';
import { PublishMonthlyScoresUseCase } from '../../../core/applications/evaluation-score/publish-monthly-scores.usecase';

@Module({
    controllers: [EvaluationScoreController],
    providers: [
        EvaluationScoreRepository,
        PublishMonthlyScoresUseCase,
    ],
    exports: [PublishMonthlyScoresUseCase],
})
export class EvaluationScoreModule { }
