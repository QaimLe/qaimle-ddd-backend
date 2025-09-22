import { EvaluationAnswerId } from '../value-objects/evaluation-answer-id.vo';
import { EvaluationId } from '../../evaluation/value-objects/evaluation-id.vo';
import { EvaluationQuestionId } from '../../evaluation-question/value-objects/evaluation-question-id.vo';
export class EvaluationAnswer {
    private constructor(
        public readonly id: EvaluationAnswerId,
        public readonly evaluationId: EvaluationId,
        public readonly questionId: EvaluationQuestionId,  // changed
        public readonly score: number | null,
        public readonly createdAt: Date,
        public readonly deletedAt?: Date | null,
    ) { }

    static create(props: {
        id: EvaluationAnswerId;
        evaluationId: EvaluationId;
        questionId: EvaluationQuestionId;
        score: number | null;
        createdAt: Date;
        deletedAt?: Date | null;
    }): EvaluationAnswer {
        return new EvaluationAnswer(
            props.id,
            props.evaluationId,
            props.questionId,
            props.score,
            props.createdAt,
            props.deletedAt,
        );
    }
}
