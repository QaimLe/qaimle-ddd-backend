import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/evaluation/evaluation.entity';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

@Injectable()
export class GetEvaluationUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(id: string): Promise<Evaluation | null> {
        return this.repo.findById(id);
    }
}