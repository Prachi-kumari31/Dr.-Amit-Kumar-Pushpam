// import mongoose from "mongoose";

// const contentSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: 250,
//     },

//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     type: {
//       type: String,
//       required: true,
//       enum: [
//         "blog",
//         "story",
//         "poem",
//         "book",
//         "article",
//         "publication",
//       ],
//     },

//     excerpt: {
//       type: String,
//       required: [true, "Excerpt is required"],
//       maxlength: 500,
//       trim: true,
//     },

//     content: {
//       type: String,
//       required: [true, "Content is required"],
//     },

//     coverImage: {
//       type: String,
//       default: "",
//     },

//     fileUrl: {
//       type: String,
//       default: "",
//     },

//     externalUrl: {
//       type: String,
//       default: "",
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },

//     category: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     tags: [
//       {
//         type: String,
//         trim: true,
//         lowercase: true,
//       },
//     ],

//     status: {
//       type: String,
//       enum: ["draft", "published"],
//       default: "draft",
//     },

//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },

//     publishedAt: {
//       type: Date,
//       default: null,
//     },

//     views: {
//       type: Number,
//       default: 0,
//     },

//     likes: {
//       type: Number,
//       default: 0,
//     },

//     dislikes: {
//       type: Number,
//       default: 0,
//     },

//     likedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     dislikedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Automatically create slug
// |--------------------------------------------------------------------------
// */

// contentSchema.pre("save", function (next) {
//   if (!this.slug || this.isModified("title")) {
//     this.slug = this.title
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");
//   }

//   next();
// });

// export default mongoose.model("Content", contentSchema);



import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      enum: [
        "blog",
        "article",
        "story",
        "poem",
        "book",
        "publication",
      ],
      required: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    excerpt: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      required: true,
    },

   coverImage: {
      type: String,
      default: "",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "pending",
        "published",
        "rejected",
      ],
      default: "draft",
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
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

    isFeatured: {
      type: Boolean,
      default: false,
    },

    metadata: {
      isbn: {
        type: String,
        default: "",
      },

      publisher: {
        type: String,
        default: "",
      },

      publicationDate: {
        type: Date,
        default: null,
      },

      journal: {
        type: String,
        default: "",
      },

      doi: {
        type: String,
        default: "",
      },

      pdfUrl: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.index({
  title: "text",
  excerpt: "text",
  tags: "text",
});

contentSchema.index({
  type: 1,
  status: 1,
  publishedAt: -1,
});

export default mongoose.model("Content", contentSchema);