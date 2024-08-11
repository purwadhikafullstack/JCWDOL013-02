import type { Application } from 'express';
import authRouter from './auth.route';
import userRouter from './user.route';
import customerRouter from './customer.route';

module.exports = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/users', userRouter);
  app.use('/customers', customerRouter);
};
