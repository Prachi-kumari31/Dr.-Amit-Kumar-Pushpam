import express from "express";

import {
  getAllEbooks,
  getFeaturedEbooks,
  getEbookBySlug,
  createEbook,
  updateEbook,
  deleteEbook,
} from "../controllers/ebookController.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

import ebookUpload from "../middleware/ebookUpload.js";

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  getAllEbooks
);

router.get(
  "/featured",
  getFeaturedEbooks
);

router.get(
  "/:slug",
  getEbookBySlug
);


/*
|--------------------------------------------------------------------------
| ADMIN CREATE
|--------------------------------------------------------------------------
|
| cover      -> image
| ebookFile  -> PDF
|
*/

router.post(
  "/",
  adminProtect,
  authorize("content.create"),

  ebookUpload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "ebookFile",
      maxCount: 1,
    },
  ]),

  createEbook
);


/*
|--------------------------------------------------------------------------
| ADMIN UPDATE
|--------------------------------------------------------------------------
*/

router.put(
  "/:id",
  adminProtect,
  authorize("content.update"),

  ebookUpload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
    {
      name: "ebookFile",
      maxCount: 1,
    },
  ]),

  updateEbook
);


/*
|--------------------------------------------------------------------------
| ADMIN DELETE
|--------------------------------------------------------------------------
*/

router.delete(
  "/:id",
  adminProtect,
  authorize("content.delete"),
  deleteEbook
);

export default router;