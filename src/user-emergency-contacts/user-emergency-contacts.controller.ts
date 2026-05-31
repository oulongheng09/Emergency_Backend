import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEmergencyContactsService } from './user-emergency-contacts.service';
import { CreateUserEmergencyContactDto } from './dto/create-user-emergency-contact.dto';
import { UpdateUserEmergencyContactDto } from './dto/update-user-emergency-contact.dto';

@Controller('user-emergency-contacts')
export class UserEmergencyContactsController {
  constructor(
    private readonly service:UserEmergencyContactsService) {}

  @Post()
  create(@Body() dto: CreateUserEmergencyContactDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserEmergencyContactDto) {
    return this.service.update(id,dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}