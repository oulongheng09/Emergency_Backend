import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    full_name!: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsNumber()
    phone_number!: number;

    @IsOptional()
    @IsString()
    blood_group?: string;

    @IsOptional()
    @IsString()
    allergies?: string;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsString()
    address?: string;
}