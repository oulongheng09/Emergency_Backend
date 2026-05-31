import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FirstAidTip } from './entities/first-aid-tip.entity';

@Injectable()
export class FirstAidTipsService {
  constructor(
    @InjectRepository(FirstAidTip)
    private readonly repository: Repository<FirstAidTip>,
  ) {}

  async findAll(): Promise<FirstAidTip[]> {
    return this.repository.find({
      relations: {category: true},
      order: {title: 'ASC'},
    });
  }

  async findOne(id: string): Promise<FirstAidTip> {
    const tip = await this.repository.findOne({
      where: { id },
      relations: {category: true},
    });

    if (!tip) {
      throw new NotFoundException(
        'First aid tip not found',
      );
    }

    return tip;
  }

  async findByCategory(categoryId: string): Promise<FirstAidTip[]> {
    return this.repository.find({
      where: {category_id: categoryId},
      relations: {category: true},
      order: {title: 'ASC'},
    });
  }
}