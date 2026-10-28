// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Please provide a title"],
//       trim: true,
//       maxlength: [
//         200,
//         "Title cannot be more than 200 characters",
//       ],
//     },

//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     excerpt: {
//       type: String,
//       required: [true, "Please provide an excerpt"],
//       trim: true,
//       maxlength: [
//         300,
//         "Excerpt cannot be more than 300 characters",
//       ],
//     },

//     content: {
//       type: String,
//       required: [true, "Please provide content"],
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },

//     category: {
//       type: String,
//       enum: [
//         "Astrology",
//         "Psychology",
//         "Spiritual",
//         "Paranormal",
//         "Research",
//       ],
//       required: [true, "Please select a category"],
//     },

//     tags: [
//       {
//         type: String,
//         lowercase: true,
//         trim: true,
//       },
//     ],

//     coverImage: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     readTime: {
//       type: Number,
//       default: 5,
//       min: 1,
//     },

//     wordCount: {
//       type: Number,
//       default: 0,
//       min: 0,
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

//     isPublished: {
//       type: Boolean,
//       default: true,
//     },

//     publishedAt: {
//       type: Date,
//       default: null,
//     },

//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },

//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],

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
//   },
//   {
//     timestamps: true,
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Generate slug
// |--------------------------------------------------------------------------
// */

// function generateSlug(title) {
//   return title
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// /*
// |--------------------------------------------------------------------------
// | Calculate word count
// |--------------------------------------------------------------------------
// */

// function calculateWordCount(content = "") {
//   return content
//     .replace(/<[^>]*>/g, " ")
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean).length;
// }

// /*
// |--------------------------------------------------------------------------
// | Pre validate
// |--------------------------------------------------------------------------
// */

// blogSchema.pre("validate", function (next) {
//   if (this.title && (!this.slug || this.isModified("title"))) {
//     this.slug = generateSlug(this.title);
//   }

//   if (this.content !== undefined) {
//     this.wordCount = calculateWordCount(this.content);
//   }

//   next();
// });

// export default mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [
        200,
        "Title cannot be more than 200 characters",
      ],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: [true, "Please provide an excerpt"],
      trim: true,
      maxlength: [
        300,
        "Excerpt cannot be more than 300 characters",
      ],
    },

    content: {
      type: String,
      required: [true, "Please provide content"],
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Astrology",
        "Psychology",
        "Spiritual",
        "Paranormal",
        "Research",
      ],
      required: [true, "Please select a category"],
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    coverImage: {
      type: String,
      default: "",
      trim: true,
    },

    readTime: {
      type: Number,
      default: 5,
      min: 1,
    },

    wordCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    dislikes: {
      type: Number,
      default: 0,
      min: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

/*
|--------------------------------------------------------------------------
| Generate slug
|--------------------------------------------------------------------------
*/

function generateSlug(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/*
|--------------------------------------------------------------------------
| Calculate word count
|--------------------------------------------------------------------------
*/

function calculateWordCount(content = "") {
  return content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/*
|--------------------------------------------------------------------------
| Pre validate
|--------------------------------------------------------------------------
*/

blogSchema.pre("validate", function (next) {
  if (
    this.title &&
    (!this.slug || this.isModified("title"))
  ) {
    this.slug = generateSlug(this.title);
  }

  if (this.content !== undefined) {
    this.wordCount = calculateWordCount(this.content);
  }

  next();
});

export default mongoose.model("Blog", blogSchema);