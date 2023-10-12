import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
import { UpdateOrderDto } from 'src/orders/dtos/UpdateOrder.dto';
import { OrdersService } from 'src/orders/services/orders/orders.service';
import { Order } from 'src/typeorm/entities/Order';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  async getSuppliers() {
    return this.orderService.findOrders();
  }

  @Post()
  createTodo(@Body() createSupplierDto: CreateOrderDto) {
    return this.orderService.createOrder(createSupplierDto);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.deleteOrder(id);
  }
}
