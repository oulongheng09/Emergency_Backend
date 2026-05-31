import { Module } from '@nestjs/common';
import { SosLogsService } from './sos-logs.service';
import { SosLogsController } from './sos-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SosLog } from './entities/sos-log.entity';
import { EmergencyService } from 'src/emergency-services/entities/emergency-service.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SosLog, User, EmergencyService])],
  controllers: [SosLogsController],
  providers: [SosLogsService],
})
export class SosLogsModule {}
