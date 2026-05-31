// first-aid-category.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { FirstAidTip } from '../../first-aid-tips/entities/first-aid-tip.entity';

@Entity('first_aid_categories')
export class FirstAidCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => FirstAidTip,(tip) => tip.category)
    tips: FirstAidTip[];
}