// first-aid-tip.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FirstAidCategory } from '../../first-aid-categories/entities/first-aid-category.entity';

@Entity('first_aid_tips')
export class FirstAidTip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category_id: string;

  @ManyToOne(
    () => FirstAidCategory,
    (category) => category.tips,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'category_id' })
  category: FirstAidCategory;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  display_order: number;

  @Column('text', { nullable: true })
  image_url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}