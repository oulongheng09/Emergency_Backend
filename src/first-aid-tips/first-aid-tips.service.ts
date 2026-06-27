import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FirstAidTip } from './entities/first-aid-tip.entity';

@Injectable()
export class FirstAidTipsService {
  constructor(
    @InjectRepository(FirstAidTip)
    private readonly repository: Repository<FirstAidTip>,
  ) {}

  async findAll(lang?: string): Promise<FirstAidTip[]> {
    const tips = await this.repository.find({
      relations: { category: true },
      order: { title: 'ASC' },
    });

    return tips.map((tip) => this.localizeTip(tip, lang));
  }

  async findOne(id: string, lang?: string): Promise<FirstAidTip> {
    const tip = await this.repository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!tip) {
      throw new NotFoundException('First aid tip not found');
    }

    return this.localizeTip(tip, lang);
  }

  async findByCategory(
    categoryId: string,
    lang?: string,
  ): Promise<FirstAidTip[]> {
    const tips = await this.repository.find({
      where: { category_id: categoryId },
      relations: { category: true },
      order: { title: 'ASC' },
    });

    return tips.map((tip) => this.localizeTip(tip, lang));
  }

  private localizeTip(tip: FirstAidTip, lang?: string): FirstAidTip {
    const isKhmer = lang?.toLowerCase() === 'km';
    return {
      ...tip,
      title: isKhmer && tip.title_km ? tip.title_km : tip.title,
      content: isKhmer && tip.content_km ? tip.content_km : tip.content,
    };
  }
}
