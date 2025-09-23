import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationQuestion } from '../../core/domain/evaluation-question/entities/evaluation-question.entity';
import { CreateEvaluationQuestionDto } from '../../core/domain/evaluation/dto/create-evaluation-question.dto';
import { EvaluationQuestionId } from '../../core/domain/evaluation-question/value-objects/evaluation-question-id.vo';
import { EvaluationCriterionId } from '../../core/domain/evaluation-criterion/value-objects/evaluation-criterion-id.vo';

@Injectable()
export class EvaluationQuestionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateEvaluationQuestionDto): Promise<EvaluationQuestion> {
        const record = await this.prisma.evaluationQuestion.create({ data });

        return EvaluationQuestion.create({
            id: EvaluationQuestionId.fromString(record.id.toString()),
            criterionId: EvaluationCriterionId.fromString(record.criterionId.toString()), // still Int
            text: record.text,
            weight: record.weight,
            inputType: record.inputType,
            orderIndex: record.orderIndex ?? undefined,
            deletedAt: record.deletedAt ?? null,
        });
    }

    async findByCriterionId(criterionId: string): Promise<EvaluationQuestion[]> {
        const records = await this.prisma.evaluationQuestion.findMany({ where: { criterionId } });

        return records.map(record =>
            EvaluationQuestion.create({
                id: EvaluationQuestionId.fromString(record.id),
                criterionId: EvaluationCriterionId.fromString(record.criterionId.toString()),
                text: record.text,
                weight: record.weight,
                inputType: record.inputType,
                orderIndex: record.orderIndex ?? undefined,
                deletedAt: record.deletedAt ?? null,
            }),
        );
    }

    async findById(id: string): Promise<EvaluationQuestion | null> {
        const record = await this.prisma.evaluationQuestion.findUnique({ where: { id } });
        return record ? EvaluationQuestion.create({
            id: EvaluationQuestionId.fromString(record.id),
            criterionId: EvaluationCriterionId.fromString(record.criterionId.toString()),
            text: record.text,
            weight: record.weight,
            inputType: record.inputType,
            orderIndex: record.orderIndex ?? undefined,
            deletedAt: record.deletedAt ?? null,
        }) : null;
    }

    async softDelete(id: string): Promise<void> {
        await this.prisma.evaluationQuestion.update({ where: { id }, data: { deletedAt: new Date() } });
    }

    async findAll(): Promise<EvaluationQuestion[]> {
        const questions = await this.prisma.evaluationQuestion.findMany();

        return questions.map(q =>
            EvaluationQuestion.create({
                id: EvaluationQuestionId.fromString(q.id),
                criterionId: EvaluationCriterionId.fromString(q.criterionId.toString()),
                text: q.text,
                weight: q.weight,
                inputType: q.inputType,
                orderIndex: q.orderIndex ?? undefined,
                deletedAt: q.deletedAt ?? null,
            }),
        );
    }

}
