// import mongoose from "mongoose";

// const storySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Story title is required"],
//       trim: true,
//       maxlength: 200,
//     },

//     excerpt: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//     },

//     content: {
//       type: String,
//       required: [true, "Story content is required"],
//     },

//     coverImage: {
//       type: String,
//       default: "",
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["draft", "published"],
//       default: "draft",
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

// export default mongoose.model("Story", storySchema);


// import mongoose from "mongoose";

// const storySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: 200,
//     },

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     excerpt: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//       default: "",
//     },

//     content: {
//       type: String,
//       required: [true, "Content is required"],
//       default: "",
//     },

//     contentType: {
//       type: String,
//       enum: ["story", "poem"],
//       required: true,
//       default: "story",
//       index: true,
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },

//     coverImage: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     category: {
//       type: String,
//       trim: true,
//       default: "",
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
//       index: true,
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

//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],

//     readingTime: {
//       type: Number,
//       default: 1,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// /* -----------------------------------------
//    SLUG
// ----------------------------------------- */

// function createSlug(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// /* -----------------------------------------
//    WORD COUNT / READING TIME
// ----------------------------------------- */

// function calculateReadingTime(content = "") {
//   const plainText = content
//     .replace(/<[^>]*>/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();

//   const words = plainText
//     ? plainText.split(" ").length
//     : 0;

//   return Math.max(1, Math.ceil(words / 200));
// }

// /* -----------------------------------------
//    PRE VALIDATE
// ----------------------------------------- */

// storySchema.pre("validate", function (next) {
//   if (
//     this.title &&
//     (!this.slug || this.isModified("title"))
//   ) {
//     this.slug = createSlug(this.title);
//   }

//   if (this.content !== undefined) {
//     this.readingTime = calculateReadingTime(
//       this.content
//     );
//   }

//   if (
//     this.status === "published" &&
//     !this.publishedAt
//   ) {
//     this.publishedAt = new Date();
//   }

//   if (this.status === "draft") {
//     this.publishedAt = null;
//   }

//   next();
// });

// /* -----------------------------------------
//    INDEXES
// ----------------------------------------- */

// storySchema.index({
//   contentType: 1,
//   status: 1,
//   createdAt: -1,
// });

// storySchema.index({
//   slug: 1,
//   contentType: 1,
// });

// export default mongoose.model(
//   "Story",
//   storySchema
// );

// import mongoose from "mongoose";

// const storySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       maxlength: 200,
//     },

//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//       index: true,
//     },

//     excerpt: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//       default: "",
//     },

//     content: {
//       type: String,
//       required: [true, "Content is required"],
//       default: "",
//     },

//     contentType: {
//       type: String,
//       enum: ["story", "poem"],
//       required: true,
//       default: "story",
//       index: true,
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },

//     authorName: {
//       type: String,
//       trim: true,
//       default: "Prosper Foundation",
//     },

//     coverImage: {
//       type: String,
//       trim: true,
//       default: "",
//     },

//     category: {
//       type: String,
//       trim: true,
//       default: "",
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
//       index: true,
//     },

//     publishedAt: {
//       type: Date,
//       default: null,
//     },

//     views: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     likes: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     dislikes: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     comments: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Comment",
//       },
//     ],

//     readingTime: {
//       type: Number,
//       default: 1,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | EDITOR SETTINGS
//     |--------------------------------------------------------------------------
//     */

//     editorFontFamily: {
//       type: String,
//       default: "Georgia",
//       trim: true,
//     },

//     editorFontSize: {
//       type: Number,
//       default: 18,
//       min: 12,
//       max: 32,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | PUBLICATION OPTIONS
//     |--------------------------------------------------------------------------
//     */

//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },

//     allowComments: {
//       type: Boolean,
//       default: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | PDF ATTACHMENT
//     |--------------------------------------------------------------------------
//     */

//     pdfUrl: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     pdfName: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     pdfPublicId: {
//       type: String,
//       default: "",
//       trim: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | SEO
//     |--------------------------------------------------------------------------
//     */

//     seoTitle: {
//       type: String,
//       trim: true,
//       maxlength: 200,
//       default: "",
//     },

//     seoDescription: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//       default: "",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// /* -------------------------------------------------------------------------- */
// /* SLUG */
// /* -------------------------------------------------------------------------- */

// function createSlug(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// /* -------------------------------------------------------------------------- */
// /* READING TIME */
// /* -------------------------------------------------------------------------- */

// function calculateReadingTime(content = "") {
//   const plainText = content
//     .replace(/<[^>]*>/g, " ")
//     .replace(/&nbsp;/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();

//   const words = plainText
//     ? plainText.split(" ").length
//     : 0;

//   return Math.max(
//     1,
//     Math.ceil(words / 200)
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* PRE VALIDATE */
// /* -------------------------------------------------------------------------- */

// storySchema.pre(
//   "validate",
//   function (next) {
//     if (
//       this.title &&
//       !this.slug
//     ) {
//       this.slug =
//         createSlug(this.title);
//     }

//     if (
//       this.content !== undefined
//     ) {
//       this.readingTime =
//         calculateReadingTime(
//           this.content
//         );
//     }

//     if (
//       this.status === "published" &&
//       !this.publishedAt
//     ) {
//       this.publishedAt =
//         new Date();
//     }

//     if (
//       this.status === "draft"
//     ) {
//       this.publishedAt = null;
//     }

//     next();
//   }
// );

// /* -------------------------------------------------------------------------- */
// /* INDEXES */
// /* -------------------------------------------------------------------------- */

// storySchema.index({
//   contentType: 1,
//   status: 1,
//   publishedAt: -1,
// });

// storySchema.index({
//   slug: 1,
//   contentType: 1,
// });

// storySchema.index({
//   isFeatured: 1,
//   status: 1,
// });

// export default mongoose.model(
//   "Story",
//   storySchema
// );


import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    /* =========================================================
       BASIC
    ========================================================= */

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    excerpt: {
      type: String,
      default: "",
      trim: true,
    },

    /* =========================================================
       SEO-FRIENDLY HTML CONTENT
    ========================================================= */

    content: {
      type: String,
      default: "",
    },

    /* =========================================================
       TYPE
    ========================================================= */

    contentType: {
      type: String,
      enum: ["story", "poem"],
      default: "story",
      index: true,
    },

    /* =========================================================
       DESIGN
    ========================================================= */

    coverImage: {
      type: String,
      default: "",
    },

    fontFamily: {
      type: String,
      default: "Georgia",
    },

    fontSize: {
      type: Number,
      default: 18,
    },

    /* =========================================================
       ORIGINAL PDF
    ========================================================= */

    originalPdfUrl: {
      type: String,
      default: "",
    },

    originalPdfName: {
      type: String,
      default: "",
    },

    originalPdfSize: {
      type: Number,
      default: 0,
    },

    pdfAvailable: {
      type: Boolean,
      default: false,
    },

    /* =========================================================
       ORGANIZATION
    ========================================================= */

    category: {
      type: String,
      default: "",
      trim: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    /* =========================================================
       PUBLICATION
    ========================================================= */

    status: {
      type: String,
      enum: [
        "draft",
        "published",
      ],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    allowComments: {
      type: Boolean,
      default: true,
    },

    /* =========================================================
       AUTHOR
    ========================================================= */

    author: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    authorName: {
      type: String,
      default:
        "Prosper Foundation",
    },

    /* =========================================================
       SEO
    ========================================================= */

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    /* =========================================================
       STATISTICS
    ========================================================= */

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

    wordCount: {
      type: Number,
      default: 0,
    },

    readingTime: {
      type: Number,
      default: 1,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Story",
  storySchema
);