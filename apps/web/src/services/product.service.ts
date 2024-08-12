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
  size = 1000,
  userId = '',
}: IFilterProduct) => {
  try {
    const { data } = await instance.get<IResultProduct>(`/products/${userId}`, {
      params: {
        keyword,
        page,
        size,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};
