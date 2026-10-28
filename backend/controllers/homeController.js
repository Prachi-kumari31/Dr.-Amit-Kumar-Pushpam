import HomeContent from "../models/HomeContent.js";
import Testimonial from "../models/Testimonial.js";

// ============================================
// GET HOME PAGE
// ============================================

export const getHome = async (req, res, next) => {
  try {
    const home = await HomeContent.findOne().lean();

    const testimonials = await Testimonial.find({
      approved: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Home page content not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...home,
        testimonials,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// CREATE HOME CONTENT
// ============================================

export const createHome = async (req, res, next) => {
  try {
    const existingHome = await HomeContent.findOne();

    if (existingHome) {
      return res.status(409).json({
        success: false,
        message: "Home content already exists",
      });
    }

    const home = await HomeContent.create(req.body);

    res.status(201).json({
      success: true,
      message: "Home content created successfully",
      data: home,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// UPDATE HOME CONTENT
// ============================================

export const updateHome = async (req, res, next) => {
  try {
    const home = await HomeContent.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!home) {
      return res.status(404).json({
        success: false,
        message: "Home content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Home content updated successfully",
      data: home,
    });
  } catch (error) {
    next(error);
  }
};