import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

@Entity({ name: 'suppliers' })
// @Entity({ name: 'suppliers' }) // setting the table name explicitly
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  contractStart: Date;

  @Column()
  contractEnd: Date;

  @Column()
  contact: string;

  @OneToMany(() => Order, (order) => order.supplier)
  orders: Order[];

  @Column()
  createdAt: Date;
}
