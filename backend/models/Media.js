import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      default: "",
    },

    originalName: {
      type: String,
      default: "",
    },

    mimeType: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
      index: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published",
      ],
      default: "published",
      index: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({
  type: 1,
  status: 1,
  createdAt: -1,
});

mediaSchema.index({
  category: 1,
  status: 1,
});

export default mongoose.model(
  "Media",
  mediaSchema
);