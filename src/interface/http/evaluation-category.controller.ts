import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateEvaluationCategoryUseCase } from '../../core/applications/evaluation/create-evaluation-category.usecase';
import { EvaluationCategory } from '../../core/domain/evaluation-category/evaluation-category.entity';
import { EvaluationCategoryRepository } from '../../infrastructure/persistence/evaluation-category.repository';

@Controller('evaluation-categories')
export class EvaluationCategoryController {
    constructor(
        private readonly createUseCase: CreateEvaluationCategoryUseCase,
        private readonly repo: EvaluationCategoryRepository,
    ) { }

    @Post()
    async create(@Body() body: { templateId: number; title: string; weight?: number; orderIndex?: number }): Promise<EvaluationCategory> {
        return this.createUseCase.execute(body);
    }

    @Get()
    async findAll(): Promise<EvaluationCategory[]> {
        return this.repo.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EvaluationCategory | null> {
        return this.repo.findById(Number(id));
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() body: Partial<{ templateId: number; title: string; weight?: number; orderIndex?: number }>
    ): Promise<EvaluationCategory> {
        return this.repo.update(Number(id), body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.repo.softDelete(Number(id));
    }
}
