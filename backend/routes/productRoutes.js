import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import auth, { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, admin, createProduct);
router.get('/:id', getProductById);
router.delete('/:id', auth, admin, deleteProduct);
router.put('/:id', auth, admin, updateProduct);

export default router;
