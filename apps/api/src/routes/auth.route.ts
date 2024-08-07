import {
  loginController,
  registerController,
  verifyController,
} from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import express from 'express';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/verify', verifyToken, verifyController);

export default router;
