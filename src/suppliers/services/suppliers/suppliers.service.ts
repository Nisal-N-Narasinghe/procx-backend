import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Supplier } from 'src/typeorm/entities/Supplier';
import { CreateOrderParams } from 'src/utils/OrderTypes';
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
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findSuppliers() {
    return this.supplierRepository.find({ relations: ['orders'] });
  }

  async findSupplierById(id: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    return supplier;
  }

  createSupplier(supplierDetails: CreateSupplierParams) {
    const newSupplier = this.supplierRepository.create({
      ...supplierDetails,
      createdAt: new Date(),
    });
    return this.supplierRepository.save(newSupplier); // async, so return the promise and wait
  }

  async assignOrders(id: number, ordersDetails: CreateOrderParams) {
    const supplier = await this.supplierRepository.findOneBy({ id });
    if (!supplier) {
      throw new HttpException(
        `Supplier with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newOrder = this.orderRepository.create({
      ...ordersDetails,
      supplier,
      createdAt: new Date(),
    });
    return this.orderRepository.save(newOrder);
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
