import { Invoice } from '@prisma/client';

export interface IInvoice {
  id?: string;
  invoiceNumber?: string;
  status: string;
  invoiceDate?: Date;
  dueDate?: Date;
  termsCondition: string;
  userId: string;
  itemId: string;
  quantity: number;
  deletedAt?: Date;
  totalPrice: number;
  tax: number;
  customerEmail: string;
  customerName: string;
  customerId: string;
}

export interface IFilterInvoice {
  userId?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultInvoice {
  invoice: Invoice[];
  pages: number;
}
