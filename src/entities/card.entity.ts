import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContentColumn } from './column.entity';
import { ContentComment } from './comment.entity';
import { User } from './user.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'card_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  theme: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => ContentColumn, (column) => column.cards, {
    onDelete: 'SET NULL',
  })
  column: ContentColumn;

  @OneToMany(() => ContentComment, (comment) => comment.card, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
