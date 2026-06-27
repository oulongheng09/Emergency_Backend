import { Controller, Get, Param, Query } from '@nestjs/common';

import { FirstAidCategoriesService } from './first-aid-categories.service';

@Controller('first-aid-categories')
export class FirstAidCategoriesController {
  constructor(private readonly service: FirstAidCategoriesService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.service.findAll(lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }
}
