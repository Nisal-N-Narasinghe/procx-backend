import { Supplier } from './Supplier';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Item } from './Item';

@Entity({ name: 'orders' })
// @Entity({ name: 'suppliers' }) // setting the table name explicitly
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNo: string;

  @Column()
  deliverDate: Date;

  @OneToOne(() => Supplier)
  @JoinColumn()
  supplier: Supplier;

  @Column({ nullable: true, default: 'pending' })
  supplierstatus: string;

  @Column({ nullable: true, default: 'pending' })
  managerstatus: string;

  @Column()
  createdAt: Date;
}
