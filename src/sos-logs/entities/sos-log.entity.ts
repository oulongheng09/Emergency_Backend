// sos-log.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EmergencyService } from '../../emergency-services/entities/emergency-service.entity';

@Entity('sos_logs')
export class SosLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  service_id: string;

  @ManyToOne(() => User, (user) => user.sosLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => EmergencyService,(service) => service.sosLogs)

  @JoinColumn({ name: 'service_id' })
  service: EmergencyService;

  @Column('decimal', {
    precision: 10,
    scale: 7,
    nullable: true,
  })
  user_latitude: number;

  @Column('decimal', {
    precision: 10,
    scale: 7,
    nullable: true,
  })
  user_longitude: number;

  @CreateDateColumn()
  created_at: Date;
}