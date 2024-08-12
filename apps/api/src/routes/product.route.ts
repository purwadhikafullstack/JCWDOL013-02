import getProductsByUserIDController, {
  createProductController,
} from '@/controllers/product.controller';
import { softDeleteProduct } from '@/queries/product.query';
import express from 'express';

const router = express.Router();

router.post('/', createProductController);
router.get('/:userId', getProductsByUserIDController);
router.delete('/:id/soft-delete', softDeleteProduct);

export default router;
