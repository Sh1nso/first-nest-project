import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  description: string;
}
