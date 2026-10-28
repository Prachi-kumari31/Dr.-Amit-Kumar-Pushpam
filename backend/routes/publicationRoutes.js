import express from "express";

import {
  getPublicPublications,
  getPublicPublication,
  getAdminPublications,
  createPublication,
  updatePublication,
  togglePublish,
  deletePublication,
  likePublication,
  dislikePublication,
} from "../controllers/publicationController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC

router.get(
  "/public",
  getPublicPublications
);

router.get(
  "/public/:id",
  getPublicPublication
);

// ADMIN

router.get(
  "/admin/all",
  adminProtect,
  authorize("content.read"),
  getAdminPublications
);

router.post(
  "/",
  adminProtect,
  authorize("content.create"),
  createPublication
);

router.put(
  "/:id",
  adminProtect,
  authorize("content.update"),
  updatePublication
);

router.put(
  "/:id/publish",
  adminProtect,
  authorize("content.publish"),
  togglePublish
);

router.delete(
  "/:id",
  adminProtect,
  authorize("content.delete"),
  deletePublication
);

// USER INTERACTIONS

router.put(
  "/:id/like",
  protect,
  likePublication
);

router.put(
  "/:id/dislike",
  protect,
  dislikePublication
);

export default router;