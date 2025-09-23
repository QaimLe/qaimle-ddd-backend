import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationQuestionOption } from '../../core/domain/evaluation-question-option/entities/evaluation-question-option.entity';

@Injectable()
export class EvaluationQuestionOptionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(option: EvaluationQuestionOption): Promise<void> {
        await this.prisma.evaluationQuestionOption.create({
            data: {
                id: option.getId().value,
                questionId: option.getQuestionId().getValue(),
                text: option.getText(),
                value: option.getValue(),
                orderIndex: option.getOrderIndex(),
            },
        });
    }

    async findById(id: string): Promise<EvaluationQuestionOption | null> {
        const option = await this.prisma.evaluationQuestionOption.findUnique({ where: { id } });
        if (!option) return null;
        return EvaluationQuestionOption.fromPersistence(option);
    }

    async findByQuestionId(questionId: string): Promise<EvaluationQuestionOption[]> {
        const options = await this.prisma.evaluationQuestionOption.findMany({
            where: { questionId },
        });

        return options.map(o => EvaluationQuestionOption.fromPersistence(o));
    }

    // async softDelete(id: string): Promise<void> {
    //     await this.prisma.evaluationQuestionOption.update({ where: { id }, data: { deletedAt: new Date() } });
    // }


}
