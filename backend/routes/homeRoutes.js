import express from "express";

import {
  getHome,
  createHome,
  updateHome,
} from "../controllers/homeController.js";

const router = express.Router();

// GET home page content
router.get("/", getHome);

// CREATE home page content
router.post("/", createHome);

// UPDATE home page content
router.put("/", updateHome);

export default router;