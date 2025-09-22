// src/core/domain/evaluation/evaluation-template.entity.ts
export class EvaluationTemplate {
    constructor(
        public readonly id: number | null,
        public readonly sectorId: number,
        public readonly version: number,
        public readonly effectiveFrom: Date,
        public readonly isActive: boolean,
        public readonly createdAt: Date,
        public readonly deletedAt?: Date | null,
    ) { }
}
