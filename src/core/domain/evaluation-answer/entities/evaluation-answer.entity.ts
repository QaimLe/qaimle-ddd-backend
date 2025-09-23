import { EvaluationAnswerId } from '../value-objects/evaluation-answer-id.vo';
import { EvaluationId } from '../../evaluation/value-objects/evaluation-id.vo';
import { EvaluationQuestionId } from '../../evaluation-question/value-objects/evaluation-question-id.vo';
export class EvaluationAnswer {
    private constructor(
        public readonly id: EvaluationAnswerId,
        public readonly evaluationId: EvaluationId,
        public readonly questionId: EvaluationQuestionId,
        public readonly selectedOptionId: string | null,
        public readonly score: number | null,
        public readonly createdAt: Date,
        public readonly deletedAt?: Date | null,

        // 👇 relation (denormalized snapshot of the question)
        public readonly question?: {
            id: string;
            criterionId: string;   // 👈 add this
            weight: number;
            inputType: string;
            text: string;
        } | null,
    ) { }

    static create(props: {
        id: EvaluationAnswerId;
        evaluationId: EvaluationId;
        questionId: EvaluationQuestionId;
        selectedOptionId?: string | null;
        score: number | null;
        createdAt: Date;
        deletedAt?: Date | null;

        question?: {
            id: string;
            criterionId: string;   // 👈 add this
            weight: number;
            inputType: string;
            text: string;
        } | null;
    }): EvaluationAnswer {
        return new EvaluationAnswer(
            props.id,
            props.evaluationId,
            props.questionId,
            props.selectedOptionId ?? null,
            props.score,
            props.createdAt,
            props.deletedAt,
            props.question ?? null,
        );
    }
}
