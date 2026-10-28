import express from "express";

import {
  getPublishedContent,
  getContentBySlug,
  getAdminContent,
  createContent,
  updateContent,
  deleteContent,
  likeContent,
  dislikeContent,
} from "../controllers/contentController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getPublishedContent
);

router.get(
  "/slug/:slug",
  getContentBySlug
);

/*
|--------------------------------------------------------------------------
| USER
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/like",
  protect,
  likeContent
);

router.post(
  "/:id/dislike",
  protect,
  dislikeContent
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  adminProtect,
  authorize("content.read"),
  getAdminContent
);

router.post(
  "/admin",
  adminProtect,
  authorize("content.create"),
  createContent
);

router.put(
  "/admin/:id",
  adminProtect,
  authorize("content.update"),
  updateContent
);

router.delete(
  "/admin/:id",
  adminProtect,
  authorize("content.delete"),
  deleteContent
);

export default router;