// src/core/domain/evaluation-score/entities/evaluation-score.entity.ts
import { EvaluationScoreId } from '../value-objects/evaluation-score-id.vo';

export class EvaluationScore {
    private constructor(
        public readonly id: EvaluationScoreId,
        public readonly providerId: number,
        public readonly sectorId: string,
        public readonly month: Date,
        public readonly scorePercentage: number,
        public  rankingPosition?: number,
        public readonly totalProvidersInSector?: number,
        public readonly publishedAt?: Date,
    ) { }

    
    static create(props: {
        id?: EvaluationScoreId;
        providerId: number;
        sectorId: string;
        month: Date;
        scorePercentage: number;
        rankingPosition?: number;
        totalProvidersInSector?: number;
        publishedAt?: Date;
    }): EvaluationScore {
        return new EvaluationScore(
            props.id ?? EvaluationScoreId.generate(),
            props.providerId,
            props.sectorId,
            props.month,
            props.scorePercentage,
            props.rankingPosition,
            props.totalProvidersInSector,
            props.publishedAt
        );
    }
}
