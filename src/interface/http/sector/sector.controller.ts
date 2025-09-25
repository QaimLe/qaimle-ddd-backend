// controllers/sector.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateSector } from '../../../core/applications/sector/create-sector.usecase';

@Controller('sectors')
export class SectorController {
    constructor(private readonly createSector: CreateSector) { }

    @Post()
    async create(@Body() body: { name: string; description?: string }) {
        return await this.createSector.execute(body);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        // add GetSectorById use case
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        // add DeleteSector use case
    }
}
