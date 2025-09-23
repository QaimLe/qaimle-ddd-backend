// src/core/domain/evaluation-score/value-objects/evaluation-score-id.vo.ts
export class EvaluationScoreId {
    private constructor(public readonly value: number) { }

    static fromNumber(id: number): EvaluationScoreId {
        if (id <= 0) throw new Error(`Invalid EvaluationScoreId: ${id}`);
        return new EvaluationScoreId(id);
    }

    static generate(): EvaluationScoreId {
        // Auto-increment handled by DB, so for creation we may leave undefined or null
        return new EvaluationScoreId(0);
    }
}
