import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/typeorm/entities/Supplier';
import {
  CreateSupplierParams,
  UpdateSupplierParams,
} from 'src/utils/SupplierTypes';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  findSuppliers() {
    return this.supplierRepository.find();
  }

  createSupplier(supplierDetails: CreateSupplierParams) {
    const newSupplier = this.supplierRepository.create({
      ...supplierDetails,
      createdAt: new Date(),
    });
    return this.supplierRepository.save(newSupplier); // async, so return the promise and wait
  }

  async updateSupplier(
    id,
    updateSupplierDetails: UpdateSupplierParams,
  ): Promise<Supplier> {
    const existingSupplier = await this.supplierRepository.findOneBy({ id });
    if (!existingSupplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    const updatedSupplier = { ...existingSupplier, ...updateSupplierDetails };
    await this.supplierRepository.save(updatedSupplier);
    return updatedSupplier;
  }

  async deleteSupplier(id): Promise<Supplier> {
    const deletedSupplier = await this.supplierRepository.findOneBy({ id });
    if (!deletedSupplier) {
      throw new NotFoundException('Supplier not found');
    }
    await this.supplierRepository.delete({ id });
    return deletedSupplier;
  }
}
