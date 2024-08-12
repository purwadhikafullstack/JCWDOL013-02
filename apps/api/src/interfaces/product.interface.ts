import { Item } from '@prisma/client';

export interface IProduct {
  id?: string;
  type?: string;
  userId: string;
  price?: number;
  name: string;
}

export interface IFilterProduct {
  userId?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface IResultProduct {
  items: Item[];
  pages: number;
}
