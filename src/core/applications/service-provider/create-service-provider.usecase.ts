// application/usecases/service-provider/create-service-provider.usecase.ts
import { ServiceProvider } from '../../domain/service-provider/service-provider.entity';
import { ServiceProviderRepository } from '../../domain/service-provider/service-provider.repository';
import { ISectorRepository } from '../../domain/sector/sector.repository';
import { AddressVO } from '../../domain/service-provider/value-objects/address.vo';
import { ContactVO } from '../../domain/service-provider/value-objects/contact.vo';
export class CreateServiceProvider {
    constructor(
        private readonly serviceProviderRepo: ServiceProviderRepository,
        private readonly sectorRepo: ISectorRepository,
    ) { }

    async execute(dto: { name: string; description?: string; street: string; city: string; zipCode: string; country: string; sectorId: string; email: string; phone: string }) {
        const sector = await this.sectorRepo.findById(dto.sectorId);

        const contact = ContactVO.create(dto.email, dto.phone);
        const address = AddressVO.create(dto.street, dto.city, dto.zipCode, dto.country);

        if (!sector) throw new Error('Sector not found');

        const provider = new ServiceProvider(
            dto.name,
            dto.sectorId,
            contact,   // ✅ VO, not string
            address,   // ✅ VO, not string
            // dto.description
        );        return await this.serviceProviderRepo.save(provider);
    }
}