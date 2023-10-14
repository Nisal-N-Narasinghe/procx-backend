import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  //Todo connect orders table
  @Column()
  OrderId: string;

  //Todo connect suppliers table
  @Column()
  supplierId: string;

  @Column()
  amount: number;

  @Column()
  createdAt: Date;
}
