import express from 'express';
import { authUser } from '../controllers/usersController.js';

const router = express.Router();

// desc     Authenticate user and get Token
// route    POST /api/users/login
// access   Pubilc
router.post('/login', authUser);

export default router;
