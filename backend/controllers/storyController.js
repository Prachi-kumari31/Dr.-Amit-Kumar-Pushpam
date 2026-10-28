// import Story from "../models/Story.js";
// import { asyncHandler } from "../middleware/errorHandler.js";

// /* -----------------------------------------
//    CREATE SLUG
// ----------------------------------------- */

// const makeSlug = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// };

// /* -----------------------------------------
//    GET PUBLIC STORIES / POEMS
// ----------------------------------------- */

// export const getPublicStories = asyncHandler(
//   async (req, res) => {
//     const {
//       type = "all",
//       page = 1,
//       limit = 12,
//     } = req.query;

//     const filter = {
//       status: "published",
//     };

//     if (
//       type === "story" ||
//       type === "poem"
//     ) {
//       filter.contentType = type;
//     }

//     const skip =
//       (Number(page) - 1) *
//       Number(limit);

//     const [items, total] =
//       await Promise.all([
//         Story.find(filter)
//           .populate(
//             "author",
//             "name avatar"
//           )
//           .sort({
//             publishedAt: -1,
//             createdAt: -1,
//           })
//           .skip(skip)
//           .limit(Number(limit))
//           .select(
//             "-content"
//           ),

//         Story.countDocuments(filter),
//       ]);

//     return res.status(200).json({
//       success: true,
//       count: items.length,
//       total,
//       page: Number(page),
//       pages: Math.ceil(
//         total / Number(limit)
//       ),
//       data: items,
//     });
//   }
// );

// /* -----------------------------------------
//    PUBLIC SINGLE STORY / POEM
// ----------------------------------------- */

// export const getPublicStoryBySlug =
//   asyncHandler(async (req, res) => {
//     const item =
//       await Story.findOne({
//         slug: req.params.slug,
//         status: "published",
//       }).populate(
//         "author",
//         "name avatar"
//       );

//     if (!item) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: item,
//     });
//   });

// /* -----------------------------------------
//    ADMIN GET ALL
// ----------------------------------------- */

// export const getAdminStories =
//   asyncHandler(async (req, res) => {
//     const {
//       type = "all",
//       status = "all",
//     } = req.query;

//     const filter = {};

//     if (
//       type === "story" ||
//       type === "poem"
//     ) {
//       filter.contentType = type;
//     }

//     if (
//       status === "draft" ||
//       status === "published"
//     ) {
//       filter.status = status;
//     }

//     const stories =
//       await Story.find(filter)
//         .populate(
//           "author",
//           "name email avatar"
//         )
//         .sort({
//           updatedAt: -1,
//         });

//     return res.status(200).json({
//       success: true,
//       count: stories.length,
//       data: stories,
//     });
//   });

// /* -----------------------------------------
//    ADMIN GET ONE
// ----------------------------------------- */

// export const getAdminStoryById =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findById(
//         req.params.id
//       ).populate(
//         "author",
//         "name email avatar"
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: story,
//     });
//   });

// /* -----------------------------------------
//    CREATE
// ----------------------------------------- */

// export const createStory =
//   asyncHandler(async (req, res) => {
//     const {
//       title,
//       excerpt,
//       content,
//       contentType,
//       coverImage,
//       category,
//       tags,
//       status,
//     } = req.body;

//     if (!title?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Title is required",
//       });
//     }

//     if (!content?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Content is required",
//       });
//     }

//     if (
//       !["story", "poem"].includes(
//         contentType
//       )
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Content type must be story or poem",
//       });
//     }

//     const slug =
//       makeSlug(title) +
//       "-" +
//       Date.now();

//     const story =
//       await Story.create({
//         title: title.trim(),
//         slug,
//         excerpt:
//           excerpt?.trim() || "",
//         content,
//         contentType,
//         coverImage:
//           coverImage?.trim() || "",
//         category:
//           category?.trim() || "",
//         tags: Array.isArray(tags)
//           ? tags
//           : [],
//         status:
//           status === "published"
//             ? "published"
//             : "draft",
//         author:
//           req.admin?._id ||
//           req.admin?.id,
//         publishedAt:
//           status === "published"
//             ? new Date()
//             : null,
//       });

//     return res.status(201).json({
//       success: true,
//       message:
//         status === "published"
//           ? "Published successfully"
//           : "Draft saved successfully",
//       data: story,
//     });
//   });

// /* -----------------------------------------
//    UPDATE
// ----------------------------------------- */

