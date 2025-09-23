import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { Evaluation } from '../../core/domain/evaluation/evaluation.entity';
import { CreateEvaluationUseCase } from '../../core/applications/evaluation/create-evaluation.usecase';
import { GetEvaluationUseCase } from '../../core/applications/evaluation/get-evaluation.usecase';
import { GetAllEvaluationsUseCase } from '../../core/applications/evaluation/get-all-evaluations.usecase';
import { UpdateEvaluationUseCase } from '../../core/applications/evaluation/update-evaluation.usecase';
import { DeleteEvaluationUseCase } from '../../core/applications/evaluation/delete-evaluation.usecase';
import { CalculateScoreUseCase } from '../../core/applications/evaluation/calculate-score.usecase';
import { FlagEvaluationUseCase } from '../../core/applications/evaluation/flag-evaluation.usecase';
// import { EditEvaluationUseCase } from '../../core/applications/evaluation/edit-evaluation.usecase';
import { EvaluationAnswer } from 'src/core/domain/evaluation-answer/entities/evaluation-answer.entity';
@Controller('evaluations')
export class EvaluationController {
    constructor(
        private readonly createUseCase: CreateEvaluationUseCase,
        private readonly getOneUseCase: GetEvaluationUseCase,
        private readonly getAllUseCase: GetAllEvaluationsUseCase,
        private readonly updateUseCase: UpdateEvaluationUseCase,
        private readonly deleteUseCase: DeleteEvaluationUseCase,
        private readonly calcScoreUseCase: CalculateScoreUseCase,
        private readonly flagUseCase: FlagEvaluationUseCase,
        // private readonly editUseCase: EditEvaluationUseCase,
    ) { }

    @Post()
    async create(@Body() body: {
        userId: string;
        providerId: number;
        templateId: number;
        submittedAt: Date;
        isFlagged: boolean;
        createdAt: Date;
        isEdited: boolean;
        answers: EvaluationAnswer[];
    }): Promise<Evaluation> {
        return this.createUseCase.execute(body);
    }

    @Get()
    async findAll(): Promise<Evaluation[]> {
        return this.getAllUseCase.execute();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Evaluation | null> {
        return this.getOneUseCase.execute(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<Evaluation>): Promise<Evaluation> {
        return this.updateUseCase.execute(id, body);
    }

    @Post(':id/calculate-score')
    async calculateScore(@Param('id') id: string): Promise<{ score: number }> {
        const score = await this.calcScoreUseCase.execute(id);
        return { score };
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.deleteUseCase.execute(Number(id));
    }

    @Post(':id/flag')
    async flag(@Param('id') id: string): Promise<void> {
        return this.flagUseCase.execute(id);
    }

    // @Put(':id/edit')
    // async edit(
    //     @Param('id') id: string,
    //     @Body() body: { answers: { criterionId: number; score: number }[] },
    // ): Promise<void> {
    //     return this.editUseCase.execute(Number(id), body);
    // }
}
