import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { FirstAidTipsService } from './first-aid-tips.service';

@Controller('first-aid-tips')
export class FirstAidTipsController {
  constructor(
    private readonly service: FirstAidTipsService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.service.findByCategory(
      categoryId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}