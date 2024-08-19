import { IFilterProduct, IResultProduct } from '@/interfaces/product.interface';
import instance from '@/utils/axiosInstance';

export const createProduct = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/products', formData, config);
    const product = data?.data;
    return product;
  } catch (err) {
    console.error(err);
  }
};

export const getProductsByUserID = async ({
  keyword = '',
  page = 1,
  type = '',
}: IFilterProduct) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    const { data } = await instance.get<IResultProduct>(`/products/${userId}`, {
      params: {
        keyword,
        page,
        type,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getProductByID = async (id: string) => {
  try {
    const response = await instance.get(`/products/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  formData: {
    name: string;
    price: number;
    type: string;
  },
) => {
  try {
    const response = await instance.put(`/products/product/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
};
