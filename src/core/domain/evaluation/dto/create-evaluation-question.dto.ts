// src/core/domain/evaluation/dto/create-evaluation-question.dto.ts
export interface CreateEvaluationQuestionDto {
    criterionId: string;
    text: string;
    weight: number;
    inputType: string;
    orderIndex?: number;
}
