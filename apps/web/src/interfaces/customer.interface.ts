export interface ICustomer {
  email: string;
  name: string;
  type: string;
  address: string;
  createdBy: string;
  customerEmail: string;
  pages: number;
}

export interface IFilterCustomer {
  keyword?: string;
  page?: number;
  size?: number;
  userId?: string;
}

export interface IResultCustomer {
  customers: ICustomer[];
  pages: number;
}
