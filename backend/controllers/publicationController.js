import Publication from "../models/Publication.js";
import Comment from "../models/Comment.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const makeSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// =====================================================
// PUBLIC - GET ALL PUBLISHED CONTENT
// =====================================================

export const getPublicPublications =
  asyncHandler(async (req, res) => {
    const {
      type,
      search,
    } = req.query;

    const query = {
      isPublished: true,
    };

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$text = {
        $search: search,
      };
    }

    const publications =
      await Publication.find(query)
        .select(
          "-content -likedBy -dislikedBy"
        )
        .sort({
          publishedAt: -1,
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications,
    });
  });

// =====================================================
// PUBLIC - SINGLE CONTENT
// =====================================================

export const getPublicPublication =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findOne({
        $or: [
          {
            _id: req.params.id,
          },
          {
            slug: req.params.id,
          },
        ],
        isPublished: true,
      });

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found",
      });
    }

    publication.views += 1;

    await publication.save();

    const comments =
      await Comment.find({
        publication:
          publication._id,
        isApproved: true,
        isRejected: false,
      })
        .populate(
          "author",
          "name avatar"
        )
        .populate(
          "replies.author",
          "name avatar"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      data: {
        publication,
        comments,
      },
    });
  });

// =====================================================
// ADMIN - GET EVERYTHING
// =====================================================

export const getAdminPublications =
  asyncHandler(async (req, res) => {
    const {
      type,
      status,
      search,
    } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (status === "published") {
      query.isPublished = true;
    }

    if (status === "draft") {
      query.isPublished = false;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const publications =
      await Publication.find(query)
        .populate(
          "createdBy",
          "username fullName"
        )
        .sort({
          updatedAt: -1,
        });

    res.status(200).json({
      success: true,
      count: publications.length,
      data: publications,
    });
  });

// =====================================================
// ADMIN - CREATE
// =====================================================

export const createPublication =
  asyncHandler(async (req, res) => {
    const {
      title,
      type,
      author,
      category,
      excerpt,
      content,
      coverImage,
      tags,
      isPublished,
      seoTitle,
      seoDescription,
    } = req.body;

    if (
      !title ||
      !type ||
      !content
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, type and content are required",
      });
    }

    let slug = makeSlug(title);

    const existing =
      await Publication.findOne({
        slug,
      });

    if (existing) {
      slug =
        `${slug}-${Date.now()}`;
    }

    const publication =
      await Publication.create({
        title,
        slug,
        type,
        author,
        category,
        excerpt,
        content,
        coverImage,
        tags: Array.isArray(tags)
          ? tags
          : [],
        isPublished:
          Boolean(isPublished),
        publishedAt:
          isPublished
            ? new Date()
            : null,
        seoTitle,
        seoDescription,
        createdBy:
          req.admin._id,
      });

    res.status(201).json({
      success: true,
      message:
        "Content created successfully",
      data: publication,
    });
  });

// =====================================================
// ADMIN - UPDATE
// =====================================================

export const updatePublication =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findById(
        req.params.id
      );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    const allowedFields = [
      "title",
      "type",
      "author",
      "category",
      "excerpt",
      "content",
      "coverImage",
      "tags",
      "seoTitle",
      "seoDescription",
    ];

     const oldTitle = publication.title;

    // allowedFields.forEach(
    //   (field) => {
    //     if (
    //       req.body[field] !== undefined
    //     ) {
    //       publication[field] =
    //         req.body[field];
    //     }
    //   }
    // );

    // if (
    //   req.body.title &&
    //   req.body.title !==
    //     publication.title
    // ) {
    //   publication.slug =
    //     makeSlug(req.body.title);
    // }

    allowedFields.forEach((field) => {
  if (req.body[field] !== undefined) publication[field] = req.body[field];
});

if (req.body.title && req.body.title !== oldTitle) {
  let slug = makeSlug(req.body.title);
  const exists = await Publication.findOne({
    slug,
    _id: { $ne: publication._id },
  });
  if (exists) slug = `${slug}-${Date.now()}`;
  publication.slug = slug;
}

    await publication.save();

    res.status(200).json({
      success: true,
      message:
        "Content updated successfully",
      data: publication,
    });
  });

// =====================================================
// ADMIN - PUBLISH / UNPUBLISH
// =====================================================

export const togglePublish =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findById(
        req.params.id
      );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    publication.isPublished =
      !publication.isPublished;

    publication.publishedAt =
      publication.isPublished
        ? new Date()
        : null;

    await publication.save();

    res.status(200).json({
      success: true,
      message:
        publication.isPublished
          ? "Published successfully"
          : "Unpublished successfully",
      data: publication,
    });
  });

// =====================================================
// ADMIN - DELETE
// =====================================================

export const deletePublication =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findById(
        req.params.id
      );

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    await Comment.deleteMany({
      publication:
        publication._id,
    });

    await Publication.findByIdAndDelete(
      publication._id
    );

    res.status(200).json({
      success: true,
      message:
        "Content deleted successfully",
    });
  });

// =====================================================
// LIKE
// =====================================================

export const likePublication =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findOne({
        _id: req.params.id,
        isPublished: true,
      });

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found",
      });
    }

    const userId =
      req.user._id.toString();

    publication.dislikedBy =
      publication.dislikedBy.filter(
        (id) =>
          id.toString() !== userId
      );

    const alreadyLiked =
      publication.likedBy.some(
        (id) =>
          id.toString() === userId
      );

    if (alreadyLiked) {
      publication.likedBy =
        publication.likedBy.filter(
          (id) =>
            id.toString() !== userId
        );
    } else {
      publication.likedBy.push(
        req.user._id
      );
    }

    publication.likes =
      publication.likedBy.length;

    publication.dislikes =
      publication.dislikedBy.length;

    await publication.save();

    res.json({
      success: true,
      likes: publication.likes,
      dislikes:
        publication.dislikes,
      liked: !alreadyLiked,
      disliked: false,
    });
  });

// =====================================================
// DISLIKE
// =====================================================

export const dislikePublication =
  asyncHandler(async (req, res) => {
    const publication =
      await Publication.findOne({
        _id: req.params.id,
        isPublished: true,
      });

    if (!publication) {
      return res.status(404).json({
        success: false,
        message:
          "Publication not found",
      });
    }

    const userId =
      req.user._id.toString();

    publication.likedBy =
      publication.likedBy.filter(
        (id) =>
          id.toString() !== userId
      );

    const alreadyDisliked =
      publication.dislikedBy.some(
        (id) =>
          id.toString() === userId
      );

    if (alreadyDisliked) {
      publication.dislikedBy =
        publication.dislikedBy.filter(
          (id) =>
            id.toString() !== userId
        );
    } else {
      publication.dislikedBy.push(
        req.user._id
      );
    }

    publication.likes =
      publication.likedBy.length;

    publication.dislikes =
      publication.dislikedBy.length;

    await publication.save();

    res.json({
      success: true,
      likes: publication.likes,
      dislikes:
        publication.dislikes,
      liked: false,
      disliked:
        !alreadyDisliked,
    });
  });