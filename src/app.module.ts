import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './typeorm/entities/Supplier';
import { Item } from './typeorm/entities/Item';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ItemsModule } from './items/items.module';
import 'dotenv/config';
import { Order } from './typeorm/entities/Order';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DEFAULT_SCHEMA,
      entities: [Supplier, Item, Order],
      synchronize: true, // every single time we do a modification, then this automatically updates
    }),
    SuppliersModule,
    ItemsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
