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
import { CreateItemDto } from 'src/items/dtos/CreateItem.dto';
import { CreateOrderDto } from 'src/orders/dtos/CreateOrder.dto';
import { UpdateOrderDto } from 'src/orders/dtos/UpdateOrder.dto';
import { OrdersService } from 'src/orders/services/orders/orders.service';
// import { CreateSupplierDto } from 'src/suppliers/dtos/CreateSupplier.dto';
import { Order } from 'src/typeorm/entities/Order';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  async getOrders() {
    return this.orderService.findOrders();
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  // @Post(':id/suppliers')
  // createSupplier(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() createSupplierDto: CreateSupplierDto,
  // ) {
  //   return this.orderService.createSupplier(id, createSupplierDto);
  // }

  @Post(':id/items')
  createOrderItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() createItemsmDto: CreateItemDto,
  ) {
    return this.orderService.createOrderItems(id, createItemsmDto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.deleteOrder(id);
  }
}
