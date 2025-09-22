// src/infrastructure/persistence/evaluation-answer.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationAnswerRepository as IEvaluationAnswerRepository } from '../../core/domain/evaluation-answer/repositories/evaluation-answer.repository';
import { EvaluationAnswer } from '../../core/domain/evaluation-answer/entities/evaluation-answer.entity';
import { EvaluationAnswerId } from '../../core/domain/evaluation-answer/value-objects/evaluation-answer-id.vo';
import { EvaluationId } from '../../core/domain/evaluation/value-objects/evaluation-id.vo';
import { EvaluationQuestionId } from '../../core/domain/evaluation-question/value-objects/evaluation-question-id.vo';

@Injectable()
export class EvaluationAnswerRepository implements IEvaluationAnswerRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(answer: EvaluationAnswer): Promise<void> {
        await this.prisma.evaluationAnswer.create({
            data: {
                id: answer.id.toString(),
                evaluationId: answer.evaluationId.toString(),
                questionId: answer.questionId.toString(), // number
                score: answer.score,
                createdAt: answer.createdAt,
                deletedAt: answer.deletedAt,
            },
        });
    }

    async findById(id: EvaluationAnswerId): Promise<EvaluationAnswer | null> {
        const record = await this.prisma.evaluationAnswer.findUnique({
            where: { id: id.toString() },
        });
        if (!record) return null;

        return EvaluationAnswer.create({
            id: await EvaluationAnswerId.fromString(record.id),
            evaluationId: EvaluationId.fromString(record.evaluationId),
            questionId: EvaluationQuestionId.fromString(record.questionId?.toString() ?? ''),
            score: record.score,
            createdAt: record.createdAt,
            deletedAt: record.deletedAt,
        });
    }

    async findAll(): Promise<EvaluationAnswer[]> {
        const records = await this.prisma.evaluationAnswer.findMany({});

        const answers = await Promise.all(
            records.map(async (record) =>
                EvaluationAnswer.create({
                    id: await EvaluationAnswerId.fromString(record.id),
                    evaluationId: await EvaluationId.fromString(record.evaluationId),
                    questionId: EvaluationQuestionId.fromString(record.questionId?.toString() ?? ''),
                    score: record.score,
                    createdAt: record.createdAt,
                    deletedAt: record.deletedAt,
                })
            )
        );

        return answers;
    }


    async findByEvaluationId(evaluationId: string): Promise<EvaluationAnswer[]> {
        const records = await this.prisma.evaluationAnswer.findMany({
            where: { evaluationId },
        });

        const answers = await Promise.all(
            records.map(async (record) =>
                EvaluationAnswer.create({
                    id: await EvaluationAnswerId.fromString(record.id),
                    evaluationId: await EvaluationId.fromString(record.evaluationId),
                    questionId: EvaluationQuestionId.fromString(record.questionId?.toString() ?? '' ), //record.questionId?.toString() ,
                    score: record.score,
                    createdAt: record.createdAt,
                    deletedAt: record.deletedAt,
                })
            )
        );

        return answers;
    }


    async delete(id: EvaluationAnswerId): Promise<void> {
        await this.prisma.evaluationAnswer.delete({
            where: { id: id.toString() },
        });
    }

    async softDelete(id: EvaluationAnswerId): Promise<void> {
        await this.prisma.evaluationAnswer.update({
            where: { id: id.toString() },
            data: { deletedAt: new Date() },
        });
    }

    async update(
        id: EvaluationAnswerId,
        data: Partial<{
            evaluationId: string;
            criterionId: number;
            score: number;
        }>
    ): Promise<EvaluationAnswer> {
        const record = await this.prisma.evaluationAnswer.update({
            where: { id: id.toString() },
            data: {
                evaluationId: data.evaluationId,
                // questionId: data.questionId.toString(),
                score: data.score,
            },
        });

     return EvaluationAnswer.create({
    id: await EvaluationAnswerId.fromString(record.id),
    evaluationId: await EvaluationId.fromString(record.evaluationId),
    questionId: EvaluationQuestionId.fromString(record.questionId?.toString() ?? ''),
    score: record.score,
    createdAt: record.createdAt,
    deletedAt: record.deletedAt,
});

    }
}
