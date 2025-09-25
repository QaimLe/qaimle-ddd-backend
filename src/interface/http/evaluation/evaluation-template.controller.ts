import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateEvaluationTemplateUseCase } from '../../../core/applications/evaluation/create-evaluation-template.usecase';
import { GetAllEvaluationTemplatesUseCase } from '../../../core/applications/evaluation/get-all-evaluation-templates.usecase';
import { GetEvaluationTemplateUseCase } from '../../../core/applications/evaluation/get-evaluation-template.usecase';
import { EvaluationTemplate } from '../../../core/domain/evaluation-template/evaluation-template.entity';
import { EvaluationTemplateRepository } from '../../../infrastructure/persistence/evaluation-template.repository';

@Controller('evaluation-templates')
export class EvaluationTemplateController {
    constructor(
        private readonly createUseCase: CreateEvaluationTemplateUseCase,
        private readonly getAllUseCase: GetAllEvaluationTemplatesUseCase,
        private readonly getByIdUseCase: GetEvaluationTemplateUseCase,
        private readonly repo: EvaluationTemplateRepository,
    ) { }

    @Post()
    async create(
        @Body()
        body: {
            sectorId: string;
            version: number;
            effectiveFrom: string; // ISO string
            isActive?: boolean;
        },
    ): Promise<EvaluationTemplate> {
        console.log("body:", body);
        return this.createUseCase.execute({
            sectorId: body.sectorId,
            version: body.version,
            effectiveFrom: new Date(body.effectiveFrom),
            isActive: body.isActive ?? true,
        });
    }


    @Get()
    async findAll(): Promise<EvaluationTemplate[]> {
        return this.getAllUseCase.execute();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<EvaluationTemplate> {
        return this.getByIdUseCase.execute(Number(id));
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: any): Promise<EvaluationTemplate> {
        return this.repo.update(Number(id), body);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        return this.repo.softDelete(Number(id));
    }
}
