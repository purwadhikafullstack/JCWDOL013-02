import {
  getUserByIDController,
  getUsersController,
} from '@/controllers/user.controller';
import express from 'express';

const router = express.Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIDController);

export default router;
