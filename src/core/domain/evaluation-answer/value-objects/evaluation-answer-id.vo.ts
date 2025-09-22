// src/core/domain/evaluation-answer/value-objects/evaluation-answer-id.vo.ts

export class EvaluationAnswerId {
    private constructor(private readonly value: string) { }

    // Generate a new UUID asynchronously
    static async generate(): Promise<EvaluationAnswerId> {
        const { v4: uuidv4 } = await import('uuid');
        return new EvaluationAnswerId(uuidv4());
    }

    // Create from existing string asynchronously with validation
    static async fromString(id: string): Promise<EvaluationAnswerId> {
        const { validate: uuidValidate } = await import('uuid');
        if (!uuidValidate(id)) {
            throw new Error(`Invalid EvaluationAnswerId: ${id}`);
        }
        return new EvaluationAnswerId(id);
    }

    toString(): string {
        return this.value;
    }
}
