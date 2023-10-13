export type CreateBillParams = {
  InvoiceId: string;
  status: string;
  PaidAt: Date;
  createdAt: Date;
};

export type UpdateBillParams = {
  InvoiceId: string;
  status: string;
  PaidAt: Date;
  createdAt: Date;
};