// export const updateStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findById(
//         req.params.id
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     const {
//       title,
//       excerpt,
//       content,
//       contentType,
//       coverImage,
//       category,
//       tags,
//       status,
//     } = req.body;

//     if (title !== undefined) {
//       story.title = title.trim();
//       story.slug =
//         makeSlug(title) +
//         "-" +
//         story._id.toString().slice(-6);
//     }

//     if (excerpt !== undefined)
//       story.excerpt = excerpt;

//     if (content !== undefined)
//       story.content = content;

//     if (
//       contentType === "story" ||
//       contentType === "poem"
//     ) {
//       story.contentType =
//         contentType;
//     }

//     if (coverImage !== undefined)
//       story.coverImage = coverImage;

//     if (category !== undefined)
//       story.category = category;

//     if (Array.isArray(tags))
//       story.tags = tags;

//     if (
//       status === "draft" ||
//       status === "published"
//     ) {
//       story.status = status;

//       if (status === "published") {
//         if (!story.publishedAt) {
//           story.publishedAt =
//             new Date();
//         }
//       } else {
//         story.publishedAt = null;
//       }
//     }

//     await story.save();

//     return res.status(200).json({
//       success: true,
//       message:
//         story.status === "published"
//           ? "Published successfully"
//           : "Draft updated successfully",
//       data: story,
//     });
//   });

// /* -----------------------------------------
//    PUBLISH
// ----------------------------------------- */

// export const publishStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findById(
//         req.params.id
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     story.status = "published";
//     story.publishedAt = new Date();

//     await story.save();

//     return res.status(200).json({
//       success: true,
//       message:
//         "Published successfully",
//       data: story,
//     });
//   });

// /* -----------------------------------------
//    UNPUBLISH
// ----------------------------------------- */

// export const unpublishStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findById(
//         req.params.id
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     story.status = "draft";
//     story.publishedAt = null;

//     await story.save();

//     return res.status(200).json({
//       success: true,
//       message:
//         "Moved back to draft",
//       data: story,
//     });
//   });

// /* -----------------------------------------
//    DELETE
// ----------------------------------------- */

// export const deleteStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findByIdAndDelete(
//         req.params.id
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Story or poem not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         "Deleted successfully",
//     });
//   });

// /* -----------------------------------------
//    LIKE
// ----------------------------------------- */

// export const likeStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findOneAndUpdate(
//         {
//           _id: req.params.id,
//           status: "published",
//         },
//         {
//           $inc: {
//             likes: 1,
//           },
//         },
//         {
//           new: true,
//         }
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Published content not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       likes: story.likes,
//     });
//   });

// /* -----------------------------------------
//    DISLIKE
// ----------------------------------------- */

// export const dislikeStory =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findOneAndUpdate(
//         {
//           _id: req.params.id,
//           status: "published",
//         },
//         {
//           $inc: {
//             dislikes: 1,
//           },
//         },
//         {
//           new: true,
//         }
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Published content not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       dislikes:
//         story.dislikes,
//     });
//   });

// /* -----------------------------------------
//    VIEW
// ----------------------------------------- */

// export const registerStoryView =
//   asyncHandler(async (req, res) => {
//     const story =
//       await Story.findOneAndUpdate(
//         {
//           _id: req.params.id,
//           status: "published",
//         },
//         {
//           $inc: {
//             views: 1,
//           },
//         },
//         {
//           new: true,
//         }
//       );

//     if (!story) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Published content not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       views: story.views,
//     });
//   });

import mongoose from "mongoose";
import Story from "../models/Story.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import sanitizeHtml from "sanitize-html";

import fs from "fs";
import { PDFParse } from "pdf-parse";

/* ==========================================================================
   SLUG
========================================================================== */

const makeSlug = (text = "") => {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

/* ==========================================================================
   SANITIZE HTML
========================================================================== */

const sanitizeContent = (html = "") => {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "hr",
      "div",
      "span",
    ],

    allowedAttributes: {
      a: ["href", "target", "rel"],

      img: [
        "src",
        "alt",
        "width",
        "height",
      ],

      "*": [
        "style",
        "class",
      ],
    },

    allowedStyles: {
      "*": {
        "font-family": [
          /^[a-zA-Z0-9 ,'"-]+$/,
        ],

        "font-size": [
          /^\d+(px|pt|em|rem|%)$/,
        ],

        "text-align": [
          /^(left|center|right|justify)$/,
        ],

        color: [
          /^#[0-9a-fA-F]{3,8}$/,
          /^rgb/,
          /^rgba/,
        ],
      },
    },

    allowedSchemes: [
      "http",
      "https",
      "mailto",
    ],

    allowProtocolRelative: false,
  });
};

