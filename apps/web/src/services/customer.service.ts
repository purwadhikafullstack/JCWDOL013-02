import {
  IFilterCustomer,
  IResultCustomer,
} from '@/interfaces/customer.interface';
import instance from '@/utils/axiosInstance';

export const createCustomer = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/customers', formData, config);
    const customer = data?.data;
    return customer;
  } catch (err) {
    console.error(err);
  }
};

export const getCustomersByUserID = async ({
  keyword = '',
  page = 1,
  size = 1000,
  userId = '',
}: IFilterCustomer) => {
  try {
    const { data } = await instance.get<IResultCustomer>(
      `/customers/${userId}`,
      {
        params: {
          keyword,
          page,
          size,
        },
      },
    );

    return data;
  } catch (err) {
    console.error(err);
  }
};
