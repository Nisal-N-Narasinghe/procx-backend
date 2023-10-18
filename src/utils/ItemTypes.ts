export type CreateItemParams = {
  itemName: string;
  restricted: boolean;
  description: string;
  price: number;
  qty: number;
  imageUrl: string;
};

export type UpdateItemParams = {
  itemName: string;
  restricted: boolean;
  description: string;
  price: number;
  qty: number;
  imageUrl: string;
};
