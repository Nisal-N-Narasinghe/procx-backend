import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/typeorm/entities/Bill';
import { CreateBillParams, UpdateBillParams } from 'src/utils/BillTypes';
import { Repository } from 'typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

  findBill() {
    return this.billRepository.find();
  }

  createBill(billDetails: CreateBillParams) {
    const newBill = this.billRepository.create({
      ...billDetails,
      createdAt: new Date(),
    });
    return this.billRepository.save(newBill); // async, so return the promise and wait
  }

  async updateBill(id, updateBillDetails: UpdateBillParams): Promise<Bill> {
    const existingBill = await this.billRepository.findOneBy({ id });
    if (!existingBill) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
    const updatedBill = { ...existingBill, ...updateBillDetails };
    await this.billRepository.save(updatedBill);
    return updatedBill;
  }

  async deleteBill(id): Promise<Bill> {
    const deletedBill = await this.billRepository.findOneBy({ id });
    if (!deletedBill) {
      throw new NotFoundException('Bill not found');
    }
    await this.billRepository.delete({ id });
    return deletedBill;
  }
}
