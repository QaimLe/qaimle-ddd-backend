// src/core/domain/evaluation/dto/create-evaluation-criterion.dto.ts
export interface CreateEvaluationCriterionDto {
    categoryId: number;
    description: string;
    inputType: string; // e.g., "MCQ", "Number", "Boolean"
    orderIndex?: number;
}
