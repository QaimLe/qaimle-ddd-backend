// src/core/domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo.ts
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class EvaluationCriterionId {
    private constructor(private readonly value: string) { }

    static generate(): EvaluationCriterionId {
        return new EvaluationCriterionId(uuidv4());
    }

    static fromString(id: string): EvaluationCriterionId {
        if (!uuidValidate(id)) throw new Error(`Invalid EvaluationCriterionId: ${id}`);
        return new EvaluationCriterionId(id);
    }

    toString(): string {
        return this.value;
    }
}
