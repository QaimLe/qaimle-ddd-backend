import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/evaluation/evaluation.entity';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

@Injectable()
export class UpdateEvaluationUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(id: string, data: Partial<Evaluation>): Promise<Evaluation> {
        return this.repo.update(id, data);
    }
}
