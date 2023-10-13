export type CreateInvoiceParams = {
  OrderId: string;
  supplierId: string;
  amount: number;
  createdAt: Date;
};

export type UpdateInvoiceParams = {
  OrderId: string;
  supplierId: string;
  amount: number;
  createdAt: Date;
};
