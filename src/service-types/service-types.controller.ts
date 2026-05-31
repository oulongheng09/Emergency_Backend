import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { ServiceTypesService } from './service-types.service';

@Controller('service-types')
export class ServiceTypesController {
  constructor(
    private readonly serviceTypesService: ServiceTypesService,
  ) {}

  @Get()
  findAll() {
    return this.serviceTypesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.serviceTypesService.findOne(id);
  }
}