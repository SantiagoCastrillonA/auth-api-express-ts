import { Router } from 'express';
import { createProduct } from '../controllers/product.controller';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/', verifyToken, createProduct);

export default router;