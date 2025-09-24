import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { EvaluationQuestionRepository } from '../../../infrastructure/persistence/evaluation-question.repository';
import { EvaluationQuestionController } from './evaluation-question.controller';

@Module({
    controllers: [EvaluationQuestionController],
    providers: [PrismaService, EvaluationQuestionRepository],
    exports: [EvaluationQuestionRepository],
})
export class EvaluationQuestionModule { }
