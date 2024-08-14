import { IInvoice } from '@/interfaces/invoice.interface';
import { createInvoiceQuery } from '@/queries/invoice.query';
import { Invoice } from '@prisma/client';

const createInvoiceAction = async (data: IInvoice): Promise<Invoice> => {
  try {
    const invoice = await createInvoiceQuery(data, data.userId);
    return invoice;
  } catch (err) {
    throw err;
  }
};

export { createInvoiceAction };
