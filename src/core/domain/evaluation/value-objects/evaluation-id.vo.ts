// src/core/domain/evaluation/value-objects/evaluation-id.vo.ts
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

export class EvaluationId {
    private constructor(private readonly value: string) { }

    static generate(): EvaluationId {
        return new EvaluationId(uuidv4());
    }

    static fromString(id: string): EvaluationId {
        if (!uuidValidate(id)) {
            throw new Error(`Invalid EvaluationId: ${id}`);
        }
        return new EvaluationId(id);
    }

    toString(): string {
        return this.value;
    }
}
