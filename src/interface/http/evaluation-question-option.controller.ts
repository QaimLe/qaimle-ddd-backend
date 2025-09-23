// src/interface/http/evaluation-question-option.controller.ts
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { EvaluationQuestionOptionRepository } from "../../infrastructure/persistence/evaluation-question-option.repository";
import { EvaluationQuestionOption } from "../../core/domain/evaluation-question-option/entities/evaluation-question-option.entity";
import { EvaluationQuestionId } from "../../core/domain/evaluation-question/value-objects/evaluation-question-id.vo";

@Controller("question-options")
export class EvaluationQuestionOptionController {
    constructor(private readonly optionRepo: EvaluationQuestionOptionRepository) { }

    @Post()
    async create(@Body() body: any) {
        console.log(body);
        const option = EvaluationQuestionOption.create(
            EvaluationQuestionId.fromString(body.questionId),
            body.text,
            Number(body.value),
            body.orderIndex,
        );

        await this.optionRepo.create(option);
        return { success: true, id: option.getId() };
    }


    @Get(":questionId")
    async findByQuestionId(@Param("questionId") questionId: string) {
        return this.optionRepo.findByQuestionId(questionId);
    }
}
