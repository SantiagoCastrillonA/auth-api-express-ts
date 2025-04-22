import { Router } from 'express';
import { createProduct } from '../controllers/produc-controller';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/', verifyToken, createProduct);

export default router;