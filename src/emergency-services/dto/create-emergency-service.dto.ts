import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmergencyServiceDto {
  @IsUUID()
  service_type_id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  phone_number!: number;

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  province!: string;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  opening_hours?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}