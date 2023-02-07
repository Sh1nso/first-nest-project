import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity()
export class ContentComment {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'comment_id',
  })
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: User[`id`];

  @ManyToOne(() => Card, (card) => card.comments, {
    onDelete: 'SET NULL',
  })
  card: Card;

  @Column({ nullable: true })
  cardId: Card[`id`];
}
