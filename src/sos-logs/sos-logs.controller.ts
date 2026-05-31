import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { SosLogsService } from './sos-logs.service';
import { CreateSosLogDto } from './dto/create-sos-log.dto';

@Controller('sos-logs')
export class SosLogsController {
  constructor(
    private readonly service: SosLogsService,
  ) {}

  @Post()
  create(@Body() dto: CreateSosLogDto) {
    return this.service.create(dto);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string,) {
    return this.service.findByUser(userId);
  }
}