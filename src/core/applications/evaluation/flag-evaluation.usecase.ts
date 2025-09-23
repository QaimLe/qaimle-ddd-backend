import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

@Injectable()
export class FlagEvaluationUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(id: string): Promise<void> {
        await this.repo.update(id, { isFlagged: true });
    }
}
