import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEvaluationCriterionUseCase } from '../../core/applications/evaluation/create-evaluation-criterion.usecase';
import { type CreateEvaluationCriterionDto } from '../../core/domain/evaluation/dto/create-evaluation-criterion.dto';
import { FindCriteriaByCategoryUseCase } from '../../core/applications/evaluation/find-criteria-by-category.usecase';

@Controller('criteria')
export class EvaluationCriterionController {
    constructor(private readonly createUseCase: CreateEvaluationCriterionUseCase,
        private readonly findByCategoryUseCase: FindCriteriaByCategoryUseCase

    ) { }

    @Post()
    async create(@Body() dto: CreateEvaluationCriterionDto) {
        return this.createUseCase.execute(dto);
    }

    @Get('category/:categoryId')
    async findByCategory(@Param('categoryId') categoryId: string) {
        return this.findByCategoryUseCase.execute(Number(categoryId));
    }
}
