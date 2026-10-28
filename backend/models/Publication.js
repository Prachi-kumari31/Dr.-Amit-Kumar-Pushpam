import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "blog",
        "story",
        "poem",
        "book",
        "article",
        "publication",
      ],
      required: true,
    },

    author: {
      type: String,
      default: "Prosper Foundation",
      trim: true,
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    excerpt: {
      type: String,
      maxlength: 500,
      default: "",
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    coverImage: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
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

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    dislikedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

publicationSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
});

export default mongoose.model("Publication", publicationSchema);