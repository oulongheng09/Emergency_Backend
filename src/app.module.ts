import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SosLogsModule } from './sos-logs/sos-logs.module';
import { FirstAidTipsModule } from './first-aid-tips/first-aid-tips.module';
import { FirstAidCategoriesModule } from './first-aid-categories/first-aid-categories.module';
import { UserEmergencyContactsModule } from './user-emergency-contacts/user-emergency-contacts.module';
import { EmergencyServicesModule } from './emergency-services/emergency-services.module';
import { ServiceTypesModule } from './service-types/service-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      type: 'postgres',
      url: config.get('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
}),
    UsersModule,
    ServiceTypesModule,
    EmergencyServicesModule,
    UserEmergencyContactsModule,
    FirstAidCategoriesModule,
    FirstAidTipsModule,
    SosLogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
