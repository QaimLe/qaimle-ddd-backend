import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';
import { Evaluation } from '../../domain/evaluation/evaluation.entity';

@Injectable()
export class CreateEvaluationUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(data: Omit<Evaluation, 'id'>): Promise<Evaluation> {
        return this.repo.create(data); // ✅ call the repository, not prisma directly
    }
}
