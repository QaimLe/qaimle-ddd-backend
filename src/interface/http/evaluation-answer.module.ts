// src/interface/http/evaluation-answer.module.ts
import { Module } from '@nestjs/common';
import { EvaluationAnswerController } from './evaluation-answer.controller';
import { EvaluationAnswerRepository } from '../../infrastructure/persistence/evaluation-answer.repository';
import { CreateEvaluationAnswerUseCase } from '../../core/applications/evaluation/create-evaluation-answer.usecase';

@Module({
    controllers: [EvaluationAnswerController],
    providers: [EvaluationAnswerRepository, CreateEvaluationAnswerUseCase],
})
export class EvaluationAnswerModule { }
