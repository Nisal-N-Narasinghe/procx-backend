import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices/invoices.controller';
import { InvoicesService } from './services/invoices/invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
