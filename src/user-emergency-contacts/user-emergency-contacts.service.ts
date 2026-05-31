import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserEmergencyContactDto } from './dto/create-user-emergency-contact.dto';
import { UpdateUserEmergencyContactDto } from './dto/update-user-emergency-contact.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { UserEmergencyContact } from './entities/user-emergency-contact.entity';

@Injectable()
export class UserEmergencyContactsService {
  constructor(
  @InjectRepository(UserEmergencyContact)
  private readonly contactRepo:Repository<UserEmergencyContact>,

  @InjectRepository(User)
  private readonly userRepo:Repository<User>) {}

  async create(dto: CreateUserEmergencyContactDto) {
    const user = await this.userRepo.findOne({where: {id: dto.user_id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const contact = this.contactRepo.create(dto);
    return this.contactRepo.save(contact);
  }

  async findAll() {
    return this.contactRepo.find({
      order: {created_at: 'DESC'},
    });
  }

  async findByUser(userId: string) {
    return this.contactRepo.find({
      where: {user_id: userId},
      order: {created_at: 'DESC'},
    });
  }

  async update(id: string, dto: UpdateUserEmergencyContactDto) {
    const contact = await this.contactRepo.findOne({where: { id }});

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    Object.assign(contact, dto);
    return this.contactRepo.save(contact);
  }

  async remove(id: string) {
    const contact = await this.contactRepo.findOne({where: { id }});

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    await this.contactRepo.remove(contact);
    return {message:'Emergency contact deleted successfully'};
  }
}
