import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';

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

  @Column({ nullable: true })
  qty: number;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;
}
