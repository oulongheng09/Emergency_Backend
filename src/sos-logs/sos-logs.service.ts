import {
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SosLog } from './entities/sos-log.entity';
import { User } from '../users/entities/user.entity';
import { EmergencyService } from '../emergency-services/entities/emergency-service.entity'
import { CreateSosLogDto } from './dto/create-sos-log.dto';

@Injectable()
export class SosLogsService {
  constructor(
    @InjectRepository(SosLog)
    private readonly sosRepo: Repository<SosLog>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(EmergencyService)
    private readonly emergencyRepo: Repository<EmergencyService>,
  ) {}

  async create(dto: CreateSosLogDto): Promise<SosLog> {
    const user = await this.userRepo.findOne({ where: { id: dto.user_id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const service = await this.emergencyRepo.findOne({
      where: { id: dto.service_id },
    });

    if (!service) {
      throw new NotFoundException('Emergency service not found');
    }

    const sos = this.sosRepo.create({
      user_id: dto.user_id,
      service_id: dto.service_id,
      latitude: dto.user_latitude,
      longitude: dto.user_longitude,
    });

    return this.sosRepo.save(sos);
  }

  async findByUser(userId: string): Promise<SosLog[]> {
    return this.sosRepo.find({
      where: { user_id: userId },
      relations: {service: true},
      order: {created_at: 'DESC'},
    });
  }
}
