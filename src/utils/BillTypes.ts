export type CreateBillParams = {
  OrderId: string;
  amount: number;
  status: string;
  PaidAt: Date;
  createdAt: Date;
};

export type UpdateBillParams = {
  OrderId: string;
  amount: number;
  status: string;
  PaidAt: Date;
  createdAt: Date;
};
