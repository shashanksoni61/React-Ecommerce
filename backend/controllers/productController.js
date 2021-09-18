import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

// Desc     get all Products
// Route    GET /api/products
// Access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// Desc     get single Products
// Route    GET /api/products/:id
// Access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.status(200).json(product);
});

// Desc     Delete Product by Id
// route    delete /api/products/:id
// access   Private only Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.remove();
  res.json({ message: 'Product Removed' });
});

export { getProducts, getProductById, deleteProduct };
