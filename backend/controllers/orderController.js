import AsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import shortid from 'shortid';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Desc     Create New Order
// Route    POST /api/orders/
// Access   Private Only Logged User can visit
export const addOrder = AsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items Addedd');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

// Desc     Get Order By Id
// Route    GET /api/orders/:id
// Access   Private Only For Logged User

export const getOrderByID = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'id name email'
  );

  if (!order) {
    res.status(404);
    throw new Error('Order Not Found');
  } else {
    console.log('here');
    res.status(200).json(order);
  }
});
// if (!order) {
//   res.status(404);
//   throw new Error('Order Not Found');
// } else {
//   const loggedUserId = String(user._id);
//   const orderUserId = String(order.user._id);
//   console.log(loggedUserId);
//   console.log(orderUserId);
//   if (user.isAdmin || loggedUserId === orderUserId) {
//     console.log('here');
//     res.status(200).json(order);
//   } else {
//     res.status(401);
//     throw new Error('Unauthorized Access');
//   }
// }

// Desc     Generate Razorpay order id with amount for payment
// Route    POST /api/orders/:id/pay
// Access   Private Only For Logged User

export const generateRazorpayOrderId = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const payment_capture = 1;
    const amount = order.totalPrice;
    const currency = 'INR';

    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// Desc     Validate Payment Status using Razorpay secret
// Route    POST /:id/payment_varify
// Access   Private Only For Logged User
export const validatePayment = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature) {
      return res
        .status(400)
        .json({ message: 'Transaction Varification Failed' });
    }

    res.json({
      status: 'Paid',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      razorpayOrderId,
      create_time: new Date(),
    });
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// Desc     Update Order to paid
// Route    GET /api/orders/:id/pay
// Access   Private Only For Logged User
export const updateOrderToPaid = AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      paymentId: req.body.paymentId,
      razorpayOrderId: req.body.razorpayOrderId,
      status: req.body.status,
      email: req.body.email,
      create_time: req.body.create_time,
    };

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// Desc     Get Orders of Logged User
// Route    GET /api/orders/myorders
// Access   Private Only For Logged User
export const getUserOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error('No Orders Found');
  }
});

// Desc     Get Orders of All User
// Route    GET /api/orders/
// Access   Private Only For admin
export const getAllOrders = AsyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'id name email');

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error('No Orders Found');
  }
});
