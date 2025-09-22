import { Injectable } from '@nestjs/common';
import { Evaluation } from '../../domain/evaluation/evaluation.entity';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

@Injectable()
export class GetAllEvaluationsUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(): Promise<Evaluation[]> {
        return this.repo.findAll();
    }
}