/* ==========================================================================
   UNIQUE SLUG
========================================================================== */

const getUniqueSlug = async (
  title,
  excludeId = null
) => {
  const baseSlug = makeSlug(title);

  let slug = baseSlug || `content-${Date.now()}`;
  let counter = 1;

  while (true) {
    const query = { slug };

    if (excludeId) {
      query._id = {
        $ne: excludeId,
      };
    }

    const exists = await Story.exists(query);

    if (!exists) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

/* ==========================================================================
   PUBLIC LIST
========================================================================== */

export const getPublicStories = asyncHandler(
  async (req, res) => {
    const {
      type = "all",
      page = 1,
      limit = 12,
      featured = "false",
    } = req.query;

    const currentPage = Math.max(
      1,
      Number(page) || 1
    );

    const pageLimit = Math.min(
      50,
      Math.max(1, Number(limit) || 12)
    );

    const filter = {
      status: "published",
    };

    if (
      type === "story" ||
      type === "poem"
    ) {
      filter.contentType = type;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    const skip =
      (currentPage - 1) * pageLimit;

    const [items, total] =
      await Promise.all([
        Story.find(filter)
          .populate(
            "author",
            "name avatar"
          )
          .sort({
            publishedAt: -1,
            createdAt: -1,
          })
          .skip(skip)
          .limit(pageLimit)
          .select(
            "-__v"
          ),

        Story.countDocuments(filter),
      ]);

    return res.status(200).json({
      success: true,
      count: items.length,
      total,
      page: currentPage,
      pages: Math.ceil(
        total / pageLimit
      ),
      data: items,
    });
  }
);

/* ==========================================================================
   PUBLIC SINGLE STORY / POEM
========================================================================== */

export const getPublicStoryBySlug =
  asyncHandler(async (req, res) => {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug is required.",
      });
    }

    const item =
      await Story.findOne({
        slug,
        status: "published",
      }).populate(
        "author",
        "name avatar"
      );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "Story or poem not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: item,
    });
  });

/* ==========================================================================
   ADMIN LIST
========================================================================== */

export const getAdminStories =
  asyncHandler(async (req, res) => {
    const {
      type = "all",
      status = "all",
    } = req.query;

    const filter = {};

    if (
      type === "story" ||
      type === "poem"
    ) {
      filter.contentType = type;
    }

    if (
      status === "draft" ||
      status === "published"
    ) {
      filter.status = status;
    }

    const stories =
      await Story.find(filter)
        .populate(
          "author",
          "name email avatar"
        )
        .sort({
          updatedAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  });

/* ==========================================================================
   ADMIN SINGLE
========================================================================== */

/* =========================================================
   ADMIN SINGLE STORY / POEM
========================================================= */

export const getAdminStory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("GET ADMIN STORY:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid story ID",
    });
  }

  const story = await Story.findById(id)
    .populate("author", "name email avatar")
    .lean();

  if (!story) {
    return res.status(404).json({
      success: false,
      message: "Story or poem not found",
    });
  }

  /*
   * Backward-compatible PDF response.
   * This makes the frontend work whether it uses
   * originalPdfUrl or pdfUrl.
   */

  const normalizedStory = {
    ...story,

    pdfUrl: story.originalPdfUrl || "",
    pdfName: story.originalPdfName || "",
    pdfSize: story.originalPdfSize || 0,

    originalPdfUrl: story.originalPdfUrl || "",
    originalPdfName: story.originalPdfName || "",
    originalPdfSize: story.originalPdfSize || 0,

    pdfAvailable:
      Boolean(story.originalPdfUrl) ||
      Boolean(story.pdfAvailable),
  };

  return res.status(200).json({
    success: true,
    data: normalizedStory,
  });
});
/* ==========================================================================
   CREATE
========================================================================== */
/* =========================================================
   CREATE STORY / POEM
========================================================= */

