import express from "express";

import {
  uploadMedia,
} from "../controllers/uploadController.js";

import {
  adminProtect,
} from "../middleware/adminAuthMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/media",
  adminProtect,
  upload.single("file"),
  uploadMedia
);

export default router;