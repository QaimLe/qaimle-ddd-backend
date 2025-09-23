// src/core/domain/evaluation-question-option/entities/evaluation-question-option.entity.ts
import { EvaluationQuestionOptionId } from "../value-objects/evaluation-question-option-id.vo";
import { EvaluationQuestionId } from "../../evaluation-question/value-objects/evaluation-question-id.vo";
// evaluation-question-option.entity.ts
// evaluation-question-option.entity.ts
export class EvaluationQuestionOption {
    private constructor(
        private readonly id: EvaluationQuestionOptionId,
        private readonly questionId: EvaluationQuestionId,
        public readonly text: string,
        public readonly value: number,
        public readonly orderIndex?: number,
    ) { }

    static create(
        questionId: EvaluationQuestionId,
        text: string,
        value: number,
        orderIndex?: number,
    ): EvaluationQuestionOption {
        return new EvaluationQuestionOption(
            EvaluationQuestionOptionId.generate(),
            questionId,
            text,
            value,
            orderIndex,
        );
    }


    static fromPersistence(raw: {
        id: string;
        questionId: string;
        text: string;
        value: number | null;
        orderIndex: number | null;
    }): EvaluationQuestionOption {
        return new EvaluationQuestionOption(
            EvaluationQuestionOptionId.fromString(raw.id),
            EvaluationQuestionId.fromString(raw.questionId),
            raw.text,
            raw.value ?? 0,
            raw.orderIndex ?? undefined,
        );
    }


    // 👇 Add getters
    getId(): EvaluationQuestionOptionId {
        return this.id;
    }

    getQuestionId(): EvaluationQuestionId {
        return this.questionId;
    }

    getText(): string {
        return this.text;
    }

    getValue(): number {
        return this.value;
    }

    getOrderIndex(): number | undefined {
        return this.orderIndex;
    }
}
