import express from 'express';
import {
  authUser,
  registerUser,
  getLoggedUserProfile,
  updateUserProfile,
} from '../controllers/usersController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/register').post(registerUser);

router.get('/profile', auth, getLoggedUserProfile);
router.put('/profile', auth, updateUserProfile);

export default router;
