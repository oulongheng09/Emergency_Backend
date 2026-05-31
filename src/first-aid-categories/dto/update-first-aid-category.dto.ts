import { PartialType } from '@nestjs/mapped-types';
import { CreateFirstAidCategoryDto } from './create-first-aid-category.dto';

export class UpdateFirstAidCategoryDto extends PartialType(CreateFirstAidCategoryDto) {}
