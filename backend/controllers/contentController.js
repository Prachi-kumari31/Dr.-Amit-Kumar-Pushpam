import Content from "../models/Content.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/*
|--------------------------------------------------------------------------
| PUBLIC - GET CONTENT
|--------------------------------------------------------------------------
*/

export const getPublishedContent =
  asyncHandler(async (req, res) => {
    const {
      type,
      search,
      page = 1,
      limit = 9,
    } = req.query;

    const query = {
      status: "published",
    };

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
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
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const pageNumber =
      Math.max(
        1,
        parseInt(page)
      );

    const limitNumber =
      Math.min(
        50,
        Math.max(
          1,
          parseInt(limit)
        )
      );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const [
      contents,
      total,
    ] = await Promise.all([
      Content.find(query)
        .populate(
          "author",
          "fullName username profilePicture"
        )
        .select(
          "-likedBy -dislikedBy"
        )
        .sort({
          publishedAt: -1,
        })
        .skip(skip)
        .limit(limitNumber)
        .lean(),

      Content.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: contents,

      pagination: {
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  });

/*
|--------------------------------------------------------------------------
| PUBLIC - GET SINGLE CONTENT
|--------------------------------------------------------------------------
*/

export const getContentBySlug =
  asyncHandler(async (req, res) => {
    const content =
      await Content.findOne({
        slug: req.params.slug,
        status: "published",
      })
        .populate(
          "author",
          "fullName username profilePicture bio"
        )
        .select(
          "-likedBy -dislikedBy"
        );

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    await Content.findByIdAndUpdate(
      content._id,
      {
        $inc: {
          views: 1,
        },
      }
    );

    res.status(200).json({
      success: true,
      data: content,
    });
  });

/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL CONTENT
|--------------------------------------------------------------------------
*/

export const getAdminContent =
  asyncHandler(async (req, res) => {
    const {
      type,
      status,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    const pageNumber =
      Math.max(
        1,
        parseInt(page)
      );

    const limitNumber =
      Math.min(
        50,
        Math.max(
          1,
          parseInt(limit)
        )
      );

    const skip =
      (pageNumber - 1) *
      limitNumber;

    const [
      contents,
      total,
    ] = await Promise.all([
      Content.find(query)
        .populate(
          "author",
          "fullName username email"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber),

      Content.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: contents,

      pagination: {
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  });

/*
|--------------------------------------------------------------------------
| ADMIN - CREATE
|--------------------------------------------------------------------------
*/

export const createContent =
  asyncHandler(async (req, res) => {
    const {
      title,
      type,
      excerpt,
      content,
      coverImage,
      fileUrl,
      externalUrl,
      category,
      tags,
      status,
      isFeatured,
    } = req.body;

    if (
      !title ||
      !type ||
      !excerpt ||
      !content
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, type, excerpt and content are required",
      });
    }

    const existing =
      await Content.findOne({
        title,
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Content with this title already exists",
      });
    }

    const publishStatus =
      status === "published"
        ? "published"
        : "draft";

    const contentItem =
      await Content.create({
        title,
        type,
        excerpt,
        content,

        coverImage:
          coverImage || "",

        fileUrl:
          fileUrl || "",

        externalUrl:
          externalUrl || "",

        category:
          category || "",

        tags: Array.isArray(tags)
          ? tags
          : typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) =>
                tag.trim()
              )
              .filter(Boolean)
          : [],

        status:
          publishStatus,

        isFeatured:
          Boolean(isFeatured),

        publishedAt:
          publishStatus ===
          "published"
            ? new Date()
            : null,

        author: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Admin",
           required: true,
        },
      });

    res.status(201).json({
      success: true,
      message:
        publishStatus ===
        "published"
          ? "Content published successfully"
          : "Content saved as draft",

      data: contentItem,
    });
  });

/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE
|--------------------------------------------------------------------------
*/

export const updateContent =
  asyncHandler(async (req, res) => {
    const content =
      await Content.findById(
        req.params.id
      );

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    const {
      title,
      type,
      excerpt,
      content: bodyContent,
      coverImage,
      fileUrl,
      externalUrl,
      category,
      tags,
      status,
      isFeatured,
    } = req.body;

    if (title !== undefined) {
      content.title = title;
    }

    if (type !== undefined) {
      content.type = type;
    }

    if (excerpt !== undefined) {
      content.excerpt =
        excerpt;
    }

    if (
      bodyContent !== undefined
    ) {
      content.content =
        bodyContent;
    }

    if (
      coverImage !== undefined
    ) {
      content.coverImage =
        coverImage;
    }

    if (fileUrl !== undefined) {
      content.fileUrl =
        fileUrl;
    }

    if (
      externalUrl !== undefined
    ) {
      content.externalUrl =
        externalUrl;
    }

    if (category !== undefined) {
      content.category =
        category;
    }

    if (tags !== undefined) {
      content.tags =
        Array.isArray(tags)
          ? tags
          : tags
              .split(",")
              .map((tag) =>
                tag.trim()
              )
              .filter(Boolean);
    }

    if (
      isFeatured !== undefined
    ) {
      content.isFeatured =
        Boolean(isFeatured);
    }

    if (status !== undefined) {
      if (
        status === "published" &&
        content.status !==
          "published"
      ) {
        content.publishedAt =
          new Date();
      }

      if (
        status === "draft"
      ) {
        content.publishedAt =
          null;
      }

      content.status = status;
    }

    await content.save();

    res.status(200).json({
      success: true,
      message:
        "Content updated successfully",
      data: content,
    });
  });

/*
|--------------------------------------------------------------------------
| ADMIN - DELETE
|--------------------------------------------------------------------------
*/

export const deleteContent =
  asyncHandler(async (req, res) => {
    const content =
      await Content.findById(
        req.params.id
      );

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    await Content.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Content deleted successfully",
    });
  });

