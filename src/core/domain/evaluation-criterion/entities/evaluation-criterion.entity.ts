// src/core/domain/evaluation-criterion/entities/evaluation-criterion.entity.ts
import { EvaluationCriterionId } from '../value-objects/evaluation-criterion-id.vo';
import { EvaluationCategoryId } from '../../evaluation-category/value-objects/evaluation-category-id.vo';

export class EvaluationCriterion {
    private constructor(
        public readonly id: EvaluationCriterionId,
        public readonly categoryId: EvaluationCategoryId,
        public readonly description: string,
        public readonly inputType: string,
        public readonly orderIndex?: number,
        public readonly deletedAt?: Date | null
    ) { }

    static create(props: {
        id: EvaluationCriterionId,
        categoryId: EvaluationCategoryId,
        description: string,
        inputType: string,
        orderIndex?: number,
        deletedAt?: Date | null
    }): EvaluationCriterion {
        return new EvaluationCriterion(
            props.id,
            props.categoryId,
            props.description,
            props.inputType,
            props.orderIndex,
            props.deletedAt ?? null
        );
    }
}
