import { Router } from 'express';
import db from '../config/config-db';
import { 
    createSupplier, 
    getAllSuppliers, 
    getSupplierById, 
    updateSupplier, 
    deleteSupplier 
} from '../controllers/supplier-controller';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/', verifyToken, createSupplier);
router.get('/', verifyToken, getAllSuppliers);
router.get('/:id', verifyToken, getSupplierById);
router.put('/:id', verifyToken, updateSupplier);
router.delete('/:id', verifyToken, deleteSupplier);

export default router;