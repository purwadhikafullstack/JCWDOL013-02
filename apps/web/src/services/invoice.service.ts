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

export const getInvoiceByID = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.get(`/invoices/invoice/${id}`, config);
    const invoice = data?.data;
    return invoice;
  } catch (err) {
    console.error(err);
  }
};

export const resendInvoice = async (invoiceId: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await instance.post(
      `/invoices/${invoiceId}/resend`,
      config,
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to resend invoice');
  }
};

export const updateInvoice = async (id: string, formData: any) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await instance.patch(
      `/invoices/invoice/${id}`,
      formData,
      config,
    );
    const invoice = data?.data;
    return invoice;
  } catch (err) {
    console.error(err);
  }
};
