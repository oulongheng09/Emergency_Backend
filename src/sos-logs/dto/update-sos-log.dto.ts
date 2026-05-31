import { PartialType } from '@nestjs/mapped-types';
import { CreateSosLogDto } from './create-sos-log.dto';

export class UpdateSosLogDto extends PartialType(CreateSosLogDto) {}
