import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class ProviderRepository {
    constructor(private readonly prisma: PrismaService) { }


    async findById(id: number): Promise<any> {
        return this.prisma.serviceProvider.findUnique({ where: { id } });
    }

}