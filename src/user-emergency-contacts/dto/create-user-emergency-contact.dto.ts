import {
  IsUUID,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreateUserEmergencyContactDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @MaxLength(100)
  name!: string;

  @IsNumber()
  phone_number!: number;

  @IsString()
  relationship!: string;
}