import AsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

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
  }
  res.status(200).json(order);
});
