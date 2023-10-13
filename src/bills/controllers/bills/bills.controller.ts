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
import { CreateBillDto } from 'src/bills/dtos/CreateBill.dto';
import { UpdateBillDto } from 'src/bills/dtos/UpdateBill.dto';
import { BillsService } from 'src/bills/services/bills/bills.service';
import { Bill } from 'src/typeorm/entities/Bill';

@Controller('bills')
export class BillsController {
  constructor(private billService: BillsService) {}

  @Get()
  async getBill() {
    return this.billService.findBill();
  }

  @Post()
  createBill(@Body() CreateBillDto: CreateBillDto) {
    return this.billService.createBill(CreateBillDto);
  }

  @Put(':id')
  async updateBill(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateBillDto: UpdateBillDto,
  ): Promise<Bill> {
    return this.billService.updateBill(id, UpdateBillDto);
  }

  @Delete(':id')
  async deleteBill(@Param('id', ParseIntPipe) id: number): Promise<Bill> {
    return await this.billService.deleteBill(id);
  }
}
