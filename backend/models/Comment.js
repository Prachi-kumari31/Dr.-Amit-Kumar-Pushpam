// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema(
//   {
//     // ============================================
//     // CONTENT REFERENCE
//     // ============================================
//     content: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       refPath: "contentModel",
//     },

//     contentModel: {
//       type: String,
//       required: true,
//       enum: [
//         "Blog",
//         "Story",
//         "Poem",
//         "Book",
//         "Article",
//         "Publication",
//       ],
//     },

//     // ============================================
//     // COMMENT AUTHOR
//     // ============================================
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     // ============================================
//     // COMMENT TEXT
//     // ============================================
//     text: {
//       type: String,
//       required: [true, "Please provide comment text"],
//       maxlength: [
//         1000,
//         "Comment cannot be more than 1000 characters",
//       ],
//       trim: true,
//     },

//     // ============================================
//     // ADMIN MODERATION
//     // ============================================
//     isApproved: {
//       type: Boolean,
//       default: false,
//     },

//     isRejected: {
//       type: Boolean,
//       default: false,
//     },

//     // ============================================
//     // COMMENT LIKES
//     // ============================================
//     likes: {
//       type: Number,
//       default: 0,
//     },

//     likedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     // ============================================
//     // REPLIES
//     // ============================================
//     replies: [
//       {
//         author: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//         },

//         text: {
//           type: String,
//           maxlength: 1000,
//           trim: true,
//         },

//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Useful indexes
// commentSchema.index({
//   content: 1,
//   contentModel: 1,
//   isApproved: 1,
// });

// commentSchema.index({
//   author: 1,
// });

// export default mongoose.model("Comment", commentSchema);

// import mongoose from "mongoose";

// const replySchema = new mongoose.Schema(
//   {
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     text: {
//       type: String,
//       required: true,
//       maxlength: 1000,
//       trim: true,
//     },

//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     _id: true,
//   }
// );

// const commentSchema = new mongoose.Schema(
//   {
//       contentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       index: true,
//     },

//     contentType: {
//       type: String,
//       enum: [
//         "Blog",
//         "Story",
//         "Poem",
//         "Articles",
//         "Book",
//         "Publication",
//       ],
//       required: true,
//       index: true,
//     },

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
        
//     },
//     name: {
//   type: String,
//   trim: true,
//   maxlength: 100,
// },

//     text: {
//       type: String,
//       required: [true, "Please provide comment text"],
//       maxlength: 1000,
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected"],
//       default: "pending",
//     },

//     likes: {
//       type: Number,
//       default: 0,
//     },

//     likedBy: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],

//     replies: [replySchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Comment", commentSchema);

// import mongoose from "mongoose";

// const replySchema = new mongoose.Schema(
//   {
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     name: {
//       type: String,
//       trim: true,
//       maxlength: 100,
//       default: "Admin",
//     },

//     text: {
//       type: String,
//       required: true,
//       maxlength: 1000,
//       trim: true,
//     },

//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     _id: true,
//   }
// );

// const commentSchema = new mongoose.Schema(
//   {
//     /*
//     |--------------------------------------------------------------------------
//     | CONTENT ID
//     |--------------------------------------------------------------------------
//     */

//     content: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       index: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | CONTENT TYPE
//     |--------------------------------------------------------------------------
//     */

//     contentType: {
//       type: String,
//       required: true,
//       enum: [
//         "Blog",
//         "Story",
//         "Poem",
//         "Articles",
//         "Book",
//         "Publication",
//       ],
//       index: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | GUEST NAME
//     |--------------------------------------------------------------------------
//     */

//     name: {
//       type: String,
//       required: [true, "Please provide your name"],
//       trim: true,
//       maxlength: 100,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | OPTIONAL LOGGED-IN USER
//     |--------------------------------------------------------------------------
//     */

//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | COMMENT TEXT
//     |--------------------------------------------------------------------------
//     */

//     text: {
//       type: String,
//       required: [true, "Please provide comment text"],
//       maxlength: 1000,
//       trim: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | MODERATION
//     |--------------------------------------------------------------------------
//     */

//     status: {
//       type: String,
//       enum: [
//         "pending",
//         "approved",
//         "rejected",
//       ],
//       default: "pending",
//       index: true,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | COMMENT LIKES
//     |--------------------------------------------------------------------------
//     */

//     likes: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },

//     /*
//     |--------------------------------------------------------------------------
//     | REPLIES
//     |--------------------------------------------------------------------------
//     */

//     replies: [replySchema],
//   },
//   {
//     timestamps: true,
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | INDEX
// |--------------------------------------------------------------------------
// */

// commentSchema.index({
//   content: 1,
//   contentType: 1,
//   status: 1,
// });

// export default mongoose.model(
//   "Comment",
//   commentSchema
// );


import mongoose from "mongoose";

/*
|--------------------------------------------------------------------------
| REPLY SCHEMA
|--------------------------------------------------------------------------
*/

const replySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    name: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Admin",
    },

    text: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

/*
|--------------------------------------------------------------------------
| COMMENT SCHEMA
|--------------------------------------------------------------------------
*/

const commentSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | CONTENT ID
    |--------------------------------------------------------------------------
    */

    content: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | CONTENT TYPE
    |--------------------------------------------------------------------------
    |
    | This tells us which collection/model the content ID belongs to.
    |
    */

    contentType: {
      type: String,
      required: true,
      enum: [
        "Blog",
        "Story",
        "Poem",
        "Article",
        "Book",
        "Publication",
      ],
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | GUEST NAME
    |--------------------------------------------------------------------------
    */

    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: 100,
    },

    /*
    |--------------------------------------------------------------------------
    | OPTIONAL USER
    |--------------------------------------------------------------------------
    */

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /*
    |--------------------------------------------------------------------------
    | COMMENT TEXT
    |--------------------------------------------------------------------------
    */

    text: {
      type: String,
      required: [true, "Please provide comment text"],
      maxlength: 1000,
      trim: true,
    },

    /*
    |--------------------------------------------------------------------------
    | MODERATION
    |--------------------------------------------------------------------------
    */

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "pending",
      index: true,
    },

    /*
    |--------------------------------------------------------------------------
    | LIKES
    |--------------------------------------------------------------------------
    */

    likes: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
    |--------------------------------------------------------------------------
    | REPLIES
    |--------------------------------------------------------------------------
    */

    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| INDEXES
|--------------------------------------------------------------------------
*/

commentSchema.index({
  content: 1,
  contentType: 1,
  status: 1,
});

commentSchema.index({
  contentType: 1,
  createdAt: -1,
});

export default mongoose.model(
  "Comment",
  commentSchema
);