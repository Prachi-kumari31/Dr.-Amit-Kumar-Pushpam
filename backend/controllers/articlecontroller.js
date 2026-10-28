import Article from "../models/Article.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const generateUniqueSlug = async (title, existingId = null) => {
  let slug = createSlug(title);

  if (!slug) {
    slug = `article-${Date.now()}`;
  }

  let finalSlug = slug;
  let counter = 1;

  while (true) {
    const query = {
      slug: finalSlug,
    };

    if (existingId) {
      query._id = {
        $ne: existingId,
      };
    }

    const existing = await Article.findOne(query);

    if (!existing) {
      break;
    }

    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  return finalSlug;
};

/* =========================================================
   PUBLIC ARTICLES
========================================================= */

export const getPublicArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      featured,
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number(page)
    );

    const limitNumber = Math.min(
      50,
      Math.max(1, Number(limit))
    );

    const filter = {
      status: "published",
    };

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total = await Article.countDocuments(
      filter
    );

    const articles =
      await Article.find(filter)
        .sort({
          publishedAt: -1,
          createdAt: -1,
        })
        .skip(
          (pageNumber - 1) * limitNumber
        )
        .limit(limitNumber)
        .lean();

    res.status(200).json({
      success: true,
      data: articles,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
      },
    });
  } catch (error) {
    console.error(
      "getPublicArticles:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch articles.",
    });
  }
};

/* =========================================================
   PUBLIC ARTICLE BY SLUG
========================================================= */

export const getPublicArticleBySlug= async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const article =
      await Article.findOne({
        slug,
        status: "published",
      }).lean();

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(
      "getPublicArticleBySlug:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch article.",
    });
  }
};

/* =========================================================
   REGISTER VIEW
========================================================= */

export const registerArticleView = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const article =
      await Article.findOneAndUpdate(
        {
          _id: id,
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

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      views: article.views,
    });
  } catch (error) {
    console.error(
      "registerArticleView:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to register view.",
    });
  }
};

/* =========================================================
   LIKE
========================================================= */

export const likeArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findOneAndUpdate(
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

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      likes: article.likes,
      dislikes: article.dislikes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to like article.",
    });
  }
};

/* =========================================================
   DISLIKE
========================================================= */

export const dislikeArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findOneAndUpdate(
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

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      likes: article.likes,
      dislikes: article.dislikes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to dislike article.",
    });
  }
};

/* =========================================================
   ADMIN - GET ALL
========================================================= */

export const getAdminArticles = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number(page)
    );

    const limitNumber = Math.min(
      100,
      Math.max(1, Number(limit))
    );

    const filter = {};

    if (
      status &&
      ["draft", "published"].includes(status)
    ) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total =
      await Article.countDocuments(
        filter
      );

    const articles =
      await Article.find(filter)
        .sort({
          updatedAt: -1,
        })
        .skip(
          (pageNumber - 1) * limitNumber
        )
        .limit(limitNumber);

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
      },
    });
  } catch (error) {
    console.error(
      "getAdminArticles:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin articles.",
    });
  }
};

/* =========================================================
   ADMIN - GET SINGLE
========================================================= */

export const getAdminArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findById(
        req.params.id
      );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error(
      "getAdminArticle:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch article.",
    });
  }
};

/* =========================================================
   ADMIN - CREATE
========================================================= */

export const createArticle = async (
  req,
  res
) => {
  try {
    const {
      title,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      status,
      isFeatured,
      allowComments,
      authorName,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Article title is required.",
      });
    }

    if (!content?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Article content is required.",
      });
    }

    const slug =
      await generateUniqueSlug(title);

    const article =
      await Article.create({
        title: title.trim(),
        slug,
        excerpt: excerpt || "",
        content,
        coverImage: coverImage || "",
        category: category || "",
        tags: Array.isArray(tags)
          ? tags
          : [],
        status:
          status === "published"
            ? "published"
            : "draft",
        isFeatured:
          Boolean(isFeatured),
        allowComments:
          allowComments !== false,
        authorName:
          authorName ||
          "Prosper Foundation",
        seoTitle:
          seoTitle || "",
        seoDescription:
          seoDescription || "",
        publishedAt:
          status === "published"
            ? new Date()
            : null,
      });

    res.status(201).json({
      success: true,
      message:
        article.status === "published"
          ? "Article published successfully."
          : "Article saved as draft.",
      data: article,
    });
  } catch (error) {
    console.error(
      "createArticle:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create article.",
    });
  }
};

/* =========================================================
   ADMIN - UPDATE
========================================================= */

export const updateArticle  = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findById(
        req.params.id
      );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    const {
      title,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      status,
      isFeatured,
      allowComments,
      authorName,
      seoTitle,
      seoDescription,
    } = req.body;

  const oldTitle = article.title;

if (title !== undefined) {
  article.title = title.trim();

  if (title.trim() !== oldTitle) {
    article.slug =
      await generateUniqueSlug(
        title,
        article._id
      );
  }
}

    if (excerpt !== undefined)
      article.excerpt = excerpt;

    if (content !== undefined)
      article.content = content;

    if (coverImage !== undefined)
      article.coverImage =
        coverImage;

    if (category !== undefined)
      article.category =
        category;

    if (tags !== undefined)
      article.tags =
        Array.isArray(tags)
          ? tags
          : [];

    if (isFeatured !== undefined)
      article.isFeatured =
        Boolean(isFeatured);

    if (allowComments !== undefined)
      article.allowComments =
        Boolean(allowComments);

    if (authorName !== undefined)
      article.authorName =
        authorName;

    if (seoTitle !== undefined)
      article.seoTitle =
        seoTitle;

    if (
      seoDescription !==
      undefined
    )
      article.seoDescription =
        seoDescription;

    if (status !== undefined) {
      article.status =
        status === "published"
          ? "published"
          : "draft";

      if (
        article.status ===
          "published" &&
        !article.publishedAt
      ) {
        article.publishedAt =
          new Date();
      }

      if (
        article.status ===
        "draft"
      ) {
        article.publishedAt =
          null;
      }
    }

    await article.save();

    res.json({
      success: true,
      message:
        article.status === "published"
          ? "Article published successfully."
          : "Article updated successfully.",
      data: article,
    });
  } catch (error) {
    console.error(
      "updateArticle:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update article.",
    });
  }
};

/* =========================================================
   ADMIN - PUBLISH
========================================================= */

export const publishArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findByIdAndUpdate(
        req.params.id,
        {
          status: "published",
          publishedAt: new Date(),
        },
        {
          new: true,
        }
      );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      message:
        "Article published successfully.",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to publish article.",
    });
  }
};

/* =========================================================
   ADMIN - UNPUBLISH
========================================================= */

export const unpublishArticle  = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findByIdAndUpdate(
        req.params.id,
        {
          status: "draft",
          publishedAt: null,
        },
        {
          new: true,
        }
      );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      message:
        "Article moved to draft.",
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to unpublish article.",
    });
  }
};

/* =========================================================
   ADMIN - DELETE
========================================================= */

export const deleteArticle = async (
  req,
  res
) => {
  try {
    const article =
      await Article.findByIdAndDelete(
        req.params.id
      );

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found.",
      });
    }

    res.json({
      success: true,
      message:
        "Article deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to delete article.",
    });
  }
};