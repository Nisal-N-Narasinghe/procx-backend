import { Module } from '@nestjs/common';
import { BillsController } from './controllers/bills/bills.controller';
import { BillsService } from './services/bills/bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/typeorm/entities/Bill';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
