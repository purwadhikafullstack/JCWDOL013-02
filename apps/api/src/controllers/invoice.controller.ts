import { createInvoiceAction } from '@/actions/invoice.action';
import { sendInvoiceEmail } from '@/helpers/nodemailer';
import { generateInvoicePDF } from '@/helpers/pdfkit';
import { IFilterInvoice } from '@/interfaces/invoice.interface';
import { softDeleteInvoice } from '@/queries/invoice.query';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

const createInvoiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;

    const customer = await prisma.customer.findUnique({
      where: { id: params.customerId },
    });

    const data = await createInvoiceAction({
      ...params,
    });

    const pdfPath = generateInvoicePDF(data);
    const email = await sendInvoiceEmail({
      to: customer?.customerEmail ?? '',
      subject: 'Invoeasy',
      text: `${data.invoiceNumber}`,
      attachmentPath: pdfPath,
    });

    res.status(200).json({
      message: 'Create Invoice success',
      data,
      email,
    });
  } catch (err) {
    next(err);
  }
};

const getInvoicesByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      keyword = '',
      page = 1,
      size = 5,
      startDate,
      endDate,
      status,
    } = req.query as IFilterInvoice;

    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const dateFilter: any = {};
    if (startDate && endDate && startDate === endDate) {
      const exactDate = new Date(startDate as string);
      dateFilter.gte = exactDate;
      dateFilter.lte = new Date(exactDate.getTime() + 24 * 60 * 60 * 1000); // end of the day
    } else {
      if (startDate) {
        dateFilter.gte = new Date(startDate as string);
      }
      if (endDate) {
        dateFilter.lte = new Date(endDate as string);
      }
    }
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: userId,
        deletedAt: null,
        invoiceNumber: {
          contains: keyword,
        },
        invoiceDate: dateFilter,
        status: status ? status : undefined,
      },
      orderBy: {
        invoiceDate: 'asc',
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.invoice.aggregate({
      _count: {
        id: true,
      },
      where: {
        userId: userId,
        deletedAt: null,
        invoiceNumber: {
          contains: keyword,
        },
        invoiceDate: dateFilter,
        status: status ? status : undefined,
      },
    });

    const count = data._count.id;
    const pages = Math.ceil(count / Number(size));

    if (invoices.length === 0) {
      res.status(404).json({ message: 'No invoices found for this user' });
      return;
    }

    res.status(200).json({ invoices, pages, size: Number(size), count });
  } catch (err) {
    next(err);
  }
};

const softDeleteInvoiceAction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedInvoice = await softDeleteInvoice(id);
    res.status(200).json({
      message: 'Invoice soft deleted successfully',
      data: deletedInvoice,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to soft delete Invoice' });
  }
};

export {
  createInvoiceController,
  getInvoicesByUserIDController,
  softDeleteInvoiceAction,
};
