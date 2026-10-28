import express from "express";

import {
  getAdminPoems,
  getPublishedPoems,
  getPoemById,
  createPoem,
  updatePoem,
  deletePoem,
} from "../controllers/poemController.js";

import {
  adminProtect,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();


// Public

router.get(
  "/",
  getPublishedPoems
);

router.get(
  "/:id",
  getPoemById
);


// Admin

router.get(
  "/admin/all",
  adminProtect,
  getAdminPoems
);

router.post(
  "/",
  adminProtect,
  createPoem
);

router.put(
  "/:id",
  adminProtect,
  updatePoem
);

router.delete(
  "/:id",
  adminProtect,
  deletePoem
);

export default router;