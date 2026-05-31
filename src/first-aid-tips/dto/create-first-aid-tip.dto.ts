import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFirstAidTipDto {
  @IsUUID()
  category_id!: string;

  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}