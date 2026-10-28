// import express from 'express';
// import {
//   adminLogin,
//   getAdminProfile,
//   updateAdminProfile,
//   changePassword,
//   adminLogout,
// } from '../controllers/adminAuthController.js';
// import { adminProtect } from '../middleware/adminAuthMiddleware.js';

// const router = express.Router();

// // Public routes
// router.post('/login', adminLogin);
// // Protected routes
// router.get('/profile', adminProtect, getAdminProfile);
// router.put('/profile', adminProtect, updateAdminProfile);
// router.put('/change-password', adminProtect, changePassword);
// router.post('/logout', adminProtect, adminLogout);

// export default router;


import express from "express";

import {
  adminLogin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  adminLogout,
} from "../controllers/adminAuthController.js";

import {
  adminProtect,
} from "../middleware/adminAuthMiddleware.js";

const router =
  express.Router();

router.post(
  "/login",
  adminLogin
);

router.get(
  "/profile",
  adminProtect,
  getAdminProfile
);

router.put(
  "/profile",
  adminProtect,
  updateAdminProfile
);

router.put(
  "/password",
  adminProtect,
  changePassword
);

router.post(
  "/logout",
  adminProtect,
  adminLogout
);

export default router;