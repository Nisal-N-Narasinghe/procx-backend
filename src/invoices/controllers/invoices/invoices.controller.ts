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
import { CreateInvoiceDto } from 'src/invoices/dtos/CreateInvoice.dto';
import { UpdateInvoiceDto } from 'src/invoices/dtos/UpdateInvoice.dto';
import { InvoicesService } from 'src/invoices/services/invoices/invoices.service';
import { Invoice } from 'src/typeorm/entities/Invoice';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}

  @Get()
  async getInvoice() {
    return this.invoiceService.findInvoice();
  }

  @Post()
  createInvoice(@Body() CreateInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(CreateInvoiceDto);
  }

  @Put(':id')
  async updateInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoiceService.updateInvoice(id, UpdateInvoiceDto);
  }

  @Delete(':id')
  async deleteInvoice(@Param('id', ParseIntPipe) id: number): Promise<Invoice> {
    return await this.invoiceService.deleteInvoice(id);
  }
}