export const createStory = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    content,
    contentType,
    coverImage,
    category,
    tags,
    status,
    authorName,
    fontFamily,
    fontSize,
    editorFontFamily,
    editorFontSize,
    isFeatured,
    allowComments,

    // PDF
    pdfUrl,
    pdfName,
    pdfSize,
    pdfAvailable,
    originalPdfUrl,
    originalPdfName,
    originalPdfSize,

    seoTitle,
    seoDescription,
    wordCount,
    readingTime,
  } = req.body;

  /* -----------------------------
     VALIDATION
  ----------------------------- */

  if (!title?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Title is required.",
    });
  }

  if (!content?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Content is required.",
    });
  }

  if (!["story", "poem"].includes(contentType)) {
    return res.status(400).json({
      success: false,
      message: "Content type must be story or poem.",
    });
  }

  /* -----------------------------
     SLUG
  ----------------------------- */

  const slug = await getUniqueSlug(title);

  /* -----------------------------
     NORMALIZE PDF
  ----------------------------- */

  const finalPdfUrl =
    originalPdfUrl?.trim() ||
    pdfUrl?.trim() ||
    "";

  const finalPdfName =
    originalPdfName?.trim() ||
    pdfName?.trim() ||
    "";

  const finalPdfSize =
    Number(originalPdfSize) ||
    Number(pdfSize) ||
    0;

  const finalPdfAvailable =
    Boolean(finalPdfUrl) ||
    Boolean(pdfAvailable);

  /* -----------------------------
     CREATE
  ----------------------------- */

  const story = await Story.create({
    title: title.trim(),

    slug,

    excerpt: excerpt?.trim() || "",

    content: sanitizeContent(content),

    contentType,

    coverImage: coverImage?.trim() || "",

    category: category?.trim() || "",

    tags: Array.isArray(tags)
      ? tags
          .map((tag) =>
            String(tag).trim().toLowerCase()
          )
          .filter(Boolean)
      : [],

    status:
      status === "published"
        ? "published"
        : "draft",

    author:
      req.admin?._id ||
      req.admin?.id ||
      null,

    authorName:
      authorName?.trim() ||
      "Prosper Foundation",

    fontFamily:
      fontFamily ||
      editorFontFamily ||
      "Georgia",

    fontSize:
      Number(fontSize) ||
      Number(editorFontSize) ||
      18,

    isFeatured:
      Boolean(isFeatured),

    allowComments:
      allowComments !== false,

    /* -----------------------------
       PDF
    ----------------------------- */

    originalPdfUrl:
      finalPdfUrl,

    originalPdfName:
      finalPdfName,

    originalPdfSize:
      finalPdfSize,

    pdfAvailable:
      finalPdfAvailable,

    /* -----------------------------
       SEO
    ----------------------------- */

    seoTitle:
      seoTitle?.trim() || "",

    seoDescription:
      seoDescription?.trim() || "",

    wordCount:
      Number(wordCount) || 0,

    readingTime:
      Number(readingTime) || 1,

    publishedAt:
      status === "published"
        ? new Date()
        : null,
  });

  return res.status(201).json({
    success: true,

    message:
      story.status === "published"
        ? "Published successfully."
        : "Draft saved successfully.",

    data: {
      ...story.toObject(),

      // Compatibility for frontend
      pdfUrl:
        story.originalPdfUrl,

      pdfName:
        story.originalPdfName,

      pdfSize:
        story.originalPdfSize,
    },
  });
});

/* ==========================================================================
   UPDATE
========================================================================== */

