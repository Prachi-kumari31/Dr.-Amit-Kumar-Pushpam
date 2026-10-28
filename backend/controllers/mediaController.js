import fs from "fs";
import path from "path";
import Media from "../models/Media.js";

/*
|--------------------------------------------------------------------------
| Determine media type
|--------------------------------------------------------------------------
*/

const getFileType = (file) => {
  if (!file?.mimetype) {
    return null;
  }

  if (file.mimetype.startsWith("image/")) {
    return "image";
  }

  if (file.mimetype.startsWith("video/")) {
    return "video";
  }

  return null;
};

/*
|--------------------------------------------------------------------------
| GET PUBLIC MEDIA
|--------------------------------------------------------------------------
*/

export const getPublicMedia = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      category,
      search,
      featured,
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number(page) || 1
    );

    const limitNumber = Math.min(
      50,
      Math.max(1, Number(limit) || 20)
    );

    const filter = {
      status: "published",
    };

    if (
      type &&
      ["image", "video"].includes(type)
    ) {
      filter.type = type;
    }

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
          description: {
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

    const total =
      await Media.countDocuments(filter);

    const media =
      await Media.find(filter)
        .sort({
          isFeatured: -1,
          createdAt: -1,
        })
        .skip(
          (pageNumber - 1) *
            limitNumber
        )
        .limit(limitNumber)
        .lean();

    return res.status(200).json({
      success: true,
      data: media,
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
      "getPublicMedia:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch media.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET CATEGORIES
|--------------------------------------------------------------------------
*/

export const getMediaCategories = async (
  req,
  res
) => {
  try {
    const categories =
      await Media.distinct(
        "category",
        {
          status: "published",
        }
      );

    return res.json({
      success: true,
      data: categories.filter(Boolean),
    });
  } catch (error) {
    console.error(
      "getMediaCategories:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch categories.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET ADMIN MEDIA
|--------------------------------------------------------------------------
*/

export const getAdminMedia = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 30,
      type,
      category,
      status,
      search,
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number(page) || 1
    );

    const limitNumber = Math.min(
      100,
      Math.max(1, Number(limit) || 30)
    );

    const filter = {};

    if (
      type &&
      ["image", "video"].includes(type)
    ) {
      filter.type = type;
    }

    if (
      status &&
      ["draft", "published"].includes(status)
    ) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
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
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const total =
      await Media.countDocuments(filter);

    const media =
      await Media.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(
          (pageNumber - 1) *
            limitNumber
        )
        .limit(limitNumber)
        .populate(
          "uploadedBy",
          "name email username"
        )
        .lean();

    return res.json({
      success: true,
      data: media,
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
      "getAdminMedia:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch admin media.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| GET SINGLE MEDIA
|--------------------------------------------------------------------------
*/

export const getMediaById = async (
  req,
  res
) => {
  try {
    const media =
      await Media.findById(
        req.params.id
      ).lean();

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found.",
      });
    }

    return res.json({
      success: true,
      data: media,
    });
  } catch (error) {
    console.error(
      "getMediaById:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch media.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE MEDIA
|--------------------------------------------------------------------------
*/

export const createMedia = async (
  req,
  res
) => {
  let uploadedFile = null;

  try {
    console.log("\n==============================");
    console.log("CREATE MEDIA REQUEST");
    console.log("==============================");

    console.log("Body:", req.body);
    console.log("File:", req.file);

    uploadedFile = req.file;

    /*
    |--------------------------------------------------------------------------
    | Check file
    |--------------------------------------------------------------------------
    */

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message:
          "No media file received by server.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Get form values
    |--------------------------------------------------------------------------
    */

    const {
      title,
      description = "",
      category = "General",
      tags = "",
      isFeatured = "false",
      status = "published",
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | Validate title
    |--------------------------------------------------------------------------
    */

    if (
      typeof title !== "string" ||
      !title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Media title is required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Determine image/video
    |--------------------------------------------------------------------------
    */

    const type =
      getFileType(uploadedFile);

    if (!type) {
      return res.status(400).json({
        success: false,
        message:
          "Unable to determine media type.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Validate file size
    |--------------------------------------------------------------------------
    */

    const maxSize =
      type === "image"
        ? 10 * 1024 * 1024
        : 100 * 1024 * 1024;

    if (uploadedFile.size > maxSize) {
      return res.status(400).json({
        success: false,
        message:
          type === "image"
            ? "Image must be 10 MB or smaller."
            : "Video must be 100 MB or smaller.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Build URL
    |--------------------------------------------------------------------------
    */

    const folder =
      type === "image"
        ? "images"
        : "videos";

    const url =
      `/uploads/media/${folder}/${uploadedFile.filename}`;

    /*
    |--------------------------------------------------------------------------
    | Parse tags
    |--------------------------------------------------------------------------
    */

    let parsedTags = [];

    if (Array.isArray(tags)) {
      parsedTags = tags
        .map((tag) =>
          String(tag).trim()
        )
        .filter(Boolean);
    } else if (
      typeof tags === "string"
    ) {
      parsedTags = tags
        .split(",")
        .map((tag) =>
          tag.trim()
        )
        .filter(Boolean);
    }

    /*
    |--------------------------------------------------------------------------
    | Create database record
    |--------------------------------------------------------------------------
    */

    const media =
      await Media.create({
        title: title.trim(),

        description:
          typeof description === "string"
            ? description.trim()
            : "",

        type,

        url,

        filename:
          uploadedFile.filename,

        originalName:
          uploadedFile.originalname,

        mimeType:
          uploadedFile.mimetype,

        size:
          uploadedFile.size,

        category:
          typeof category === "string"
            ? category.trim() || "General"
            : "General",

        tags: parsedTags,

        isFeatured:
          isFeatured === true ||
          isFeatured === "true",

        status:
          status === "draft"
            ? "draft"
            : "published",

        uploadedBy:
          req.user?._id ||
          req.user?.id ||
          req.admin?._id ||
          req.admin?.id ||
          null,
      });

    console.log(
      "MEDIA CREATED:",
      media._id
    );

    console.log(
      "MEDIA URL:",
      url
    );

    console.log("==============================\n");

    return res.status(201).json({
      success: true,
      message:
        "Media uploaded successfully.",
      data: media,
    });
  } catch (error) {
    console.error(
      "createMedia ERROR:",
      error
    );

    /*
    |--------------------------------------------------------------------------
    | Delete uploaded file if DB operation fails
    |--------------------------------------------------------------------------
    */

    if (uploadedFile?.path) {
      try {
        if (
          fs.existsSync(
            uploadedFile.path
          )
        ) {
          fs.unlinkSync(
            uploadedFile.path
          );
        }
      } catch (deleteError) {
        console.error(
          "Failed to delete uploaded file:",
          deleteError
        );
      }
    }

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to upload media.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| UPDATE MEDIA
|--------------------------------------------------------------------------
*/

export const updateMedia = async (
  req,
  res
) => {
  try {
    const media =
      await Media.findById(
        req.params.id
      );

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found.",
      });
    }

    const {
      title,
      description,
      category,
      tags,
      isFeatured,
      status,
    } = req.body;

    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Media title cannot be empty.",
        });
      }

      media.title = title.trim();
    }

    if (
      description !== undefined
    ) {
      media.description =
        String(description).trim();
    }

    if (
      category !== undefined
    ) {
      media.category =
        String(category).trim() ||
        "General";
    }

    if (tags !== undefined) {
      if (Array.isArray(tags)) {
        media.tags = tags
          .map((tag) =>
            String(tag).trim()
          )
          .filter(Boolean);
      } else {
        media.tags = String(tags)
          .split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(Boolean);
      }
    }

    if (
      isFeatured !== undefined
    ) {
      media.isFeatured =
        isFeatured === true ||
        isFeatured === "true";
    }

    if (status !== undefined) {
      media.status =
        status === "draft"
          ? "draft"
          : "published";
    }

    await media.save();

    return res.json({
      success: true,
      message:
        "Media updated successfully.",
      data: media,
    });
  } catch (error) {
    console.error(
      "updateMedia:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update media.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE MEDIA
|--------------------------------------------------------------------------
*/

export const deleteMedia = async (
  req,
  res
) => {
  try {
    const media =
      await Media.findById(
        req.params.id
      );

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found.",
      });
    }

    if (media.filename) {
      const folder =
        media.type === "image"
          ? "images"
          : "videos";

      const filePath = path.join(
        process.cwd(),
        "uploads",
        "media",
        folder,
        media.filename
      );

      try {
        if (
          fs.existsSync(filePath)
        ) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error(
          "File deletion failed:",
          fileError
        );
      }
    }

    await media.deleteOne();

    return res.json({
      success: true,
      message:
        "Media deleted successfully.",
    });
  } catch (error) {
    console.error(
      "deleteMedia:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete media.",
    });
  }
};