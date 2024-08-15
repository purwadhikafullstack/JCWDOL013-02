import { IFilterInvoice, IResultInvoice } from '@/interfaces/invoice.interface';
import instance from '@/utils/axiosInstance';

export const createInvoice = async (formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.post('/invoices', formData, config);
    const invoice = data?.data;
    return invoice;
  } catch (err) {
    console.error(err);
  }
};

export const getInvoicesByUserID = async ({
  keyword = '',
  page = 1,
  startDate = '',
  endDate = '',
  status = '',
}: IFilterInvoice) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    const { data } = await instance.get<IResultInvoice>(`/invoices/${userId}`, {
      params: {
        keyword,
        page,
        startDate,
        endDate,
        status,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};
