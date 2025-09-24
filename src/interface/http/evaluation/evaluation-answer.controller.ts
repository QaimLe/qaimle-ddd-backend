// src/interface/http/evaluation-answer.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateEvaluationAnswerUseCase } from '../../../core/applications/evaluation/create-evaluation-answer.usecase';
import { EvaluationAnswer } from '../../../core/domain/evaluation-answer/entities/evaluation-answer.entity';
import { EvaluationAnswerRepository } from '../../../infrastructure/persistence/evaluation-answer.repository';
import { CreateEvaluationAnswerDto } from '../../../core/domain/evaluation/dto/create-evaluation-answer.dto';
import { EvaluationAnswerId } from '../../../core/domain/evaluation-answer/value-objects/evaluation-answer-id.vo';
@Controller('evaluation-answers')
export class EvaluationAnswerController {
    constructor(
        private readonly createUseCase: CreateEvaluationAnswerUseCase,
        private readonly repo: EvaluationAnswerRepository,
    ) { }

    @Post()
    async create(@Body() body: CreateEvaluationAnswerDto): Promise<EvaluationAnswer> {
        return this.createUseCase.execute(body);
    }


    @Get()
    async findAll(): Promise<EvaluationAnswer[]> {
        return this.repo.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EvaluationAnswer | null> {
        const answerId = await EvaluationAnswerId.fromString(id);
        return this.repo.findById(answerId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string, // usually string from URL
        @Body()
        body: Partial<{
            evaluationId: string; // must be string
            criterionId: number;
            score: number;
        }>,
    ): Promise<EvaluationAnswer> {
        const evaluationAnswerId = await EvaluationAnswerId.fromString(id); // convert URL param to VO
        return this.repo.update(evaluationAnswerId, body);
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        const evaluationAnswerId = await EvaluationAnswerId.fromString(id); // convert URL param to VO

        return this.repo.softDelete(evaluationAnswerId);
    }
}
