import express from 'express';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const router = express.Router();

// Desc     get all Products
// Route    GET /api/products
// Access   Public
router.get('/', getProducts);

// Desc     get single Products
// Route    GET /api/products/:id
// Access   Public
router.get('/:id', getProductById);

export default router;
