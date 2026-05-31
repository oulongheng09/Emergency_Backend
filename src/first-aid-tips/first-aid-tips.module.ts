import { Module } from '@nestjs/common';
import { FirstAidTipsService } from './first-aid-tips.service';
import { FirstAidTipsController } from './first-aid-tips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstAidTip } from './entities/first-aid-tip.entity';
import { FirstAidCategory } from 'src/first-aid-categories/entities/first-aid-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FirstAidTip, FirstAidCategory])],
  controllers: [FirstAidTipsController],
  providers: [FirstAidTipsService],
})
export class FirstAidTipsModule {}