export const updateStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findById(
        req.params.id
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Story or poem not found.",
      });
    }

    const {
      title,
      excerpt,
      content,
      contentType,
      coverImage,
      category,
      tags,
      status,
      authorName,
      fontFamily,
      fontSize,
      isFeatured,
      allowComments,

      originalPdfUrl,
      originalPdfName,
      originalPdfSize,
      pdfAvailable,

      seoTitle,
      seoDescription,
    } = req.body;

    /* TITLE */

    if (
      title !== undefined &&
      title.trim()
    ) {
      story.title =
        title.trim();

      story.slug =
        await getUniqueSlug(
          title,
          story._id
        );
    }

    /* CONTENT */

    if (excerpt !== undefined) {
      story.excerpt =
        String(excerpt).trim();
    }

    if (content !== undefined) {
      story.content =
        sanitizeContent(content);
    }

    /* TYPE */

    if (
      contentType === "story" ||
      contentType === "poem"
    ) {
      story.contentType =
        contentType;
    }

    /* DESIGN */

    if (
      coverImage !== undefined
    ) {
      story.coverImage =
        coverImage;
    }

    if (
      category !== undefined
    ) {
      story.category =
        category;
    }

    if (Array.isArray(tags)) {
      story.tags =
        tags
          .map((tag) =>
            String(tag)
              .trim()
              .toLowerCase()
          )
          .filter(Boolean);
    }

    if (
      authorName !== undefined
    ) {
      story.authorName =
        authorName;
    }

    if (
      fontFamily !== undefined
    ) {
      story.fontFamily =
        fontFamily;
    }

    if (
      fontSize !== undefined
    ) {
      story.fontSize =
        Number(fontSize) || 18;
    }

    if (
      isFeatured !== undefined
    ) {
      story.isFeatured =
        Boolean(isFeatured);
    }

    if (
      allowComments !== undefined
    ) {
      story.allowComments =
        Boolean(allowComments);
    }

    /* PDF */

    if (
      originalPdfUrl !== undefined
    ) {
      story.originalPdfUrl =
        originalPdfUrl;
    }

    if (
      originalPdfName !== undefined
    ) {
      story.originalPdfName =
        originalPdfName;
    }

    if (
      originalPdfSize !== undefined
    ) {
      story.originalPdfSize =
        Number(originalPdfSize) || 0;
    }

    if (
      pdfAvailable !== undefined
    ) {
      story.pdfAvailable =
        Boolean(pdfAvailable);
    }

    /* SEO */

    if (
      seoTitle !== undefined
    ) {
      story.seoTitle =
        seoTitle;
    }

    if (
      seoDescription !== undefined
    ) {
      story.seoDescription =
        seoDescription;
    }

    /* STATUS */

    if (status === "draft") {
      story.status = "draft";
      story.publishedAt = null;
    }

    if (status === "published") {
      story.status = "published";

      if (!story.publishedAt) {
        story.publishedAt =
          new Date();
      }
    }

    await story.save();

    return res.status(200).json({
      success: true,
      message:
        story.status === "published"
          ? "Published successfully."
          : "Draft saved successfully.",
      data: story,
    });
  });

/* ==========================================================================
   PUBLISH
========================================================================== */

export const publishStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findById(
        req.params.id
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Story or poem not found.",
      });
    }

    story.status = "published";
    story.publishedAt = new Date();

    await story.save();

    return res.status(200).json({
      success: true,
      message:
        "Published successfully.",
      data: story,
    });
  });

/* ==========================================================================
   UNPUBLISH
========================================================================== */

export const unpublishStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findById(
        req.params.id
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Story or poem not found.",
      });
    }

    story.status = "draft";
    story.publishedAt = null;

    await story.save();

    return res.status(200).json({
      success: true,
      message:
        "Moved back to draft.",
      data: story,
    });
  });

/* ==========================================================================
   DELETE
========================================================================== */

export const deleteStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findByIdAndDelete(
        req.params.id
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Story or poem not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Deleted successfully.",
    });
  });

/* ==========================================================================
   LIKE
========================================================================== */

export const likeStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findOneAndUpdate(
        {
          _id: req.params.id,
          status: "published",
        },
        {
          $inc: {
            likes: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Published content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      likes: story.likes,
    });
  });

/* ==========================================================================
   DISLIKE
========================================================================== */

export const dislikeStory =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findOneAndUpdate(
        {
          _id: req.params.id,
          status: "published",
        },
        {
          $inc: {
            dislikes: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Published content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      dislikes: story.dislikes,
    });
  });

/* ==========================================================================
   VIEW
========================================================================== */

export const registerStoryView =
  asyncHandler(async (req, res) => {
    const story =
      await Story.findOneAndUpdate(
        {
          _id: req.params.id,
          status: "published",
        },
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!story) {
      return res.status(404).json({
        success: false,
        message:
          "Published content not found.",
      });
    }

    return res.status(200).json({
      success: true,
      views: story.views,
    });
  });

/* ==========================================================================
   HTML ESCAPE
========================================================================== */

const escapeHtml = (value = "") => {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
};

/* ==========================================================================
   PDF TEXT → HTML
========================================================================== */

