import bcrypt from 'bcryptjs';
import AsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import getToken from '../utils/getToken.js';

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('User Not Found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Password Does Not Match');
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: getToken(user._id),
  });
});

export { authUser };
