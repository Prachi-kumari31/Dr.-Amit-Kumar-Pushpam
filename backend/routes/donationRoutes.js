import express from "express";

import {
  createDonation,
  getDonation,
} from "../controllers/donationController.js";

const router = express.Router();

// Create donation record
router.post("/", createDonation);

// Get donation
router.get("/:id", getDonation);

export default router;