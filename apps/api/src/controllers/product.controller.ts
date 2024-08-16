import { createProductAction } from '@/actions/product.action';
import { IFilterProduct } from '@/interfaces/product.interface';
import { softDeleteProduct } from '@/queries/product.query';
import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;

    const data = await createProductAction({
      ...params,
    });

    res.status(200).json({
      message: 'Create Product success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getProductsByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const {
      keyword = '',
      page = 1,
      size = 5,
      type = '',
    } = req.query as IFilterProduct;

    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
    }
    const products = await prisma.item.findMany({
      where: {
        userId: userId,
        deletedAt: null,
        name: {
          contains: keyword,
        },
        type: type ? type : undefined,
      },
      orderBy: {
        name: 'asc',
      },
      skip: Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0,
      take: Number(size),
    });

    const data = await prisma.item.aggregate({
      _count: {
        id: true,
      },
      where: {
        userId: userId,
        deletedAt: null,
        name: {
          contains: keyword,
        },
        type: type ? type : undefined,
      },
    });
    const count = data._count.id;
    const pages = Math.ceil(count / Number(size));

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found for this user' });
    }

    res.status(200).json({ products, pages, size: Number(size), count });
  } catch (err) {
    next(err);
  }
};

export const softDeleteProductAction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await softDeleteProduct(id);
    res.status(200).json({
      message: 'Product soft deleted successfully',
      data: deletedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to soft delete Product' });
  }
};

export { createProductController, getProductsByUserIDController };
