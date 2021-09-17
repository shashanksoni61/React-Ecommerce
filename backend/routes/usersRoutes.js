import express from 'express';
import {
  authUser,
  registerUser,
  getLoggedUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/usersController.js';
import auth, { admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, admin, getAllUsers);
router.post('/login', authUser);
router.route('/register').post(registerUser);

router.get('/profile', auth, getLoggedUserProfile);
router.put('/profile', auth, updateUserProfile);

router.delete('/:id', auth, admin, deleteUser);
router.get('/:id', auth, admin, getUserById);
router.put('/:id', auth, admin, updateUser);

export default router;
