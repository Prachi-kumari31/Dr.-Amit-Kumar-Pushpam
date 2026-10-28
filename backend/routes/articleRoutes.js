import express from "express";

const router =
  express.Router();

import  {
  getPublicArticles,
  getPublicArticleBySlug,
  registerArticleView,
  likeArticle,
  dislikeArticle,

  getAdminArticles,
  getAdminArticle,
  createArticle,
  updateArticle,
  publishArticle,
  unpublishArticle,
  deleteArticle,
} from "../controllers/articlecontroller.js";

/* =========================================================
   PUBLIC
========================================================= */

router.get(
  "/",
  getPublicArticles
);

router.get(
  "/slug/:slug",
  getPublicArticleBySlug
);

router.post(
  "/:id/view",
  registerArticleView
);

router.post(
  "/:id/like",
  likeArticle
);

router.post(
  "/:id/dislike",
  dislikeArticle
);

/* =========================================================
   ADMIN
========================================================= */

router.get(
  "/admin/all",
  getAdminArticles
);

router.get(
  "/admin/:id",
  getAdminArticle
);

router.post(
  "/admin",
  createArticle
);

router.put(
  "/admin/:id",
  updateArticle
);

router.patch(
  "/admin/:id/publish",
  publishArticle
);

router.patch(
  "/admin/:id/unpublish",
  unpublishArticle
);

router.delete(
  "/admin/:id",
  deleteArticle
);

export default router;