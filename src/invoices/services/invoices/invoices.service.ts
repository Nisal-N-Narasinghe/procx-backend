import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';
import {
  CreateInvoiceParams,
  UpdateInvoiceParams,
} from 'src/utils/InvoiceTypes';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  findInvoice() {
    return this.invoiceRepository.find();
  }

  createInvoice(invoiceDetails: CreateInvoiceParams) {
    const newInvoice = this.invoiceRepository.create({
      ...invoiceDetails,
      createdAt: new Date(),
    });
    return this.invoiceRepository.save(newInvoice); // async, so return the promise and wait
  }

  async updateInvoice(
    id,
    updateInvoiceDetails: UpdateInvoiceParams,
  ): Promise<Invoice> {
    const existingInvoice = await this.invoiceRepository.findOneBy({ id });
    if (!existingInvoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    const updatedInvoice = { ...existingInvoice, ...updateInvoiceDetails };
    await this.invoiceRepository.save(updatedInvoice);
    return updatedInvoice;
  }

  async deleteInvoice(id): Promise<Invoice> {
    const deletedInvoice = await this.invoiceRepository.findOneBy({ id });
    if (!deletedInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    await this.invoiceRepository.delete({ id });
    return deletedInvoice;
  }
}
