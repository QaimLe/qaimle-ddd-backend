import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EvaluationQuestionRepository } from '../../infrastructure/persistence/evaluation-question.repository';
import { type CreateEvaluationQuestionDto } from '../../core/domain/evaluation/dto/create-evaluation-question.dto';
import { EvaluationQuestionId } from '../../core/domain/evaluation-question/value-objects/evaluation-question-id.vo';
import { EvaluationCriterionId } from 'src/core/domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo';
@Controller('evaluation-questions')
export class EvaluationQuestionController {
    constructor(
        private readonly questionRepo: EvaluationQuestionRepository,
    ) { }

    @Post()
    async create(@Body() dto: CreateEvaluationQuestionDto) {
        const question = await this.questionRepo.create(dto);
        return {
            id: EvaluationQuestionId.fromString(question.id.toString()),
            criterionId: EvaluationCriterionId.fromString(question.criterionId.toString()),
            text: question.text,
            weight: question.weight,
            inputType: question.inputType,
            orderIndex: question.orderIndex,
        };
    }

    @Get()
    async findAll() {
        const questions = await this.questionRepo.findAll();
        return questions.map(q => ({
            id: EvaluationQuestionId.fromString(q.id.toString()),
            criterionId: EvaluationCriterionId.fromString(q.criterionId.toString()),
            text: q.text,
            weight: q.weight,
            inputType: q.inputType,
            orderIndex: q.orderIndex,
        }))
    }

    @Get('criterion/:criterionId')
    async findByCriterionId(@Param('criterionId') criterionId: string) {
        const questions = await this.questionRepo.findByCriterionId(criterionId);
        return questions.map(q => ({
            id: EvaluationQuestionId.fromString(q.id.toString()),
            criterionId: EvaluationCriterionId.fromString(q.criterionId.toString()),
            text: q.text,
            weight: q.weight,
            inputType: q.inputType,
            orderIndex: q.orderIndex,
        }));
    }
}
