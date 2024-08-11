import { IFilterCustomer } from '@/interfaces/customer.interface';
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

// export const getCustomers = async ({
//   keyword = '',
//   page = 1,
//   size = 10,
// }: IFilterCustomer) => {
//   try {
//     const { data } = await instance.get(
//       `/users?keyword=${keyword}&page=${page}&size=${size}`,
//     );
//     const users = data?.data;
//     return users;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const getCustomersByUserID = async (userId: any) => {
//   try {
//     const { data } = await instance.get(`/customers/${userId}`);
//     const user = data?.data;
//     return user;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getCustomersByUserID = async ({
  keyword = '',
  page = 1,
  size = 10,
  userId = '',
}: IFilterCustomer) => {
  try {
    const { data } = await instance.get(
      `/customers/${userId}?keyword=${keyword}&page=${page}&size=${size}`,
    );
    const products = data?.data;
    return products;
  } catch (err) {
    console.error(err);
  }
};
