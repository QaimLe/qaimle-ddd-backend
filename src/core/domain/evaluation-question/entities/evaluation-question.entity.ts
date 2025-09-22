// src/core/domain/evaluation-question/entities/evaluation-question.entity.ts
import { EvaluationQuestionId } from '../value-objects/evaluation-question-id.vo';
import { EvaluationCriterionId } from '../../evaluation-criterion/value-objects/evaluation-criterion-id.vo';

export class EvaluationQuestion {
    private constructor(
        public readonly id: EvaluationQuestionId,
        public readonly criterionId: EvaluationCriterionId,
        public readonly text: string,
        public readonly weight: number,
        public readonly inputType: string,
        public readonly orderIndex?: number,
        public readonly deletedAt?: Date | null,
    ) { }

    static create(props: {
        id: EvaluationQuestionId,
        criterionId: EvaluationCriterionId,
        text: string,
        weight: number,
        inputType: string,
        orderIndex?: number,
        deletedAt?: Date | null,
    }): EvaluationQuestion {
        return new EvaluationQuestion(
            props.id,
            props.criterionId,
            props.text,
            props.weight,
            props.inputType,
            props.orderIndex,
            props.deletedAt ?? null
        );
    }
}
