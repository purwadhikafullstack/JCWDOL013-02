import {
  createProductController,
  getProductsByUserIDController,
  softDeleteProductAction,
} from '@/controllers/product.controller';
import express from 'express';

const router = express.Router();

router.post('/', createProductController);
router.get('/:userId', getProductsByUserIDController);
router.delete('/:id/soft-delete', softDeleteProductAction);

export default router;
