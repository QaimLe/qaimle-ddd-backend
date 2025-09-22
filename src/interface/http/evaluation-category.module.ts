// src/interface/http/evaluation-category.module.ts
import { Module } from '@nestjs/common';
import { EvaluationCategoryController } from './evaluation-category.controller';
import { EvaluationCategoryRepository } from '../../infrastructure/persistence/evaluation-category.repository';
import { CreateEvaluationCategoryUseCase } from '../../core/applications/evaluation/create-evaluation-category.usecase';

@Module({
    controllers: [EvaluationCategoryController],
    providers: [EvaluationCategoryRepository, CreateEvaluationCategoryUseCase],
})
export class EvaluationCategoryModule { }
