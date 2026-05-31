import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirstAidCategory } from './entities/first-aid-category.entity';

@Injectable()
export class FirstAidCategoriesService {
  constructor(
    @InjectRepository(FirstAidCategory)
    private readonly repository: Repository<FirstAidCategory>,
  ) {}

  async findAll(): Promise<FirstAidCategory[]> {
    return this.repository.find({
      order: {name: 'ASC'},
    });
  }

  async findOne(id: string): Promise<FirstAidCategory> {
    const category = await this.repository.findOne({where: { id }, relations: {tips: true}});

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}