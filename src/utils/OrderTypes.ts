export type CreateOrderParams = {
  orderNo: string;
  deliverDate: Date;
  supllier: string;
  item: string;
  qty: number;
  supplierstatus: string;
  managerstatus: string;
  createdAt: Date;
};

export type UpdateOrderParams = {
  orderNo: string;
  deliverDate: Date;
  supllier: string;
  item: string;
  qty: number;
  supplierstatus: string;
  managerstatus: string;
  createdAt: Date;
};
