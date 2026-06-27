import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirstAidCategory } from './entities/first-aid-category.entity';

@Injectable()
export class FirstAidCategoriesService {
  constructor(
    @InjectRepository(FirstAidCategory)
    private readonly repository: Repository<FirstAidCategory>,
  ) {}

  async findAll(lang?: string): Promise<FirstAidCategory[]> {
    const categories = await this.repository.find({
      order: { name: 'ASC' },
    });

    return categories.map((category) => this.localizeCategory(category, lang));
  }

  async findOne(id: string, lang?: string): Promise<FirstAidCategory> {
    const category = await this.repository.findOne({
      where: { id },
      relations: { tips: true },
      order: {
        tips: {
          display_order: 'ASC',
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.localizeCategory(category, lang, true);
  }

  private localizeCategory(
    category: FirstAidCategory,
    lang?: string,
    includeTips = false,
  ): FirstAidCategory {
    const isKhmer = lang?.toLowerCase() === 'km';
    const localized = {
      ...category,
      name: isKhmer && category.name_km ? category.name_km : category.name,
    } as FirstAidCategory;

    if (includeTips && category.tips) {
      localized.tips = category.tips.map((tip) => ({
        ...tip,
        title: isKhmer && tip.title_km ? tip.title_km : tip.title,
        content: isKhmer && tip.content_km ? tip.content_km : tip.content,
      }));
    }

    return localized;
  }
}
