import { Module } from '@nestjs/common';
import { UserEmergencyContactsService } from './user-emergency-contacts.service';
import { UserEmergencyContactsController } from './user-emergency-contacts.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEmergencyContact } from './entities/user-emergency-contact.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEmergencyContact, User])],
  controllers: [UserEmergencyContactsController],
  providers: [UserEmergencyContactsService],
})
export class UserEmergencyContactsModule {}
