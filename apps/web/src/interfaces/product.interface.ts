export interface IProduct {
  id: string;
  name: string;
  type: string;
  price: number;
  pages: number;
}

export interface IFilterProduct {
  keyword?: string;
  page?: number;
  size?: number;
  userId?: string;
  type?: string;
}

export interface IResultProduct {
  products: IProduct[];
  pages: number;
}
