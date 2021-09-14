import express from 'express';
import { addOrder, getOrderByID } from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, addOrder);
router.get('/:id', auth, getOrderByID);

export default router;
