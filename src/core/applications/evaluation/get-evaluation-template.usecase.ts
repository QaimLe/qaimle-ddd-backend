import { Injectable, NotFoundException } from '@nestjs/common';
import { EvaluationTemplateRepository } from '../../../infrastructure/persistence/evaluation-template.repository';
import { EvaluationTemplate } from '../../domain/evaluation-template/evaluation-template.entity';

@Injectable()
export class GetEvaluationTemplateUseCase {
    constructor(private readonly repo: EvaluationTemplateRepository) { }

    async execute(id: number): Promise<EvaluationTemplate> {
        const template = await this.repo.findById(id);
        if (!template) throw new NotFoundException('Evaluation template not found');
        return template;
    }
}
