import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

router.put('/profile', protect, async (req, res) => {
  const { name, phone, bio, avatar } = req.body;

  const user = await req.user.updateOne({
    name: name || req.user.name,
    phone: phone || req.user.phone,
    bio: bio || req.user.bio,
    avatar: avatar || req.user.avatar,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

export default router;