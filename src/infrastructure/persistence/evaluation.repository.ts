import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Evaluation } from '../../core/domain/evaluation/evaluation.entity';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EvaluationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: {
        userId: string;
        providerId: number;
        templateId: number;
        // answers: { criterionId: number; score: number }[];
    }): Promise<Evaluation> {
        const evaluation = await this.prisma.evaluation.create({
            data: {
                id: await import('uuid').then((uuid) => uuid.v4()), // uuidv4(), // <-- generate UUID
                submittedAt: new Date(),
                userId: data.userId,
                providerId: data.providerId,
                templateId: data.templateId,
            },
            include: { answers: true },
        });
        return evaluation as unknown as Evaluation;
    }

    async findById(id: number): Promise<Evaluation | null> {
        return this.prisma.evaluation.findFirst({
            where: { id : id.toString(), deletedAt: null },
            include: { answers: true },
        }) as unknown as Evaluation | null;
    }

    async findAll(): Promise<Evaluation[]> {
        return this.prisma.evaluation.findMany({
            where: { deletedAt: null },
            include: { answers: true },
        }) as unknown as Evaluation[];
    }

    async update(id: number, data: any): Promise<Evaluation> {
        return this.prisma.evaluation.update({
            where: { id: id.toString() },
            data,
            include: { answers: true },
        }) as unknown as Evaluation;
    }

    async softDelete(id: number): Promise<void> {
        await this.prisma.evaluation.update({
            where: { id: id.toString() },
            data: { deletedAt: new Date() },
        });
    }
}
