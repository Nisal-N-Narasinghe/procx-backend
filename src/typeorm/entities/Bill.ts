import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bills' })
// @Entity({ name: 'suppliers' }) // setting the table name explicitly
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  //Todo connect orders table
  @Column()
  OrderId: string;

  @Column()
  amount: number;

  @Column({ nullable: true, default: 'pending' })
  status: string;

  @Column({
    default: () => "STR_TO_DATE('00-00-0000', '%d-%m-%Y')",
    nullable: true,
  })
  PaidAt: Date;

  @Column()
  createdAt: Date;
}
