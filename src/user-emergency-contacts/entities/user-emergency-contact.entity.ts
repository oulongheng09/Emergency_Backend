import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('user_emergency_contacts')
export class UserEmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User, (user) => user.emergencyContacts, {
        onDelete: 'CASCADE',
    })

    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    name: string;

    @Column()
    phone_number: number;

    @Column()
    relationship: string;

    @CreateDateColumn()
    created_at: Date;
}