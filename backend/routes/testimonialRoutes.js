import express from "express";

import {
  getApprovedTestimonials,
  createTestimonial,
  getAllTestimonials,
  getPendingTestimonials,
  approveTestimonial,
  rejectTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

const router = express.Router();

// ===============================
// PUBLIC ROUTES
// ===============================

// Get approved testimonials for website
router.get("/", getApprovedTestimonials);

// Submit testimonial
router.post("/", createTestimonial);

// ===============================
// ADMIN ROUTES
// ===============================

// Get ALL testimonials
router.get("/admin", getAllTestimonials);

// Get pending testimonials
router.get("/admin/pending", getPendingTestimonials);

// Approve
router.put("/admin/:id/approve", approveTestimonial);

// Reject
router.put("/admin/:id/reject", rejectTestimonial);

// Delete
router.delete("/admin/:id", deleteTestimonial);

export default router;