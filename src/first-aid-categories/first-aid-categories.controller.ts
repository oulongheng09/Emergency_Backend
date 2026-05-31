import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { FirstAidCategoriesService } from './first-aid-categories.service';

@Controller('first-aid-categories')
export class FirstAidCategoriesController {
  constructor(
    private readonly service: FirstAidCategoriesService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.service.findOne(id);
  }
}