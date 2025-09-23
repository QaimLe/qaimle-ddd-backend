// src/core/domain/evaluation-question-option/value-objects/evaluation-question-option-id.vo.ts
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class EvaluationQuestionOptionId {
    private constructor(public readonly value: string) { }

    static generate(): EvaluationQuestionOptionId {
        return new EvaluationQuestionOptionId(uuidv4());
    }

    static fromString(id: string): EvaluationQuestionOptionId {
        if (!uuidValidate(id)) throw new Error(`Invalid EvaluationQuestionOptionId: ${id}`);
        return new EvaluationQuestionOptionId(id);
    }
}
