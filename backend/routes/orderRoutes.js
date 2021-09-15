import express from 'express';
import {
  addOrder,
  generateRazorpayOrderId,
  getOrderByID,
  updateOrderToPaid,
  validatePayment,
} from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, addOrder);
router.get('/:id', auth, getOrderByID);
router.get('/:id/razorpay', auth, generateRazorpayOrderId);
router.post('/:id/payment_varify', auth, validatePayment);
router.post('/:id/pay', auth, updateOrderToPaid);

export default router;
