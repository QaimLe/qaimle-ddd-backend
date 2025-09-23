import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationRepository } from '../../infrastructure/persistence/evaluation.repository';
import { CreateEvaluationUseCase } from '../../core/applications/evaluation/create-evaluation.usecase';
import { GetEvaluationUseCase } from '../../core/applications/evaluation/get-evaluation.usecase';
import { GetAllEvaluationsUseCase } from '../../core/applications/evaluation/get-all-evaluations.usecase';
import { UpdateEvaluationUseCase } from '../../core/applications/evaluation/update-evaluation.usecase';
import { DeleteEvaluationUseCase } from '../../core/applications/evaluation/delete-evaluation.usecase';
import { CalculateScoreUseCase } from '../../core/applications/evaluation/calculate-score.usecase';
import { FlagEvaluationUseCase } from '../../core/applications/evaluation/flag-evaluation.usecase';
// import { EditEvaluationUseCase } from '../../core/applications/evaluation/edit-evaluation.usecase';
import { EvaluationQuestionModule } from './evaluation-question.module';
import { EvaluationQuestionOptionModule } from './evaluation-question-option.module';
@Module({
    imports: [
        EvaluationQuestionModule,      
        EvaluationQuestionOptionModule 
    ],
    controllers: [EvaluationController],
    providers: [
        EvaluationRepository,
        CreateEvaluationUseCase,
        GetEvaluationUseCase,
        GetAllEvaluationsUseCase,
        UpdateEvaluationUseCase,
        DeleteEvaluationUseCase,
        CalculateScoreUseCase,
        FlagEvaluationUseCase,
        // EditEvaluationUseCase,
    ],
})
export class EvaluationModule { }
