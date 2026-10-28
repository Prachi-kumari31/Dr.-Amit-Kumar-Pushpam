// import express from "express";

// import {
//   getAdminStories,
//   getPublishedStories,
//   getStoryById,
//   createStory,
//   updateStory,
//   deleteStory,
// } from "../controllers/storyController.js";

// import {
//   adminProtect,
// } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();


// // Public

// router.get(
//   "/",
//   getPublishedStories
// );

// router.get(
//   "/:id",
//   getStoryById
// );


// // Admin

// router.get(
//   "/admin/all",
//   adminProtect,
//   getAdminStories
// );

// router.post(
//   "/",
//   adminProtect,
//   createStory
// );

// router.put(
//   "/:id",
//   adminProtect,
//   updateStory
// );

// router.delete(
//   "/:id",
//   adminProtect,
//   deleteStory
// );

// export default router;

// import express from "express";

// import {
//   getPublicStories,
//   getPublicStoryBySlug,
//   getAdminStories,
//   getAdminStoryById,
//   createStory,
//   updateStory,
//   publishStory,
//   unpublishStory,
//   deleteStory,
//   likeStory,
//   dislikeStory,
//   registerStoryView,
// } from "../controllers/storyController.js";

// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router =
//   express.Router();

// /* -------------------------------------------------------------------------- */
// /* PUBLIC */
// /* -------------------------------------------------------------------------- */

// router.get(
//   "/",
//   getPublicStories
// );

// router.get(
//   "/view/:slug",
//   getPublicStoryBySlug
// );

// router.post(
//   "/:id/like",
//   likeStory
// );

// router.post(
//   "/:id/dislike",
//   dislikeStory
// );

// router.post(
//   "/:id/view",
//   registerStoryView
// );

// /* -------------------------------------------------------------------------- */
// /* ADMIN */
// /* -------------------------------------------------------------------------- */

// router.get(
//   "/admin/all",
//   adminProtect,
//   authorize("content.read"),
//   getAdminStories
// );

// router.get(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.read"),
//   getAdminStoryById
// );

// router.post(
//   "/admin",
//   adminProtect,
//   authorize("content.create"),
//   createStory
// );

// router.put(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.update"),
//   updateStory
// );

// router.put(
//   "/admin/:id/publish",
//   adminProtect,
//   authorize("content.update"),
//   publishStory
// );

// router.put(
//   "/admin/:id/unpublish",
//   adminProtect,
//   authorize("content.update"),
//   unpublishStory
// );

// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.delete"),
//   deleteStory
// );

// export default router;



import express from "express";

import {
  getPublicStories,
  getPublicStoryBySlug,
  getAdminStories,
  getAdminStory,
  createStory,
  updateStory,
  publishStory,
  unpublishStory,
  deleteStory,
  likeStory,
  dislikeStory,
  registerStoryView,
  uploadStoryPdfAndExtract,
  uploadStoryImage,
} from "../controllers/storyController.js";

import {
  uploadStoryPdf,
  uploadStoryImage as uploadImage,
} from "../middleware/storyUpload.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/* =========================================================
   PUBLIC
========================================================= */

router.get(
  "/",
  getPublicStories
);

router.get(
  "/view/:slug",
  getPublicStoryBySlug
);

router.post(
  "/:id/like",
  likeStory
);

router.post(
  "/:id/dislike",
  dislikeStory
);

router.post(
  "/:id/view",
  registerStoryView
);

/* =========================================================
   ADMIN
========================================================= */

router.get(
  "/admin/all",
  adminProtect,
  authorize("content.read"),
  getAdminStories
);

router.get(
  "/admin/:id",
  adminProtect,
  authorize("content.read"),
  getAdminStory
);

router.post(
  "/admin",
  adminProtect,
  authorize("content.create"),
  createStory
);

router.put(
  "/admin/:id",
  adminProtect,
  authorize("content.update"),
  updateStory
);

router.put(
  "/admin/:id/publish",
  adminProtect,
  authorize("content.update"),
  publishStory
);

router.put(
  "/admin/:id/unpublish",
  adminProtect,
  authorize("content.update"),
  unpublishStory
);

router.delete(
  "/admin/:id",
  adminProtect,
  authorize("content.delete"),
  deleteStory
);

/* =========================================================
   PDF
========================================================= */

router.post(
  "/admin/upload-pdf",
  adminProtect,
  authorize("content.update"),
  uploadStoryPdf.single("pdf"),
  uploadStoryPdfAndExtract
);

/* =========================================================
   IMAGE
========================================================= */

router.post(
  "/admin/upload-image",
  adminProtect,
  authorize("content.update"),
  uploadImage.single("image"),
  uploadStoryImage
);

export default router;