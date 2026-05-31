import { PartialType } from '@nestjs/mapped-types';
import { CreateFirstAidTipDto } from './create-first-aid-tip.dto';

export class UpdateFirstAidTipDto extends PartialType(CreateFirstAidTipDto) {}
