import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEmergencyContact } from '../../user-emergency-contacts/entities/user-emergency-contact.entity';
import { SosLog } from '../../sos-logs/entities/sos-log.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    full_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    blood_group: string;

    @Column({ type: 'text', nullable: true })
    allergies: string;

    @Column({ default: 'English' })
    language: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => UserEmergencyContact, (contact) => contact.user)
    emergencyContacts: UserEmergencyContact[];

    @OneToMany(() => SosLog, (sos) => sos.user)
    sosLogs: SosLog[];
}