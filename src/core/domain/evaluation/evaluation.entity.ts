export class Evaluation {
    constructor(
        public readonly id: number,
        public readonly userId: string,
        public readonly providerId: number,
        public readonly templateId: number,
        public readonly submittedAt: Date,
        readonly scorePercentage?: number | null,
        public readonly isFlagged: boolean = false,
        public readonly isEdited: boolean = false,
        public readonly editedAt?: Date | null, 
        public readonly createdAt: Date = new Date(),
        public readonly deletedAt?: Date | null,
    ) { }
}
