import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/typeorm/entities/Item';
import { CreateItemParams, UpdateItemParams } from 'src/utils/ItemTypes';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  findItem() {
    return this.itemRepository.find({ relations: ['order'] });
  }

  async findItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    return item;
  }

  createItem(itemDetails: CreateItemParams) {
    if (!itemDetails.itemName) {
      throw new BadRequestException('Item Name is required field');
    }
    if (!itemDetails.description) {
      throw new BadRequestException('Description is required field');
    }
    if (!itemDetails.imageUrl) {
      throw new BadRequestException('Image is required field');
    }
    if (!itemDetails.restricted) {
      throw new BadRequestException('Restriction is required field');
    } else {
      const newItem = this.itemRepository.create({
        ...itemDetails,
        createdAt: new Date(),
      });

      return this.itemRepository.save(newItem); // async, so return the promise and wait
    }
  }

  async updateItem(id, updateItemDetails: UpdateItemParams): Promise<Item> {
    const existingItem = await this.itemRepository.findOneBy({ id });
    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    const updatedItem = { ...existingItem, ...updateItemDetails };
    await this.itemRepository.save(updatedItem);
    return updatedItem;
  }

  async deleteItem(id): Promise<Item> {
    const deletedItem = await this.itemRepository.findOneBy({ id });
    if (!deletedItem) {
      throw new NotFoundException('Item not found');
    }
    await this.itemRepository.delete({ id });
    return deletedItem;
  }
}
