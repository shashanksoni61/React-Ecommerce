import bcrypt from 'bcryptjs';
import AsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import getToken from '../utils/getToken.js';

// desc     Authenticate user and get Token
// route    POST /api/users/login
// access   Pubilc so Registered user can Get Token
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

// desc     Register a new user and get Token
// route    GET /api/users/register
// access   Pubilc so Registered user can Get Token
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined) {
    throw new Error('Please Fill All The Fields');
  }

  let user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error('User Already Exist');
  }

  const newUser = new User({ name, email, password });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  user = await newUser.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: getToken(user._id),
  });
});

// desc     Get Logged user profile
// route    GET /api/users/profile
// access   Private only logged user can access
const getLoggedUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) throw new Error('User Not Found ');
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// desc     Update Logged user profile
// route    PUT /api/users/profile
// access   Private only logged user can access
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select('-password');
  if (!user) throw new Error('User Not Found ');

  const { name, email, password } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = (await bcrypt.hash(password, salt)) || user.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: getToken(user._id),
    });
  }
});

// For Admin

// desc     Get All Users
// route    GET /api/users/
// access   Private only Admin can access
const getAllUsers = AsyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// desc     Delete a User
// route    Delete /api/users/:id
// access   Private only Admin can access
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.remove();
  res.json({ message: 'User removed' });
});

// desc     Get User by Id
// route    GET /api/users/:id
// access   Private only Admin can access
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user);
});

// desc     Update user
// route    PUT /api/users/:id
// access   Private only logged user can access
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) throw new Error('User Not Found ');

  const { name, email, isAdmin } = req.body;

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = isAdmin;
    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getLoggedUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
};
