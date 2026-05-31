// emergency-service.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceType } from '../../service-types/entities/service-type.entity';
import { SosLog } from '../../sos-logs/entities/sos-log.entity';


@Entity('emergency_services')
export class EmergencyService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    service_type_id: string;

    @ManyToOne(() => ServiceType,(type) => type.services)

    @JoinColumn({ name: 'service_type_id' })
    serviceType: ServiceType;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ type: 'text' })
    address: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column('decimal', { precision: 10, scale: 7 })
    latitude: number;

    @Column('decimal', { precision: 10, scale: 7 })
    longitude: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    opening_hours: string;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => SosLog, (sos) => sos.service)
    sosLogs: SosLog[];
}