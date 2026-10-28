// import express from 'express';
// import {
//   createBooking,
//   getBooking,
//   getUserBookings,
//   updateBookingStatus,
//   cancelBooking,
// } from '../controllers/bookingController.js';
// import { protect, authorize } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Protected routes - User
// router.post('/', protect, createBooking);
// router.get('/user/my-bookings', protect, getUserBookings);
// router.get('/:id', protect, getBooking);
// router.put('/:id/cancel', protect, cancelBooking);

// // Protected routes - Admin
// router.put('/:id/status', protect, authorize('admin'), updateBookingStatus);

// export default router;

// import express from "express";

// import {
//   createBooking,
//   getAllBookings,
//   getBooking,
//   confirmBooking,
//   updateBookingStatus,
//   deleteBooking,
// } from "../controllers/bookingController.js";

// import {
//   protect,
//   admin,
// } from "../middleware/adminAuthMiddleware.js";


// const router = express.Router();

// // =====================================================
// // PUBLIC
// // User does NOT need login
// // =====================================================

// router.post(
//   "/",
//   createBooking
// );


// // =====================================================
// // ADMIN ONLY
// // =====================================================

// router.get(
//   "/",
//   protect,
//   admin,
//   getAllBookings
// );


// router.get(
//   "/:id",
//   protect,
//   admin,
//   getBooking
// );


// router.patch(
//   "/:id/confirm",
//   protect,
//   admin,
//   confirmBooking
// );


// router.patch(
//   "/:id/status",
//   protect,
//   admin,
//   updateBookingStatus
// );


// router.delete(
//   "/:id",
//   protect,
//   admin,
//   deleteBooking
// );


// export default router;


import express from "express";

import {
  createBooking,
  getAllBookings,
  getBooking,
  confirmBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

import {
  adminProtect,
  admin,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/*
=====================================================
PUBLIC BOOKING
No customer login required
=====================================================
*/

router.post("/", createBooking);


/*
=====================================================
ADMIN BOOKING MANAGEMENT
Admin login required
=====================================================
*/

router.get(
  "/",
  adminProtect,
  admin,
  getAllBookings
);

router.get(
  "/:id",
  adminProtect,
  admin,
  getBooking
);

router.patch(
  "/:id/confirm",
  adminProtect,
  admin,
  confirmBooking
);

router.patch(
  "/:id/status",
  adminProtect,
  admin,
  updateBookingStatus
);

router.delete(
  "/:id",
  adminProtect,
  admin,
  deleteBooking
);

export default router;