import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middleware/errorHandler.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  user = await User.create({ name, email, phone, password });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      // name: user.name,
      // email: user.email,
      role: user.role,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});