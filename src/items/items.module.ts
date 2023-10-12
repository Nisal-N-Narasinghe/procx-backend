import { Module } from '@nestjs/common';
import { ItemsController } from './controllers/items/items.controller';
import { ItemsService } from './services/items/items.service';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
