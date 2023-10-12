export type CreateSupplierParams = {
  name: string;
  description: string;
  address: string;
  contractStart: Date;
  contractEnd: Date;
  contact: string;
};

export type UpdateSupplierParams = {
  name: string;
  description: string;
  address: string;
  contractStart: Date;
  contractEnd: Date;
  contact: string;
};
