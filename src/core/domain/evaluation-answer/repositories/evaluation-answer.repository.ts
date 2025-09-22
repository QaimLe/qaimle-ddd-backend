// src/core/domain/evaluation-answer/repositories/evaluation-answer.repository.ts
import { EvaluationAnswer } from '../entities/evaluation-answer.entity';
import { EvaluationAnswerId } from '../value-objects/evaluation-answer-id.vo';

export abstract class EvaluationAnswerRepository {
    abstract save(answer: EvaluationAnswer): Promise<void>;
    abstract findById(id: EvaluationAnswerId): Promise<EvaluationAnswer | null>;
    abstract findByEvaluationId(evaluationId: string): Promise<EvaluationAnswer[]>;
    abstract delete(id: EvaluationAnswerId): Promise<void>;
}
