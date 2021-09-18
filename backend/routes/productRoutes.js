import express from 'express';
import {
  deleteProduct,
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import auth, { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', auth, admin, deleteProduct);

export default router;
