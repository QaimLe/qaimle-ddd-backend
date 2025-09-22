import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '../../../infrastructure/persistence/evaluation.repository';

@Injectable()
export class DeleteEvaluationUseCase {
    constructor(private readonly repo: EvaluationRepository) { }

    async execute(id: number): Promise<void> {
        return this.repo.softDelete(id);
    }
}
