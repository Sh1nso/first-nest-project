import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Card } from './card.entity';
import { User } from './user.entity';

@Entity()
export class ContentColumn {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'column_id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'SET NULL' })
  user: User;

  @Column({ nullable: true })
  userId: User[`id`];

  @OneToMany(() => Card, (card) => card.column, {
    onDelete: 'CASCADE',
  })
  cards: Card[];
}
