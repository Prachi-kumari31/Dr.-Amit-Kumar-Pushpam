import Testimonial from "../models/Testimonial.js";

// ============================================
// PUBLIC - Get approved testimonials
// ============================================
export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "approved",
    })
      .sort({ approvedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.error("Get approved testimonials error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// ============================================
// PUBLIC - Submit testimonial
// ============================================
export const createTestimonial = async (req, res) => {
  try {
    const {
      name,
      service,
      message,
      rating,
    } = req.body;

    // Validation
    if (!name || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const testimonial = await Testimonial.create({
      name,
      service,
      message,
      rating: rating || 5,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Thank you for your testimonial. It will be visible after admin approval.",
      testimonial: {
        id: testimonial._id,
        name: testimonial.name,
        status: testimonial.status,
      },
    });
  } catch (error) {
    console.error("Create testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit testimonial",
    });
  }
};

// ============================================
// ADMIN - Get all testimonials
// ============================================
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.error("Get all testimonials error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// ============================================
// ADMIN - Get pending testimonials
// ============================================
export const getPendingTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    console.error("Get pending testimonials error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pending testimonials",
    });
  }
};

// ============================================
// ADMIN - Approve testimonial
// ============================================
export const approveTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial approved successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Approve testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to approve testimonial",
    });
  }
};

// ============================================
// ADMIN - Reject testimonial
// ============================================
export const rejectTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status: "rejected",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial rejected successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Reject testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reject testimonial",
    });
  }
};

// ============================================
// ADMIN - Delete testimonial
// ============================================
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};