/*
|--------------------------------------------------------------------------
| LIKE
|--------------------------------------------------------------------------
*/

export const likeContent =
  asyncHandler(async (req, res) => {
    const content =
      await Content.findById(
        req.params.id
      );

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    const userId =
      req.user._id.toString();

    const alreadyLiked =
      content.likedBy.some(
        (id) =>
          id.toString() ===
          userId
      );

    const dislikedIndex =
      content.dislikedBy.findIndex(
        (id) =>
          id.toString() ===
          userId
      );

    if (alreadyLiked) {
      content.likedBy =
        content.likedBy.filter(
          (id) =>
            id.toString() !==
            userId
        );

      content.likes = Math.max(
        0,
        content.likes - 1
      );
    } else {
      content.likedBy.push(
        req.user._id
      );

      content.likes += 1;

      if (
        dislikedIndex !== -1
      ) {
        content.dislikedBy.splice(
          dislikedIndex,
          1
        );

        content.dislikes =
          Math.max(
            0,
            content.dislikes - 1
          );
      }
    }

    await content.save();

    res.status(200).json({
      success: true,

      data: {
        likes: content.likes,
        dislikes:
          content.dislikes,

        liked: !alreadyLiked,
        disliked:
          content.dislikedBy.some(
            (id) =>
              id.toString() ===
              userId
          ),
      },
    });
  });

/*
|--------------------------------------------------------------------------
| DISLIKE
|--------------------------------------------------------------------------
*/

export const dislikeContent =
  asyncHandler(async (req, res) => {
    const content =
      await Content.findById(
        req.params.id
      );

    if (!content) {
      return res.status(404).json({
        success: false,
        message:
          "Content not found",
      });
    }

    const userId =
      req.user._id.toString();

    const alreadyDisliked =
      content.dislikedBy.some(
        (id) =>
          id.toString() ===
          userId
      );

    const likedIndex =
      content.likedBy.findIndex(
        (id) =>
          id.toString() ===
          userId
      );

    if (alreadyDisliked) {
      content.dislikedBy =
        content.dislikedBy.filter(
          (id) =>
            id.toString() !==
            userId
        );

      content.dislikes =
        Math.max(
          0,
          content.dislikes - 1
        );
    } else {
      content.dislikedBy.push(
        req.user._id
      );

      content.dislikes += 1;

      if (likedIndex !== -1) {
        content.likedBy.splice(
          likedIndex,
          1
        );

        content.likes =
          Math.max(
            0,
            content.likes - 1
          );
      }
    }

    await content.save();

    res.status(200).json({
      success: true,

      data: {
        likes: content.likes,
        dislikes:
          content.dislikes,

        liked:
          content.likedBy.some(
            (id) =>
              id.toString() ===
              userId
          ),

        disliked:
          !alreadyDisliked,
      },
    });
  });