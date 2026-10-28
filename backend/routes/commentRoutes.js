// import express from "express";

// import {
//   createComment,
//   getComments,
//   getAdminComments,
//   approveComment,
//   rejectComment,
//   deleteComment,
// } from "../controllers/commentController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC ROUTES
// |--------------------------------------------------------------------------
// */

// // Get only approved comments for public website
// router.get("/", getComments);

// /*
// |--------------------------------------------------------------------------
// | USER ROUTES
// |--------------------------------------------------------------------------
// */

// // Logged-in users can create comments
// router.post("/", protect, createComment);

// // User can delete their own comment
// // Admin can also delete through the admin route below
// router.delete("/:id", protect, deleteComment);

// /*
// |--------------------------------------------------------------------------
// | ADMIN ROUTES
// |--------------------------------------------------------------------------
// */

// // Get ALL comments for admin dashboard
// router.get(
//   "/admin",
//   adminProtect,
//   getAdminComments
// );

// // Approve comment
// router.put(
//   "/:id/approve",
//   adminProtect,
//   authorize("comments.approve"),
//   approveComment
// );

// // Reject comment
// router.put(
//   "/:id/reject",
//   adminProtect,
//   authorize("comments.reject"),
//   rejectComment
// );

// // Delete comment from admin dashboard
// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("comments.delete"),
//   deleteComment
// );

// export default router;



// import express from "express";

// import {
//   createComment,
//   getComments,
//   getAdminComments,
//   approveComment,
//   rejectComment,
//   deleteComment,
// } from "../controllers/commentController.js";

// import { protect } from "../middleware/authMiddleware.js";

// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router =
//   express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/",
//   getComments
// );

// /*
// |--------------------------------------------------------------------------
// | USER
// |--------------------------------------------------------------------------
// */

// router.post(
//   "/",
//   protect,
//   createComment
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/admin/all",
//   adminProtect,
//   authorize("comments.read"),
//   getAdminComments
// );

// router.put(
//   "/admin/:id/approve",
//   adminProtect,
//   authorize("comments.approve"),
//   approveComment
// );

// router.put(
//   "/admin/:id/reject",
//   adminProtect,
//   authorize("comments.reject"),
//   rejectComment
// );

// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("comments.delete"),
//   deleteComment
// );



// export default router;


// import express from "express";

// import {
//   createComment,
//   getComments,
//   getAdminComments,
//   approveComment,
//   rejectComment,
//   deleteComment,
// } from "../controllers/commentController.js";

// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// */

// /*
// GET:
//  /api/comments?contentId=BLOG_ID&contentType=Blog
// */

// router.get(
//   "/",
//   getComments
// );

// /*
// POST:
//  /api/comments
// */

// router.post(
//   "/",
//   createComment
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN COMMENTS
// |--------------------------------------------------------------------------
// */

// router.get(
//   "/admin/all",
//   adminProtect,
//   authorize("comments.read"),
//   getAdminComments
// );

// router.put(
//   "/admin/:id/approve",
//   adminProtect,
//   authorize("comments.approve"),
//   approveComment
// );

// router.put(
//   "/admin/:id/reject",
//   adminProtect,
//   authorize("comments.reject"),
//   rejectComment
// );

// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("comments.delete"),
//   deleteComment
// );

// export default router;

// import express from "express";

// import {
//   createComment,
//   getComments,
//   getAdminComments,
//   approveComment,
//   rejectComment,
//   deleteComment,
// } from "../controllers/commentController.js";

// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// */

// /*
// GET /api/comments?contentId=XXX&contentType=Blog
// */
// router.get(
//   "/",
//   getComments
// );

// /*
// POST /api/comments
// */
// router.post(
//   "/",
//   createComment
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN COMMENTS
// |--------------------------------------------------------------------------
// */

// /*
// GET /api/comments/admin/all
// */
// router.get(
//   "/admin/all",
//   adminProtect,
//   authorize("comments.read"),
//   getAdminComments
// );

// /*
// PUT /api/comments/admin/:id/approve
// */
// router.put(
//   "/admin/:id/approve",
//   adminProtect,
//   authorize("comments.approve"),
//   approveComment
// );

// /*
// PUT /api/comments/admin/:id/reject
// */
// router.put(
//   "/admin/:id/reject",
//   adminProtect,
//   authorize("comments.reject"),
//   rejectComment
// );

// /*
// DELETE /api/comments/admin/:id
// */
// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("comments.delete"),
//   deleteComment
// );

// export default router;
import express from "express";

import {
  createComment,
  getComments,
  getAdminComments,
  approveComment,
  rejectComment,
  deleteComment,
} from "../controllers/commentController.js";

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
  getComments
);

router.post(
  "/",
  createComment
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/admin/all",
  adminProtect,
  authorize("comments.read"),
  getAdminComments
);

router.put(
  "/admin/:id/approve",
  adminProtect,
  authorize("comments.approve"),
  approveComment
);

router.put(
  "/admin/:id/reject",
  adminProtect,
  authorize("comments.reject"),
  rejectComment
);

router.delete(
  "/admin/:id",
  adminProtect,
  authorize("comments.delete"),
  deleteComment
);

export default router;