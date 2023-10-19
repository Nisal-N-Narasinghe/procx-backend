import { Supplier } from './Supplier';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
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

  @ManyToOne(() => Supplier, (supplier) => supplier.orders)
  supplier: Supplier;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @Column({ nullable: true, default: 'pending' })
  supplierstatus: string;

  @Column({ nullable: true, default: 'pending' })
  managerstatus: string;

  @Column({ nullable: true, default: 'pending' })
  orderStatus: string;

  @Column()
  createdAt: Date;
}
