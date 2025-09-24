// src/interface/http/evaluation-template.module.ts
import { Module } from '@nestjs/common';
import { EvaluationTemplateController } from './evaluation-template.controller';
import { CreateEvaluationTemplateUseCase } from '../../../core/applications/evaluation/create-evaluation-template.usecase';
import { GetAllEvaluationTemplatesUseCase } from '../../../core/applications/evaluation/get-all-evaluation-templates.usecase';
import { GetEvaluationTemplateUseCase } from '../../../core/applications/evaluation/get-evaluation-template.usecase';
import { EvaluationTemplateRepository } from '../../../infrastructure/persistence/evaluation-template.repository';

@Module({
    controllers: [EvaluationTemplateController],
    providers: [
        CreateEvaluationTemplateUseCase,
        GetAllEvaluationTemplatesUseCase,   // ✅ add
        GetEvaluationTemplateUseCase,       // ✅ add
        EvaluationTemplateRepository,
    ],
})
export class EvaluationTemplateModule { }
