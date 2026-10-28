import express from "express";

import {
  getPublicMedia,
  getMediaCategories,
  getAdminMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController.js";

import {
  uploadMedia,
} from "../middleware/mediaUpload.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getPublicMedia
);

router.get(
  "/categories",
  getMediaCategories
);

router.get(
  "/:id",
  getMediaById
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
  getAdminMedia
);

router.post(
  "/admin",
  adminProtect,
  authorize("content.create"),
  uploadMedia.single("media"),
  createMedia
);

router.put(
  "/admin/:id",
  adminProtect,
  authorize("content.update"),
  updateMedia
);

router.delete(
  "/admin/:id",
  adminProtect,
  authorize("content.delete"),
  deleteMedia
);

export default router;