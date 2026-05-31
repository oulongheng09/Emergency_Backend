import {
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateSosLogDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  service_id: string;

  @IsNumber()
  user_latitude: number;

  @IsNumber()
  user_longitude: number;
}