// modules/sector.module.ts
import { Module } from '@nestjs/common';
import { SectorController } from './sector.controller';
import { CreateSector } from '../../../core/applications/sector/create-sector.usecase';
import { PrismaSectorRepository } from '../../../infrastructure/persistence/sector.repository';

@Module({
    controllers: [SectorController],
    providers: [
        {
            provide: 'SectorRepository',
            useClass: PrismaSectorRepository,
        },
        CreateSector,
    ],
})
export class SectorModule { }
