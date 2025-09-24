import { Module } from "@nestjs/common";
import { EvaluationQuestionOptionController } from "./evaluation-question-option.controller";
import { EvaluationQuestionOptionRepository } from "../../../infrastructure/persistence/evaluation-question-option.repository";

@Module({
    controllers: [EvaluationQuestionOptionController],
    providers: [EvaluationQuestionOptionRepository],
    exports: [EvaluationQuestionOptionRepository],
})
export class EvaluationQuestionOptionModule { }
