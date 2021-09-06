import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const router = express.Router();

// Desc     get all Products
// Route    GET /api/products
// Access   Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

// Desc     get single Products
// Route    GET /api/products/:id
// Access   Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json(product);
  })
);

export default router;
