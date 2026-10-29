import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../middleware/errorHandler.js';

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '24h',
  });
};

// Admin Login
export const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide username and password',
    });
  }

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Check if account is locked
    if (admin.isLocked()) {
      return res.status(403).json({
        success: false,
        message: 'Account is locked. Please try again after 30 minutes.',
      });
    }

    // Check if account is active
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated',
      });
    }

    // Match password
    const isPasswordMatch = await admin.matchPassword(password);

    if (!isPasswordMatch) {
      await admin.incLoginAttempts();
      const remainingAttempts = 5 - (admin.loginAttempts + 1);
      
      return res.status(401).json({
        success: false,
        message: `Invalid username or password. ${remainingAttempts > 0 ? `${remainingAttempts} attempts remaining.` : 'Account locked.'}`,
      });
    }

    // Reset login attempts
    await admin.resetLoginAttempts();

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
   // Generate token with id + role
const token = generateToken(admin._id, admin.role);


    // Set HTTP-only cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: admin._id,
        // username: admin.username,
        // email: admin.email,
        // fullName: admin.fullName,
        // profilePicture: admin.profilePicture,
        // permissions: admin.permissions,
      },
    });
  } catch (error) {
    console.log('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message,
    });
  }
});

// Get Admin Profile
export const getAdminProfile = asyncHandler(async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found',
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile',
      error: error.message,
    });
  }
});

// Update Admin Profile
export const updateAdminProfile = asyncHandler(async (req, res) => {
  const { fullName, bio, profilePicture } = req.body;

  try {
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      {
        fullName,
        bio,
        profilePicture,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
});

// Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'New passwords do not match',
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters',
    });
  }

  try {
    const admin = await Admin.findById(req.admin.id).select('+password');

    const isPasswordMatch = await admin.matchPassword(currentPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message,
    });
  }
});

// Logout
export const adminLogout = asyncHandler(async (req, res) => {
  res.clearCookie('adminToken');

  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});