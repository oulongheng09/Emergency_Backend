import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmergencyServicesService } from './emergency-services.service';

@Controller('emergency-services')
export class EmergencyServicesController {
  constructor(
    private readonly service: EmergencyServicesService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('nearby')
  findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string) {
    return this.service.findNearby(Number(lat),Number(lng));
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.service.findOne(id);
  }
}
