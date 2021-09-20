import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import User from '../models/User.js';

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

// Desc     Create a Product
// route    POST /api/products/
// access   Private only Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Desc     Update a Product
// route    PUT /api/products/:id
// access   Private only Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Desc     Create new Review
// route    POST /api/products/:id/reviews
// access   Private
const createProductReview = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  const { rating, comment } = req.body;

  console.log(req.user);
  console.log(user);

  const product = await Product.findById(req.params.id);

  if (product) {
    //check if user already made an review
    const reviewAlreadyExist = product.reviews.find(
      rev => rev.user._id.toString() === req.user.toString()
    );

    if (reviewAlreadyExist) {
      res.status(400);
      throw new Error('You Have Already Added Your Review');
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: req.user,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
