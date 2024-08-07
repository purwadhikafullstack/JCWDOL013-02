import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { API_KEY } from '../config/index';
import { User } from '../types/express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) throw new Error('Token invalid');

    const verifyUser = verify(token, String(API_KEY));
    if (!verifyUser) throw new Error('unauthorized');

    req.user = verifyUser as User;

    next();
  } catch (err) {
    next(err);
  }
};

const customerGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (String(req.user?.role).toLowerCase() !== 'customer')
      throw new Error('Unauthorized');

    next();
  } catch (err) {
    next(err);
  }
};

export { verifyToken, customerGuard };
