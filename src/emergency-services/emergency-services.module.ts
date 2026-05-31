import { Module } from '@nestjs/common';
import { EmergencyServicesService } from './emergency-services.service';
import { EmergencyServicesController } from './emergency-services.controller';
import { EmergencyService } from './entities/emergency-service.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ServiceType } from 'src/service-types/entities/service-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyService, ServiceType])],
  controllers: [EmergencyServicesController],
  providers: [EmergencyServicesService],
})
export class EmergencyServicesModule {}
