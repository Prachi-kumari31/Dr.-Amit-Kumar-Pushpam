import Poem from "../models/Poem.js";


// ADMIN - GET ALL

export const getAdminPoems = async (req, res) => {
  try {
    const poems = await Poem.find()
      .populate("author", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: poems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUBLIC - GET PUBLISHED

export const getPublishedPoems = async (req, res) => {
  try {
    const poems = await Poem.find({
      status: "published",
    })
      .populate("author", "name username")
      .sort({ publishedAt: -1 });

    res.status(200).json({
      success: true,
      data: poems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PUBLIC - SINGLE POEM

export const getPoemById = async (req, res) => {
  try {
    const poem = await Poem.findOne({
      _id: req.params.id,
      status: "published",
    }).populate("author", "name username");

    if (!poem) {
      return res.status(404).json({
        success: false,
        message: "Poem not found",
      });
    }

    poem.views += 1;
    await poem.save();

    res.status(200).json({
      success: true,
      data: poem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADMIN - CREATE

export const createPoem = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      coverImage,
      status,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const poem = await Poem.create({
      title,
      excerpt,
      content,
      coverImage: coverImage || "",
      status: status || "draft",
      author: req.admin.id,
      publishedAt:
        status === "published"
          ? new Date()
          : null,
    });

    res.status(201).json({
      success: true,
      message: "Poem created successfully",
      data: poem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADMIN - UPDATE

export const updatePoem = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      coverImage,
      status,
    } = req.body;

    const poem =
      await Poem.findById(req.params.id);

    if (!poem) {
      return res.status(404).json({
        success: false,
        message: "Poem not found",
      });
    }

    poem.title = title;
    poem.excerpt = excerpt;
    poem.content = content;

    if (coverImage) {
      poem.coverImage = coverImage;
    }

    if (
      status === "published" &&
      poem.status !== "published"
    ) {
      poem.publishedAt = new Date();
    }

    poem.status = status;

    await poem.save();

    res.status(200).json({
      success: true,
      message: "Poem updated successfully",
      data: poem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADMIN - DELETE

export const deletePoem = async (req, res) => {
  try {
    const poem =
      await Poem.findById(req.params.id);

    if (!poem) {
      return res.status(404).json({
        success: false,
        message: "Poem not found",
      });
    }

    await poem.deleteOne();

    res.status(200).json({
      success: true,
      message: "Poem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};