import express from 'express';
import {
  authUser,
  getLoggedUserProfile,
  registerUser,
} from '../controllers/usersController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.route('/register').post(registerUser);

router.post('/profile', auth, getLoggedUserProfile);

export default router;
