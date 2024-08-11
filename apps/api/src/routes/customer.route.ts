import {
  createCustomerController,
  getCustomersByUserIDController,
  softDeleteCustomerAction,
} from '@/controllers/customer.controller';
import express from 'express';

const router = express.Router();

router.post('/', createCustomerController);
router.get('/:userId', getCustomersByUserIDController);
router.delete('/:id/soft-delete', softDeleteCustomerAction);

export default router;
