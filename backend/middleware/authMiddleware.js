import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401);
    throw new Error('No Token, Authorization Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    console.log(err.message);
    res.status(401);
    throw new Error(err.message);
  }
};

export const admin = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (user && user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

export default auth;
