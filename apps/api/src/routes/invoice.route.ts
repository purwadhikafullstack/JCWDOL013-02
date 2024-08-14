import {
  createInvoiceController,
  getInvoicesByUserIDController,
  softDeleteInvoiceAction,
} from '@/controllers/invoice.controller';
import express from 'express';

const router = express.Router();

router.post('/', createInvoiceController);
router.get('/:userId', getInvoicesByUserIDController);
router.delete('/:id/soft-delete', softDeleteInvoiceAction);

export default router;
