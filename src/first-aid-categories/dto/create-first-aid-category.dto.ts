import { IsString } from 'class-validator';

export class CreateFirstAidCategoryDto {
  @IsString()
  name!: string;

  @IsString()
  icon!: string;
}