export class EvaluationCategoryId {
    private constructor(private readonly value: number) { }

    static fromNumber(id: number): EvaluationCategoryId {
        if (id <= 0) throw new Error('Invalid category ID');
        return new EvaluationCategoryId(id);
    }

    toNumber(): number {
        return this.value;
    }
}
