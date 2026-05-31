import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmergencyService } from './entities/emergency-service.entity';

@Injectable()
export class EmergencyServicesService {
  constructor(
    @InjectRepository(EmergencyService)
    private readonly emergencyRepo: Repository<EmergencyService>,
  ) {}

  async findAll(): Promise<EmergencyService[]> {
    return this.emergencyRepo.find({
      where: {is_active: true},
      relations: {serviceType: true},
      order: {name: 'ASC'},
    });
  }

  async findOne(id: string): Promise<EmergencyService> {
    const service =
      await this.emergencyRepo.findOne({
        where: { id },
        relations: {serviceType: true, sosLogs: true},
      });

    if (!service) {
      throw new NotFoundException(
        'Emergency service not found',
      );
    }
    return service;
  }

  async findNearby(
  latitude: number,
  longitude: number,
) {
  const services = await this.emergencyRepo.find({
    where: {
      is_active: true,
    },
    relations: {
      serviceType: true,
    },
  });

  const result = services.map((service) => {
    const distance = this.calculateDistance(
      latitude,
      longitude,
      Number(service.latitude),
      Number(service.longitude),
    );
    return {
      ...service,
      distance,
    };
  });
  return result
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * 
              Math.sin(dLat / 2) +
              Math.cos((lat1 * Math.PI) / 180) *
              Math.cos((lat2 * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);

    const c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2));
  }
}