import { UpdateItemDto } from 'src/items/dtos/UpdateItem.dto';
import { CreateItemDto } from './../../dtos/CreateItem.dto';
import { ItemsService } from './../../services/items/items.service';
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

import { Item } from 'src/typeorm/entities/Item';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Get()
  async getItems() {
    return this.itemService.findItem();
  }

  @Post()
  createTodo(@Body() CreateItemDto: CreateItemDto) {
    return this.itemService.createItem(CreateItemDto);
  }

  @Put(':id')
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.itemService.updateItem(id, UpdateItemDto);
  }

  @Delete(':id')
  async deleteItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return await this.itemService.deleteItem(id);
  }
}
