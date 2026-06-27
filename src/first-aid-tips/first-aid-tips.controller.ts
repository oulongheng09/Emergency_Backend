import { Controller, Get, Param, Query } from '@nestjs/common';

import { FirstAidTipsService } from './first-aid-tips.service';

@Controller('first-aid-tips')
export class FirstAidTipsController {
  constructor(private readonly service: FirstAidTipsService) {}

  @Get()
  findAll(@Query('lang') lang?: string) {
    return this.service.findAll(lang);
  }

  @Get('category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query('lang') lang?: string,
  ) {
    return this.service.findByCategory(categoryId, lang);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang?: string) {
    return this.service.findOne(id, lang);
  }
}
