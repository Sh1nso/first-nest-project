import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { contentColumn } from './column.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number | string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
    unique: true
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
  sex: string

  @OneToMany(() => contentColumn, (column) => column.user, {onDelete: 'CASCADE'})
  columns: contentColumn[]
}