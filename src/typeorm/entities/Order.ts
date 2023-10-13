import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
// @Entity({ name: 'suppliers' }) // setting the table name explicitly
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderNo: string;

  @Column()
  deliverDate: Date;

  //Todo connect suppliers table
  @Column()
  supllier: string;

  //Todo connect items table
  @Column()
  item: string;

  @Column()
  qty: number;

  @Column({ nullable: true, default: 'pending' })
  supplierstatus: string;

  @Column({ nullable: true, default: 'pending' })
  managerstatus: string;

  @Column()
  createdAt: Date;
}
