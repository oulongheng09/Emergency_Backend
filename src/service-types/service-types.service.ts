import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from './entities/service-type.entity';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectRepository(ServiceType)
    private readonly repository: Repository<ServiceType>,
  ) {}

  async findAll(): Promise<ServiceType[]> {
    return this.repository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ServiceType> {
    const serviceType = await this.repository.findOne({
      where: { id },
    });

    if (!serviceType) {
      throw new NotFoundException(
        'Service type not found',
      );
    }

    return serviceType;
  }
}