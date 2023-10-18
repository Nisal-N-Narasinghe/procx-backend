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
import { CreateSupplierDto } from 'src/suppliers/dtos/CreateSupplier.dto';
import { UpdateSupplierDto } from 'src/suppliers/dtos/UpdateSupplier.dto';
import { SuppliersService } from 'src/suppliers/services/suppliers/suppliers.service';
import { Supplier } from 'src/typeorm/entities/Supplier';

@Controller('suppliers')
export class SuppliersController {
  constructor(private supplierService: SuppliersService) {}

  @Get()
  async getSuppliers() {
    return this.supplierService.findSuppliers();
  }

  @Get(':id')
  async getSupplieryId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Supplier> {
    return this.supplierService.findSupplierById(id);
  }
  @Post()
  createTodo(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Post(':id/orders')
  assignOrders(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.supplierService.assignOrders(id, createOrderDto);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.supplierService.updateSupplier(id, updateSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Supplier> {
    return await this.supplierService.deleteSupplier(id);
  }
}
