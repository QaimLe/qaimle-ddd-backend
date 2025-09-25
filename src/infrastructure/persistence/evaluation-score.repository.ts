// src/infrastructure/persistence/evaluation-score.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationScore } from '../../core/domain/evaluation-score/entities/evaluation-score.entity';
import { EvaluationScoreId } from '../../core/domain/evaluation-score/value-objects/evaluation-score-id.vo';

@Injectable()
export class EvaluationScoreRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(score: EvaluationScore): Promise<EvaluationScore> {
        const record = await this.prisma.evaluationScore.create({
            data: {
                providerId: score.providerId,
                sectorId: score.sectorId,
                month: score.month,
                scorePercentage: score.scorePercentage,
                rankingPosition: score.rankingPosition,
                totalProvidersInSector: score.totalProvidersInSector,
                publishedAt: score.publishedAt,
            },
        });

        return EvaluationScore.create({
            id: EvaluationScoreId.fromNumber(record.id),
            providerId: record.providerId,
            sectorId: record.sectorId,
            month: record.month,
            scorePercentage: record.scorePercentage,
            rankingPosition: record.rankingPosition ?? undefined,
            totalProvidersInSector: record.totalProvidersInSector ?? undefined,
            publishedAt: record.publishedAt ?? undefined,
        });
    }

    async findByProviderAndMonth(providerId: number, month: Date): Promise<EvaluationScore | null> {
        const record = await this.prisma.evaluationScore.findFirst({
            where: { providerId, month },
        });

        if (!record) return null;

        return EvaluationScore.create({
            id: EvaluationScoreId.fromNumber(record.id),
            providerId: record.providerId,
            sectorId: record.sectorId,
            month: record.month,
            scorePercentage: record.scorePercentage,
            rankingPosition: record.rankingPosition ?? undefined,
            totalProvidersInSector: record.totalProvidersInSector ?? undefined,
            publishedAt: record.publishedAt ?? undefined,
        });
    }

    // Fetch all scores for a given sector and month
    async findByMonthAndSector(month: Date, sectorId: string): Promise<EvaluationScore[]> {
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        const records = await this.prisma.evaluationScore.findMany({
            where: {
                sectorId,
                month: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
                deletedAt: null,
            },
        });

        return records.map(r =>
            EvaluationScore.create({
                id: EvaluationScoreId.fromNumber(r.id),
                providerId: r.providerId,
                sectorId: r.sectorId,
                month: r.month,
                scorePercentage: r.scorePercentage,
                rankingPosition: r.rankingPosition ?? undefined,
                totalProvidersInSector: r.totalProvidersInSector ?? undefined,
                publishedAt: r.publishedAt ?? undefined,
            })
        );
    }

    // Bulk update multiple scores
    async bulkUpdate(scores: { id: number; publishedAt?: Date; rankingPosition?: number }[]): Promise<void> {
        const updatePromises = scores.map(s =>
            this.prisma.evaluationScore.update({
                where: { id: s.id },
                data: {
                    publishedAt: s.publishedAt,
                    rankingPosition: s.rankingPosition,
                },
            })
        );

        await Promise.all(updatePromises);
    }
}
