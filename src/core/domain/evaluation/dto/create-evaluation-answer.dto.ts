// src/interface/http/dto/create-evaluation-answer.dto.ts
export class CreateEvaluationAnswerDto {
    evaluationId: string;   // UUID of the evaluation
    questionId: string;    // ID of the criterion
    score?: number;
}
