import { createProductAction } from '@/actions/product.action';
import { IFilterProduct } from '@/interfaces/product.interface';
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
    const { keyword = '', page = 1, size = 1000 } = req.query as IFilterProduct;
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const skip = Number(page) > 0 ? (Number(page) - 1) * Number(size) : 0;
    const take = Number(size);

    const products = await prisma.item.findMany({
      where: {
        userId,
        deletedAt: null,
        name: { contains: keyword },
      },
      orderBy: { name: 'asc' },
      skip,
      take,
    });

    // Count total products for pagination
    const totalCount = await prisma.item.aggregate({
      _count: { id: true },
      where: {
        name: { contains: keyword },
      },
    });

    const count = totalCount._count.id;
    const pages = Math.ceil(count / size);

    if (products.length === 0) {
      res.status(404).json({ message: 'No products found for this user' });
      return; // Prevent further execution after sending response
    }

    res.status(200).json({ products, pages });
  } catch (err) {
    next(err); // Properly pass the error to the next middleware
  }
};

export default getProductsByUserIDController;

export { createProductController };
