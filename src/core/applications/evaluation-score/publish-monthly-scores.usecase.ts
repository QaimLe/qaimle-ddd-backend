import { Injectable } from "@nestjs/common";
import { EvaluationScoreRepository } from "../../../infrastructure/persistence/evaluation-score.repository";
@Injectable()
export class PublishMonthlyScoresUseCase {
    constructor(private readonly scoreRepo: EvaluationScoreRepository) { }

    async execute(month: Date, sectorId: number) {
        // 1️⃣ Fetch all scores for the sector and month
        const scores = await this.scoreRepo.findByMonthAndSector(month, sectorId);

        if (!scores.length) return [];

        // 2️⃣ Sort by scorePercentage descending for ranking
        scores.sort((a, b) => (b.scorePercentage || 0) - (a.scorePercentage || 0));

        // 3️⃣ Assign rankingPosition
        scores.forEach((score, index) => {

            score.rankingPosition = index + 1;
        });

        // 4️⃣ Mark as published (update database)
        await this.scoreRepo.bulkUpdate(scores.map(s => ({
            id: s.id.value, // unwrap the VO to get the number
            publishedAt: new Date(),
            rankingPosition: s.rankingPosition,
        })));

        return scores;
    }
    get repository(): EvaluationScoreRepository {
        return this.scoreRepo;
    }
}
