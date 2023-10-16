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

  @Column({ nullable: true })
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;
}