const pdfTextToHtml = (
  text,
  contentType = "story"
) => {
  const normalized =
    String(text || "")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n");

  if (!normalized.trim()) {
    return "";
  }

  /* POEM */

  if (contentType === "poem") {
    const lines =
      normalized.split("\n");

    let html = "";

    for (const rawLine of lines) {
      const line =
        rawLine.trim();

      if (!line) {
        html +=
          `<div class="poem-space"></div>`;
      } else {
        html += `
          <p class="poem-line">
            ${escapeHtml(line)}
          </p>
        `;
      }
    }

    return html;
  }

  /* STORY */

  const paragraphs =
    normalized
      .split(/\n\s*\n/)
      .map((paragraph) =>
        paragraph
          .replace(/\n/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      )
      .filter(Boolean);

  return paragraphs
    .map(
      (paragraph) =>
        `<p>${escapeHtml(
          paragraph
        )}</p>`
    )
    .join("\n");
};

/* ==========================================================================
   WORD COUNT
========================================================================== */

const calculateWordCount = (
  html = ""
) => {
  const text =
    html
      .replace(
        /<[^>]+>/g,
        " "
      )
      .replace(
        /&nbsp;/g,
        " "
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();

  return text
    ? text.split(" ").length
    : 0;
};

/* ==========================================================================
   READING TIME
========================================================================== */

const calculateReadingTime = (
  wordCount
) => {
  return Math.max(
    1,
    Math.ceil(
      Number(wordCount || 0) /
        200
    )
  );
};

/* ==========================================================================
   UPLOAD PDF + EXTRACT TEXT
========================================================================== */

export const uploadStoryPdfAndExtract =
  async (req, res) => {
    let parser = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a PDF file.",
        });
      }

      const contentType =
        req.body.contentType ===
        "poem"
          ? "poem"
          : "story";

      const filePath =
        req.file.path;

      if (
        !fs.existsSync(filePath)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Uploaded PDF file could not be found.",
        });
      }

      const buffer =
        fs.readFileSync(filePath);

      /*
       * IMPORTANT:
       * pdf-parse v2 uses PDFParse.
       */

      parser = new PDFParse({
        data: buffer,
      });

      const textResult =
        await parser.getText();

      const extractedText =
        textResult?.text || "";

      if (!extractedText.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "No readable text was found in this PDF. If the PDF contains scanned images only, OCR is required.",
        });
      }

      const htmlContent =
        pdfTextToHtml(
          extractedText,
          contentType
        );

      const wordCount =
        calculateWordCount(
          htmlContent
        );

      const readingTime =
        calculateReadingTime(
          wordCount
        );

      let pageCount = 0;

      try {
        const infoResult =
          await parser.getInfo({
            parsePageInfo: true,
          });

        pageCount =
          Number(
            infoResult?.total
          ) || 0;
      } catch (infoError) {
        console.warn(
          "Could not read PDF page count:",
          infoError.message
        );
      }

      const relativePath =
        `/uploads/stories/pdf/${req.file.filename}`;

      const pdfUrl =
        `${req.protocol}://${req.get(
          "host"
        )}${relativePath}`;

      return res.status(200).json({
        success: true,

        message:
          "PDF uploaded and text extracted successfully.",

        data: {
          content:
            htmlContent,

          plainText:
            extractedText,

          originalPdfUrl:
            pdfUrl,

          originalPdfName:
            req.file.originalname,

          originalPdfSize:
            req.file.size,

          pdfAvailable: true,

          wordCount,

          readingTime,

          pageCount,

          contentType,
        },
      });
    } catch (error) {
      console.error(
        "PDF upload/extraction error:",
        error
      );

      if (
        req.file?.path &&
        fs.existsSync(
          req.file.path
        )
      ) {
        try {
          fs.unlinkSync(
            req.file.path
          );
        } catch (deleteError) {
          console.error(
            "Could not remove uploaded PDF:",
            deleteError
          );
        }
      }

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to process PDF.",
      });
    } finally {
      if (parser) {
        try {
          await parser.destroy();
        } catch (destroyError) {
          console.warn(
            "PDF parser cleanup failed:",
            destroyError.message
          );
        }
      }
    }
  };

/* ==========================================================================
   UPLOAD IMAGE
========================================================================== */

export const uploadStoryImage =
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please select an image.",
        });
      }

      const relativePath =
        `/uploads/stories/images/${req.file.filename}`;

      const imageUrl =
        `${req.protocol}://${req.get(
          "host"
        )}${relativePath}`;

      return res.status(200).json({
        success: true,

        message:
          "Image uploaded successfully.",

        data: {
          imageUrl,

          fileName:
            req.file.originalname,

          size:
            req.file.size,
        },
      });
    } catch (error) {
      console.error(
        "Image upload error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Unable to upload image.",
      });
    }
  };