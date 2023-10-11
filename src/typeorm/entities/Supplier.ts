import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  //TODO: create relation with new supervisor class
  @Column()
  supervisor: string;

  @Column()
  contractStart: Date;

  @Column()
  contractEnd: Date;

  @Column()
  contact: string;

  @Column()
  createdAt: Date;
}
