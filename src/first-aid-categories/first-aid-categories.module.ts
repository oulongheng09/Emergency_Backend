import { Module } from '@nestjs/common';
import { FirstAidCategoriesService } from './first-aid-categories.service';
import { FirstAidCategoriesController } from './first-aid-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstAidCategory } from './entities/first-aid-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FirstAidCategory])],
  controllers: [FirstAidCategoriesController],
  providers: [FirstAidCategoriesService],
})
export class FirstAidCategoriesModule {}
