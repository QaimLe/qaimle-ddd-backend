// src/core/domain/evaluation-question/value-objects/evaluation-question-id.vo.ts
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class EvaluationQuestionId {
    private constructor(private readonly value: string) { }

    static generate(): EvaluationQuestionId {
        return new EvaluationQuestionId(uuidv4());
    }

    getValue(): string {
        return this.value;
    }

    static fromString(id: string): EvaluationQuestionId {
        if (!uuidValidate(id)) throw new Error(`Invalid EvaluationQuestionId: ${id}`);
        return new EvaluationQuestionId(id);
    }

    toString(): string {
        return this.value;
    }
}
