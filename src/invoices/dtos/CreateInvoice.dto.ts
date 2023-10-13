export class CreateInvoiceDto {
  OrderId: string;
  supplierId: string;
  amount: number;
  createdAt: Date;
}
