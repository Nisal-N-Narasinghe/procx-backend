import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
