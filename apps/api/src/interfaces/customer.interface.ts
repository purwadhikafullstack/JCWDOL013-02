import { Customer, User } from '@prisma/client';

export interface ICustomer {
  id?: string;
  name?: string;
  customerEmail?: string;
  type?: string;
  address?: string;
  userId: string;
  paymentMethods: string;
  deletedAt: Date;
}

export interface IFilterCustomer {
  userId?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultCustomer {
  customers: Customer[];
  pages: number;
}
