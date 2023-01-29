import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';
import { ContentColumn } from './column.entity';
import { ContentComment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
  })
  sex: string;

  @OneToMany(() => ContentComment, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  @OneToMany(() => ContentColumn, (column) => column.user, {
    onDelete: 'CASCADE',
  })
  columns: ContentColumn[];

  @OneToMany(() => Card, (card) => card.user, {
    onDelete: 'CASCADE',
  })
  cards: Card[];
}
