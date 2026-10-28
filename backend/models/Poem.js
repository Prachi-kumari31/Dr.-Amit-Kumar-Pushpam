import mongoose from "mongoose";

const poemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Poem title is required"],
      trim: true,
      maxlength: 200,
    },

    excerpt: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: [true, "Poem content is required"],
    },

    coverImage: {
      type: String,
      default: "",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Poem", poemSchema);