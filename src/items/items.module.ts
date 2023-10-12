import { Module } from '@nestjs/common';
import { ItemsController } from './controllers/items/items.controller';
import { ItemsService } from './services/items/items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Item';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
