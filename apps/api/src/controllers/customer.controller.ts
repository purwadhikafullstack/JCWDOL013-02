import {
  createCustomerAction,
  getCustomersByUserIDAction,
} from '@/actions/customer.action';
import { softDeleteCustomer } from '@/queries/customer.query';
import { Request, Response, NextFunction } from 'express';

const createCustomerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const params = req.body;

    const data = await createCustomerAction({
      ...params,
    });

    res.status(200).json({
      message: 'Create Customer success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

const getCustomersByUserIDController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const filters = req.query;
    const data = await getCustomersByUserIDAction(filters);

    res.status(200).json({
      message: 'Get customers success',
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const softDeleteCustomerAction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await softDeleteCustomer(id);
    res.status(200).json({
      message: 'Customer soft deleted successfully',
      data: deletedCustomer,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to soft delete customer' });
  }
};

export { createCustomerController, getCustomersByUserIDController };
