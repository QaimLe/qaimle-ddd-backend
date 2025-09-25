// application/usecases/sector/create-sector.usecase.ts
import { Sector } from '../../domain/sector/sector.entity';
import { ISectorRepository } from '../../domain/sector/sector.repository';
export class CreateSector {
    constructor(private readonly sectorRepo: ISectorRepository) { }

    async execute(dto: { name: string; description?: string }) {
        const sector = new Sector(dto.name, dto.description);
        return await this.sectorRepo.save(sector);
    }
}