import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from '../../services/items/items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTodo', () => {
    it('should create a new item', async () => {
      const createItemDto = {
        itemName: 'New Item',
        restricted: false,
        description: 'A new item description',
        price: 10,
        imageUrl: 'item.jpg',
      };

      const createdItem = {
        id: 1,
        ...createItemDto,
        createdAt: new Date(),
      };

      jest.spyOn(itemsService, 'createItem').mockResolvedValue(createdItem);

      const result = await controller.createTodo(createItemDto);
      expect(result).toEqual(createdItem);
    });

    it('should handle errors during item creation', async () => {
      const createItemDto = {
        itemName: 'New Item',
        restricted: false,
        description: 'A new item description',
        price: 10,
        imageUrl: 'item.jpg',
      };

      jest
        .spyOn(itemsService, 'createItem')
        .mockRejectedValue(new Error('Item creation failed'));

      await expect(controller.createTodo(createItemDto)).rejects.toThrowError(
        'Item creation failed',
      );
    });
  });

  describe('updateItem', () => {
    it('should update an item', async () => {
      const itemId = 1;
      const updateItemDto = {
        itemName: 'Updated Item',
        restricted: true,
        description: 'Updated description',
        price: 20,
        imageUrl: 'updated-item.jpg',
      };

      const updatedItem = {
        id: itemId,
        ...updateItemDto,
        createdAt: new Date(),
      };

      jest.spyOn(itemsService, 'updateItem').mockResolvedValue(updatedItem);

      const result = await controller.updateItem(itemId, updateItemDto);
      expect(result).toEqual(updatedItem);
    });

    it('should handle errors during item update', async () => {
      const itemId = 1;
      const updateItemDto = {
        itemName: 'Updated Item',
        restricted: true,
        description: 'Updated description',
        price: 20,
        imageUrl: 'updated-item.jpg',
      };

      jest
        .spyOn(itemsService, 'updateItem')
        .mockRejectedValue(new Error('Item update failed'));

      await expect(
        controller.updateItem(itemId, updateItemDto),
      ).rejects.toThrowError('Item update failed');
    });

    it('should handle updating a non-existing item', async () => {
      const itemId = 999;
      const updateItemDto = {
        itemName: 'Updated Item',
        restricted: true,
        description: 'Updated description',
        price: 20,
        imageUrl: 'updated-item.jpg',
      };

      jest.spyOn(itemsService, 'updateItem').mockResolvedValue(null);

      const result = await controller.updateItem(itemId, updateItemDto);
      expect(result).toBeNull();
    });
  });
});
