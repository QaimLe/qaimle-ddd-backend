import { EvaluationCategoryId } from './value-objects/evaluation-category-id.vo';
export class EvaluationCategory {
    constructor(
        public readonly id: EvaluationCategoryId,
        public readonly templateId: number,
        public readonly title: string,
        public readonly weight: number,
        public readonly orderIndex: number = 0,
        public readonly deletedAt?: Date | null,
    ) { }
}
