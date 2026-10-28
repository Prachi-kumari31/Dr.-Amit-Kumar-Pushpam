// import express from 'express';
// import {
//   getAllBlogs,
 
//   getBlogBySlug,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
// } from '../controllers/blogController.js';
// import { protect, authorize } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // Public routes

// router.get('/', getAllBlogs);
// router.get('/:slug', getBlogBySlug);

// // Protected routes
// router.post('/', protect, createBlog);
// router.put('/:id', protect, updateBlog);
// router.delete('/:id', protect, deleteBlog);
// router.post('/:id/like', protect, likeBlog);
// router.post('/:id/dislike', protect, dislikeBlog);

// export default router;


// import express from "express";

// import {
//   getAllBlogs,
//   getBlogBySlug,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
// } from "../controllers/blogController.js";

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
//   getAllBlogs
// );

// router.get(
//   "/:slug",
//   getBlogBySlug
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN
// |--------------------------------------------------------------------------
// */

// router.post(
//   "/",
//   adminProtect,
//   authorize("content.create"),
//   createBlog
// );

// router.put(
//   "/:id",
//   adminProtect,
//   authorize("content.update"),
//   updateBlog
// );

// router.delete(
//   "/:id",
//   adminProtect,
//   authorize("content.delete"),
//   deleteBlog
// );

// /*
// |--------------------------------------------------------------------------
// | USER INTERACTIONS
// |--------------------------------------------------------------------------
// */

// router.post(
//   "/:id/like",
//   protect,
//   likeBlog
// );

// router.post(
//   "/:id/dislike",
//   protect,
//   dislikeBlog
// );

// export default router;



// import express from "express";

// import {
//   getAllBlogs,
//   getBlogBySlug,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
// } from "../controllers/blogController.js";

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

// // Get published blogs
// router.get("/", getAllBlogs);

// // Get single published blog
// router.get("/:slug", getBlogBySlug);


// /*
// |--------------------------------------------------------------------------
// | ADMIN ROUTES
// |--------------------------------------------------------------------------
// */

// // Create blog
// router.post(
//   "/admin",
//   adminProtect,
//   authorize("content.create"),
//   createBlog
// );

// // Update blog
// router.put(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.update"),
//   updateBlog
// );

// // Delete blog
// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.delete"),
//   deleteBlog
// );


// /*
// |--------------------------------------------------------------------------
// | USER INTERACTION ROUTES
// |--------------------------------------------------------------------------
// */

// // Like blog
// router.post(
//   "/:id/like",
//   protect,
//   likeBlog
// );

// // Dislike blog
// router.post(
//   "/:id/dislike",
//   protect,
//   dislikeBlog
// );

// export default router;

// import express from "express";

// import {
//   getAllBlogs,
//   getBlogBySlug,
//   getAdminBlogs,
//   createBlog,
//   updateBlog,
//   deleteBlog,
//   likeBlog,
//   dislikeBlog,
// } from "../controllers/blogController.js";

// import { protect } from "../middleware/authMiddleware.js";

// import {
//   adminProtect,
//   authorize,
// } from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC BLOG ROUTES
// |--------------------------------------------------------------------------
// */

// /*
//  * GET /api/blogs
//  *
//  * Returns only published blogs.
//  */
// router.get("/", getAllBlogs);

// /*
// |--------------------------------------------------------------------------
// | ADMIN BLOG ROUTES
// |--------------------------------------------------------------------------
// */

// /*
//  * IMPORTANT:
//  * This route MUST come before /:slug
//  *
//  * GET /api/blogs/admin
//  */
// router.get(
//   "/admin",
//   adminProtect,
//   authorize("content.read"),
//   getAdminBlogs
// );

// /*
//  * POST /api/blogs/admin
//  */
// router.post(
//   "/admin",
//   adminProtect,
//   authorize("content.create"),
//   createBlog
// );

// /*
//  * PUT /api/blogs/admin/:id
//  */
// router.put(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.update"),
//   updateBlog
// );

// /*
//  * DELETE /api/blogs/admin/:id
//  */
// router.delete(
//   "/admin/:id",
//   adminProtect,
//   authorize("content.delete"),
//   deleteBlog
// );

// /*
// |--------------------------------------------------------------------------
// | USER INTERACTION
// |--------------------------------------------------------------------------
// */

// router.post(
//   "/:id/like",
//   likeBlog
// );

// router.post(
//   "/:id/dislike",
//   dislikeBlog
// );

// // router.post("/",  createComment);

// /*
// |--------------------------------------------------------------------------
// | PUBLIC SINGLE BLOG
// |--------------------------------------------------------------------------
// */

// /*
//  * Keep this AFTER /admin routes.
//  *
//  * GET /api/blogs/:slug
//  */
// router.get(
//   "/:slug",
//   getBlogBySlug
// );

// export default router;


import express from "express";

import {
  getAllBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  registerBlogView,
} from "../controllers/blogController.js";

import {
  adminProtect,
  authorize,
} from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC BLOGS
|--------------------------------------------------------------------------
*/

/*
GET /api/blogs
*/

router.get(
  "/",
  getAllBlogs
);

/*
|--------------------------------------------------------------------------
| ADMIN BLOGS
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  adminProtect,
  authorize("content.read"),
  getAdminBlogs
);

router.post(
  "/admin",
  adminProtect,
  authorize("content.create"),
  createBlog
);

router.put(
  "/admin/:id",
  adminProtect,
  authorize("content.update"),
  updateBlog
);

router.delete(
  "/admin/:id",
  adminProtect,
  authorize("content.delete"),
  deleteBlog
);

/*
|--------------------------------------------------------------------------
| PUBLIC BLOG INTERACTIONS
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/view",
  registerBlogView
);

router.post(
  "/:id/like",
  likeBlog
);

router.post(
  "/:id/dislike",
  dislikeBlog
);

/*
|--------------------------------------------------------------------------
| SINGLE BLOG
|--------------------------------------------------------------------------
*/

router.get(
  "/:slug",
  getBlogBySlug
);

export default router;