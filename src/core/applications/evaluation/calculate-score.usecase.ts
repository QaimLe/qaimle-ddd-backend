// import { Injectable } from '@nestjs/common';
// import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

// @Injectable()
// export class CalculateScoreUseCase {
//     constructor(private readonly repo: EvaluationRepository) { }

//     async execute(evaluationId: number): Promise<number> {
//         const evaluation = await this.repo.findById(evaluationId);
//         if (!evaluation) throw new Error('Evaluation not found');

//         const scores = evaluation.answers.map(a => a.score ?? 0);
//         if (scores.length === 0) return 0;

//         const total = scores.reduce((sum, s) => sum + s, 0);
//         const percentage = (total / (scores.length * 5)) * 100; // assuming score out of 5

//         await this.repo.update(evaluationId, { scorePercentage: percentage });
//         return percentage;
//     }
// }
