// domain/repositories/sector.repository.ts
import { Sector } from '../sector/sector.entity';

export interface ISectorRepository {
    // create(sector: Sector): Promise<Sector>;
    save(sector: Sector): Promise<Sector>;
    findById(id: string): Promise<Sector | null>;
    findAll(): Promise<Sector[]>;
    update(sector: Sector): Promise<Sector>;
    delete(id: string): Promise<void>;
}
