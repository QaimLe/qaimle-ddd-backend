export interface CreateEvaluationCategoryDto {
    templateId: number;
    title: string;        // matches Prisma schema
    weight?: number;      // optional
    orderIndex?: number;  // optional
}
