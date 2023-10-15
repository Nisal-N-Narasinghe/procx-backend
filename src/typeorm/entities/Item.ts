import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  restricted: boolean;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;
}
