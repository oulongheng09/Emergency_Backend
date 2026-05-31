import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEmergencyContactDto } from './create-user-emergency-contact.dto';

export class UpdateUserEmergencyContactDto extends PartialType(CreateUserEmergencyContactDto) {}
