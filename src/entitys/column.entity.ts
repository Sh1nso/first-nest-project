import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class contentColumn {
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'column_id',
      })
      id: number

      @Column({
        nullable: false
      })
      name: string

      @Column()
      description: string

      @ManyToOne(() => User, (user) => user.columns, {onDelete: 'SET NULL'})
      user: User
}