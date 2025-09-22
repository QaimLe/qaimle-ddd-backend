import { Injectable } from '@nestjs/common';
import { EvaluationTemplateRepository } from '../../../infrastructure/persistence/evaluation-template.repository';
import { EvaluationTemplate } from '../../domain/evaluation-template/evaluation-template.entity';

@Injectable()
export class GetAllEvaluationTemplatesUseCase {
    constructor(private readonly repo: EvaluationTemplateRepository) { }

    async execute(): Promise<EvaluationTemplate[]> {
        return this.repo.findAll();
    }
}
