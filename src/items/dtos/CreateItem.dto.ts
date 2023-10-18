export class CreateItemDto {
  itemName: string;
  restricted: boolean;
  description: string;
  price: number;
  qty: number;
  imageUrl: string;
}
