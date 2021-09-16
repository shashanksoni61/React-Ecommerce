import express from 'express';
import {
  authUser,
  registerUser,
  getLoggedUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controllers/usersController.js';
import auth, { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, admin, getAllUsers);
router.post('/login', authUser);
router.route('/register').post(registerUser);

router.get('/profile', auth, getLoggedUserProfile);
router.put('/profile', auth, updateUserProfile);

export default router;
