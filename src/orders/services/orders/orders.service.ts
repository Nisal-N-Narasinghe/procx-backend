import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { CreateOrderParams, UpdateOrderParams } from 'src/utils/OrderTypes';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  findOrders() {
    return this.orderRepository.find();
  }

  createOrder(orderDetails: CreateOrderParams) {
    const newOrder = this.orderRepository.create({
      ...orderDetails,
      createdAt: new Date(),
    });
    return this.orderRepository.save(newOrder); // async, so return the promise and wait
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
