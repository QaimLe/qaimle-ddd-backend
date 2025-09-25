// src/interface/http/evaluation-score/evaluation-score.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PublishMonthlyScoresUseCase } from '../../../core/applications/evaluation-score/publish-monthly-scores.usecase';

@Controller('evaluation-scores')
export class EvaluationScoreController {
    constructor(private readonly publishScores: PublishMonthlyScoresUseCase) { }

    @Post('publish')
    async publishMonthly(@Body() body: { month: string; sectorId: string }) {
        const result = await this.publishScores.execute(new Date(body.month), body.sectorId);
        return { success: true, publishedCount: result.length };
    }

    @Get(':sectorId/:month')
    async getBySectorAndMonth(@Param('sectorId') sectorId: string, @Param('month') month: string) {
        return this.publishScores.repository.findByMonthAndSector(new Date(month), sectorId);
    }
}
