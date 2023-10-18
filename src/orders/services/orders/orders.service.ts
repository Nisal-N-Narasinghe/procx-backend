import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { Supplier } from 'src/typeorm/entities/Supplier';
import { CreateOrderParams, UpdateOrderParams } from 'src/utils/OrderTypes';
import { CreateSupplierParams } from 'src/utils/SupplierTypes';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  findOrders() {
    return this.orderRepository.find({ relations: ['supplier'] });
  }

  createOrder(orderDetails: CreateOrderParams) {
    const newOrder = this.orderRepository.create({
      ...orderDetails,
      createdAt: new Date(),
    });
    return this.orderRepository.save(newOrder); // async, so return the promise and wait
  }

  async createSupplier(id: number, supplierDetails: CreateSupplierParams) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new HttpException(
        `Order with ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newSupplier = this.supplierRepository.create({
      ...supplierDetails,
      createdAt: new Date(),
    });
    const savedSupplier = await this.supplierRepository.save(newSupplier);
    order.supplier = savedSupplier;
    return this.orderRepository.save(order); // async, so return the promise and wait
  }

  async updateOrder(id, UpdateOrderParams: UpdateOrderParams): Promise<Order> {
    const existingOrder = await this.orderRepository.findOneBy({ id });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    const updatedOrder = { ...existingOrder, ...UpdateOrderParams };
    await this.orderRepository.save(updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id): Promise<Order> {
    const deletedOrder = await this.orderRepository.findOneBy({ id });
    if (!deletedOrder) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.delete({ id });
    return deletedOrder;
  }
}
