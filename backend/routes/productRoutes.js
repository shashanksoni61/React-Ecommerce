import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const router = express.Router();

// Desc     get all Products
// Route    GET /api/products
// Access   Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);
  }
});

// Desc     get single Products
// Route    GET /api/products/:id
// Access   Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json(product);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      res.json('invalid id');
    }
    console.log(err.message);
  }
});

export default router;
