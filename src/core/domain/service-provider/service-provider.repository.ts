// domain/repositories/service-provider.repository.ts
import { ServiceProvider } from './service-provider.entity';

export interface ServiceProviderRepository {
    findById(id: string): Promise<ServiceProvider | null>;
    findAllBySector(sectorId: string): Promise<ServiceProvider[]>;
    save(provider: ServiceProvider): Promise<ServiceProvider>;
    delete(id: string): Promise<void>;
}