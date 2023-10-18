import { Module } from '@nestjs/common';
import { SuppliersController } from './controllers/suppliers/suppliers.controller';
import { SuppliersService } from './services/suppliers/suppliers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/typeorm/entities/Supplier';
import { Order } from 'src/typeorm/entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Order])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
