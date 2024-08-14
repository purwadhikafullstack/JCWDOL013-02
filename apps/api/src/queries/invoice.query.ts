import { IInvoice } from '@/interfaces/invoice.interface';
import { Invoice, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createInvoiceQuery = async (
  invoiceData: IInvoice,
  userId: string,
): Promise<Invoice> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const invoice = await prisma.invoice.create({
          data: {
            ...invoiceData,
            userId: userId,
          },
        });

        return invoice;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const softDeleteInvoice = async (invoiceId: string): Promise<Invoice> => {
  try {
    const invoice = await prisma.invoice.update({
      where: {
        id: invoiceId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return invoice;
  } catch (err) {
    throw err;
  }
};

export { createInvoiceQuery, softDeleteInvoice };
