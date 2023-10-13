import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bills' })
// @Entity({ name: 'suppliers' }) // setting the table name explicitly
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  //Todo connect orders table
  @Column()
  InvoiceId: string;

  @Column({ nullable: true, default: 'pending' })
  status: string;

  @Column({
    nullable: true,
  })
  PaidAt: Date;

  @Column()
  createdAt: Date;
}
