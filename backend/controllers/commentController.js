// import Comment from "../models/Comment.js";
// import Blog from "../models/Blog.js";
// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | CREATE COMMENT
// |--------------------------------------------------------------------------
// */

// export const createComment = asyncHandler(async (req, res) => {
//   const { blogId, text } = req.body;

//   if (!blogId) {
//     return res.status(400).json({
//       success: false,
//       message: "Blog ID is required",
//     });
//   }

//   if (!text || !text.trim()) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide comment text",
//     });
//   }

//   const blog = await Blog.findById(blogId);

//   if (!blog) {
//     return res.status(404).json({
//       success: false,
//       message: "Blog not found",
//     });
//   }

//   const comment = await Comment.create({
//     blog: blogId,
//     author: req.user._id,
//     text: text.trim(),
//     isApproved: false,
//   });

//   /*
//    * Add comment ID to blog
//    */
//   if (!blog.comments) {
//     blog.comments = [];
//   }

//   blog.comments.push(comment._id);

//   await blog.save();

//   const populatedComment = await Comment.findById(comment._id)
//     .populate("author", "name username avatar email")
//     .populate("blog", "title");

//   return res.status(201).json({
//     success: true,
//     message: "Comment added successfully (pending approval)",
//     data: populatedComment,
//   });
// });


// /*
// |--------------------------------------------------------------------------
// | PUBLIC - GET APPROVED COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getComments = asyncHandler(async (req, res) => {
//   const { blogId } = req.query;

//   if (!blogId) {
//     return res.status(400).json({
//       success: false,
//       message: "Blog ID is required",
//     });
//   }

//   const comments = await Comment.find({
//     blog: blogId,
//     isApproved: true,
//   })
//     .populate("author", "name username avatar")
//     .populate("replies.author", "name username avatar")
//     .sort({ createdAt: -1 });

//   return res.status(200).json({
//     success: true,
//     count: comments.length,
//     data: comments,
//   });
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET ALL COMMENTS
// |--------------------------------------------------------------------------
// |
// | This is different from getComments().
// |
// | Public users should see only approved comments.
// | Admin should see pending + approved + rejected comments.
// |
// */

// export const getAdminComments = asyncHandler(async (req, res) => {
//   const comments = await Comment.find({})
//     .populate("author", "name username avatar email")
//     .populate("blog", "title")
//     .populate("replies.author", "name username avatar")
//     .sort({ createdAt: -1 });

//   const formattedComments = comments.map((comment) => {
//     let status = "pending";

//     if (comment.isApproved === true) {
//       status = "approved";
//     }

//     /*
//      * If your schema later gets isRejected,
//      * this will support it.
//      */
//     if (comment.isRejected === true) {
//       status = "rejected";
//     }

//     return {
//       ...comment.toObject(),
//       status,
//     };
//   });

//   return res.status(200).json({
//     success: true,
//     count: formattedComments.length,
//     data: formattedComments,
//   });
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - APPROVE COMMENT
// |--------------------------------------------------------------------------
// */

// export const approveComment = asyncHandler(async (req, res) => {
//   const comment = await Comment.findByIdAndUpdate(
//     req.params.id,
//     {
//       isApproved: true,
//       isRejected: false,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   )
//     .populate("author", "name username avatar email")
//     .populate("blog", "title");

//   if (!comment) {
//     return res.status(404).json({
//       success: false,
//       message: "Comment not found",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     message: "Comment approved successfully",
//     data: comment,
//   });
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - REJECT COMMENT
// |--------------------------------------------------------------------------
// */

// export const rejectComment = asyncHandler(async (req, res) => {
//   const comment = await Comment.findByIdAndUpdate(
//     req.params.id,
//     {
//       isApproved: false,
//       isRejected: true,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   )
//     .populate("author", "name username avatar email")
//     .populate("blog", "title");

//   if (!comment) {
//     return res.status(404).json({
//       success: false,
//       message: "Comment not found",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     message: "Comment rejected successfully",
//     data: comment,
//   });
// });


// /*
// |--------------------------------------------------------------------------
// | DELETE COMMENT
// |--------------------------------------------------------------------------
// */

// export const deleteComment = asyncHandler(async (req, res) => {
//   const comment = await Comment.findById(req.params.id);

//   if (!comment) {
//     return res.status(404).json({
//       success: false,
//       message: "Comment not found",
//     });
//   }

//   /*
//    * Only the comment author or admin can delete.
//    */
//   if (
//     comment.author.toString() !== req.user._id.toString() &&
//     req.user.role !== "admin"
//   ) {
//     return res.status(403).json({
//       success: false,
//       message: "Not authorized to delete this comment",
//     });
//   }

//   /*
//    * Remove comment reference from Blog
//    */
//   await Blog.findByIdAndUpdate(comment.blog, {
//     $pull: {
//       comments: comment._id,
//     },
//   });

//   /*
//    * Delete comment
//    */
//   await Comment.findByIdAndDelete(req.params.id);

//   return res.status(200).json({
//     success: true,
//     message: "Comment deleted successfully",
//   });
// });



// import Comment from "../models/Comment.js";
// import Content from "../models/Content.js";
// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | CREATE COMMENT
// |--------------------------------------------------------------------------
// */

// export const createComment =
//   asyncHandler(async (req, res) => {
//     const {
//       contentId,
//       name,
//       text,
//     } = req.body;

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Content ID is required",
//       });
//     }

//     if (
//       !text ||
//       !text.trim()
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please provide comment text",
//       });
//     }

//     const content =
//       await Content.findOne({
//         _id: contentId,
//         status: "published",
//       });

//     if (!content) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Content not found",
//       });
//     }

//     const comment =
//       await Comment.create({
//         content: contentId,
//         // author: req.user._id : null,
//         name:name?.trim(),
//         text: text.trim(),
//         status: "pending",
//       });

//     content.comments.push(
//       comment._id
//     );

//     await content.save();

//     const populated =
//       await Comment.findById(
//         comment._id
//       )
//         .populate(
//           "author",
//           "name avatar"
//         )
//         .populate(
//           "content",
//           "title type slug"
//         );

//     res.status(201).json({
//       success: true,
//       message:
//         "Comment submitted successfully. It will appear after admin approval.",
//       data: populated,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | GET PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getComments =
//   asyncHandler(async (req, res) => {
//     const {
//       contentId,
//     } = req.query;

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Content ID is required",
//       });
//     }

//     const comments =
//       await Comment.find({
//         content: contentId,
//         status: "approved",
//       })
//         .populate(
//           "author",
//           "name avatar"
//         )
//         .populate(
//           "replies.author",
//           "name avatar"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getAdminComments =
//   asyncHandler(async (req, res) => {
//     const comments =
//       await Comment.find({})
//         .populate(
//           "author",
//           "name email avatar"
//         )
//         .populate(
//           "content",
//           "title type slug"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - APPROVE
// |--------------------------------------------------------------------------
// */

// export const approveComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "approved",
//         },
//         {
//           new: true,
//         }
//       )
//         .populate(
//           "author",
//           "name email avatar"
//         )
//         .populate(
//           "content",
//           "title type"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Comment not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message:
//         "Comment approved successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - REJECT
// |--------------------------------------------------------------------------
// */

// export const rejectComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "rejected",
//         },
//         {
//           new: true,
//         }
//       );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Comment not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message:
//         "Comment rejected successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE
// |--------------------------------------------------------------------------
// */

// export const deleteComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findById(
//         req.params.id
//       );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "Comment not found",
//       });
//     }

//     await Content.findByIdAndUpdate(
//       comment.content,
//       {
//         $pull: {
//           comments:
//             comment._id,
//         },
//       }
//     );

//     await Comment.findByIdAndDelete(
//       req.params.id
//     );

//     res.status(200).json({
//       success: true,
//       message:
//         "Comment deleted successfully",
//     });
//   });




// import Comment from "../models/Comment.js";
// import Content from "../models/Content.js";
// import Blog from "../models/Blog.js";

// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | GET MODEL
// |--------------------------------------------------------------------------
// */

// const getModel = (contentType) => {
//   switch (contentType) {
//     case "Blog":
//       return Blog;

//     case "Content":
//       return Content;

//     default:
//       return null;
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | CHECK PUBLISHED CONTENT
// |--------------------------------------------------------------------------
// */

// const findPublishedContent = async (
//   Model,
//   contentId,
//   contentType
// ) => {
//   if (contentType === "Blog") {
//     return Model.findOne({
//       _id: contentId,
//       isPublished: true,
//     });
//   }

//   return Model.findOne({
//     _id: contentId,
//     status: "published",
//   });
// };

// /*
// |--------------------------------------------------------------------------
// | CREATE COMMENT
// |--------------------------------------------------------------------------
// | PUBLIC
// | No login required
// |--------------------------------------------------------------------------
// */

// export const createComment = asyncHandler(
//   async (req, res) => {
//     const {
//       contentId,
//       contentType,
//       name,
//       text,
//     } = req.body;

//     /*
//     |--------------------------------------------------------------------------
//     | VALIDATION
//     |--------------------------------------------------------------------------
//     */

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Content ID is required",
//       });
//     }

//     if (!contentType) {
//       return res.status(400).json({
//         success: false,
//         message: "Content type is required",
//       });
//     }

//     if (contentType !== "Blog") {
//       return res.status(400).json({
//         success: false,
//         message: "Only Blog comments are currently supported",
//       });
//     }

//     if (!name || !name.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide your name",
//       });
//     }

//     if (!text || !text.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide comment text",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | MODEL
//     |--------------------------------------------------------------------------
//     */

//     const Model = getModel(contentType);

//     if (!Model) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid content type",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | FIND BLOG
//     |--------------------------------------------------------------------------
//     */

//     const content = await findPublishedContent(
//       Model,
//       contentId,
//       contentType
//     );

//     if (!content) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found or not published",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | CREATE COMMENT
//     |--------------------------------------------------------------------------
//     */

//     const comment = await Comment.create({
//       content: contentId,
//       contentType: "Blog",
//       name: name.trim(),
//       text: text.trim(),
//       status: "pending",
//       author: req.user?._id || null,
//     });

//     /*
//     |--------------------------------------------------------------------------
//     | ADD COMMENT ID TO BLOG
//     |--------------------------------------------------------------------------
//     */

//     if (!Array.isArray(content.comments)) {
//       content.comments = [];
//     }

//     content.comments.push(comment._id);

//     await content.save();

//     /*
//     |--------------------------------------------------------------------------
//     | RESPONSE
//     |--------------------------------------------------------------------------
//     */

//     return res.status(201).json({
//       success: true,
//       message:
//         "Comment submitted successfully. It will appear after admin approval.",
//       data: {
//         _id: comment._id,
//         name: comment.name,
//         text: comment.text,
//         status: comment.status,
//         content: comment.content,
//         contentType: comment.contentType,
//         createdAt: comment.createdAt,
//       },
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | GET PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// | Only approved comments
// |--------------------------------------------------------------------------
// */

// export const getComments = asyncHandler(
//   async (req, res) => {
//     const {
//       contentId,
//       contentType = "Blog",
//     } = req.query;

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Content ID is required",
//       });
//     }

//     const comments = await Comment.find({
//       content: contentId,
//       contentType,
//       status: "approved",
//     })
//       .populate(
//         "author",
//         "name avatar"
//       )
//       .populate(
//         "replies.author",
//         "name avatar"
//       )
//       .sort({
//         createdAt: -1,
//       })
//       .lean();

//     return res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET ALL COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getAdminComments =
//   asyncHandler(async (req, res) => {
//     const comments =
//       await Comment.find({})
//         .populate(
//           "author",
//           "name avatar"
//         )
//         .populate(
//           "content",
//           "title slug"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     return res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - APPROVE
// |--------------------------------------------------------------------------
// */

// export const approveComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "approved",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           "author",
//           "name avatar"
//         )
//         .populate(
//           "content",
//           "title slug"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Comment approved successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - REJECT
// |--------------------------------------------------------------------------
// */

// export const rejectComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "rejected",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Comment rejected successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE
// |--------------------------------------------------------------------------
// */

// export const deleteComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findById(
//         req.params.id
//       );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     const Model = getModel(
//       comment.contentType
//     );

//     if (Model) {
//       await Model.findByIdAndUpdate(
//         comment.content,
//         {
//           $pull: {
//             comments: comment._id,
//           },
//         }
//       );
//     }

//     await Comment.findByIdAndDelete(
//       req.params.id
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Comment deleted successfully",
//     });
//   });


// import Comment from "../models/Comment.js";
// import Content from "../models/Content.js";
// import Blog from "../models/Blog.js";

// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | GET MODEL
// |--------------------------------------------------------------------------
// */

// const getModel = (contentType) => {
//   switch (contentType) {
//     case "Blog":
//       return Blog;

//     case "Content":
//       return Content;

//     default:
//       return null;
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | CHECK CONTENT EXISTS
// |--------------------------------------------------------------------------
// */

// const findPublishedContent = async (contentType, contentId) => {
//   const Model = getModel(contentType);

//   if (!Model) {
//     return null;
//   }

//   /*
//   Blog model uses:
//   isPublished: Boolean

//   Content model may use:
//   status: "published"
//   */

//   if (contentType === "Blog") {
//     return await Blog.findOne({
//       _id: contentId,
//       isPublished: true,
//     });
//   }

//   return await Content.findOne({
//     _id: contentId,
//     status: "published",
//   });
// };

// /*
// |--------------------------------------------------------------------------
// | CREATE COMMENT
// |--------------------------------------------------------------------------
// */

// export const createComment = asyncHandler(async (req, res) => {
//   const {
//     contentId,
//     contentType,
//     name,
//     text,
//   } = req.body;

//   /*
//   |--------------------------------------------------------------------------
//   | VALIDATION
//   |--------------------------------------------------------------------------
//   */

//   if (!contentId) {
//     return res.status(400).json({
//       success: false,
//       message: "Content ID is required",
//     });
//   }

//   if (!contentType) {
//     return res.status(400).json({
//       success: false,
//       message: "Content type is required",
//     });
//   }

//   if (!["Blog", "Content"].includes(contentType)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid content type. Use Blog or Content.",
//     });
//   }

//   if (!name || !name.trim()) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide your name",
//     });
//   }

//   if (!text || !text.trim()) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide comment text",
//     });
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | FIND CONTENT
//   |--------------------------------------------------------------------------
//   */

//   const Model = getModel(contentType);

//   if (!Model) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid content type",
//     });
//   }

//   const content = await findPublishedContent(
//     contentType,
//     contentId
//   );

//   if (!content) {
//     return res.status(404).json({
//       success: false,
//       message: `${contentType} not found or not published`,
//     });
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | CREATE COMMENT
//   |--------------------------------------------------------------------------
//   */

//   const comment = await Comment.create({
//     content: contentId,
//     contentType,
//     name: name.trim(),
//     text: text.trim(),
//     status: "pending",
//   });

//   /*
//   |--------------------------------------------------------------------------
//   | ADD COMMENT ID TO BLOG
//   |--------------------------------------------------------------------------
//   */

//   if (!Array.isArray(content.comments)) {
//     content.comments = [];
//   }

//   content.comments.push(comment._id);

//   await content.save();

//   /*
//   |--------------------------------------------------------------------------
//   | POPULATE
//   |--------------------------------------------------------------------------
//   */

//   const populated = await Comment.findById(comment._id)
//     .populate("author", "name email avatar")
//     .populate("content", "title slug category");

//   /*
//   |--------------------------------------------------------------------------
//   | RESPONSE
//   |--------------------------------------------------------------------------
//   */

//   return res.status(201).json({
//     success: true,
//     message:
//       "Comment submitted successfully. It will appear after admin approval.",
//     data: populated,
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | GET PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getComments = asyncHandler(async (req, res) => {
//   const {
//     contentId,
//     contentType,
//   } = req.query;

//   if (!contentId) {
//     return res.status(400).json({
//       success: false,
//       message: "Content ID is required",
//     });
//   }

//   if (!contentType) {
//     return res.status(400).json({
//       success: false,
//       message: "Content type is required",
//     });
//   }

//   if (!["Blog", "Content"].includes(contentType)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid content type",
//     });
//   }

//   const comments = await Comment.find({
//     content: contentId,
//     contentType,
//     status: "approved",
//   })
//     .populate("author", "name avatar")
//     .populate("replies.author", "name avatar")
//     .sort({
//       createdAt: -1,
//     });

//   return res.status(200).json({
//     success: true,
//     count: comments.length,
//     data: comments,
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET ALL COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getAdminComments = asyncHandler(
//   async (req, res) => {
//     const comments = await Comment.find({})
//       .populate(
//         "author",
//         "name email avatar username"
//       )
//       .populate(
//         "content",
//         "title slug category"
//       )
//       .sort({
//         createdAt: -1,
//       });

//     return res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN - APPROVE COMMENT
// |--------------------------------------------------------------------------
// */

// export const approveComment = asyncHandler(
//   async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "approved",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           "author",
//           "name email avatar username"
//         )
//         .populate(
//           "content",
//           "title slug category"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Comment approved successfully",
//       data: comment,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN - REJECT COMMENT
// |--------------------------------------------------------------------------
// */

// export const rejectComment = asyncHandler(
//   async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "rejected",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           "author",
//           "name email avatar username"
//         )
//         .populate(
//           "content",
//           "title slug category"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Comment rejected successfully",
//       data: comment,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE COMMENT
// |--------------------------------------------------------------------------
// */

// export const deleteComment = asyncHandler(
//   async (req, res) => {
//     const comment = await Comment.findById(
//       req.params.id
//     );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     /*
//     Remove comment reference from Blog/Content
//     */

//     const Model = getModel(
//       comment.contentType
//     );

//     if (Model) {
//       await Model.findByIdAndUpdate(
//         comment.content,
//         {
//           $pull: {
//             comments: comment._id,
//           },
//         }
//       );
//     }

//     await Comment.findByIdAndDelete(
//       req.params.id
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Comment deleted successfully",
//     });
//   }
// );


// import mongoose from "mongoose";

// import Comment from "../models/Comment.js";
// import Content from "../models/Content.js";
// import Blog from "../models/Blog.js";

// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | GET CONTENT MODEL
// |--------------------------------------------------------------------------
// */

// const getModel = (contentType) => {
//   switch (contentType) {
//     case "Blog":
//       return Blog;

//     case "Content":
//       return Content;

//     default:
//       return null;
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | CHECK VALID OBJECT ID
// |--------------------------------------------------------------------------
// */

// const isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id);
// };

// /*
// |--------------------------------------------------------------------------
// | FIND CONTENT
// |--------------------------------------------------------------------------
// */

// const findContent = async (contentType, contentId) => {
//   const Model = getModel(contentType);

//   if (!Model) {
//     return null;
//   }

//   if (!isValidObjectId(contentId)) {
//     return null;
//   }

//   /*
//    * IMPORTANT:
//    *
//    * Blog model uses:
//    * isPublished: Boolean
//    *
//    * It does NOT use:
//    * status: "published"
//    */

//   if (contentType === "Blog") {
//     return Model.findOne({
//       _id: contentId,
//       isPublished: true,
//     });
//   }

//   /*
//    * Content model may use status.
//    * Adjust this only if your Content schema
//    * uses a different publish field.
//    */

//   return Model.findOne({
//     _id: contentId,
//     $or: [
//       { status: "published" },
//       { isPublished: true },
//     ],
//   });
// };

// /*
// |--------------------------------------------------------------------------
// | CREATE COMMENT
// |--------------------------------------------------------------------------
// */

// export const createComment = asyncHandler(
//   async (req, res) => {
//     const {
//       contentId,
//       contentType,
//       name,
//       text,
//     } = req.body;

//     console.log("CREATE COMMENT BODY:", req.body);

//     /*
//     |--------------------------------------------------------------------------
//     | VALIDATION
//     |--------------------------------------------------------------------------
//     */

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Content ID is required",
//       });
//     }

//     if (!contentType) {
//       return res.status(400).json({
//         success: false,
//         message: "Content type is required",
//       });
//     }

//     if (!["Blog", "Content"].includes(contentType)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Invalid content type. Use Blog or Content.",
//       });
//     }

//     if (!name || !name.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide your name",
//       });
//     }

//     if (!text || !text.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide comment text",
//       });
//     }

//     if (!isValidObjectId(contentId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid content ID",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | FIND CONTENT
//     |--------------------------------------------------------------------------
//     */

//     const content = await findContent(
//       contentType,
//       contentId
//     );

//     if (!content) {
//       return res.status(404).json({
//         success: false,
//         message:
//           `${contentType} not found or not published`,
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | CREATE COMMENT
//     |--------------------------------------------------------------------------
//     */

//     const comment = await Comment.create({
//       content: contentId,
//       contentType,
//       name: name.trim(),
//       text: text.trim(),
//       status: "pending",
//     });

//     /*
//     |--------------------------------------------------------------------------
//     | ADD COMMENT REFERENCE TO BLOG
//     |--------------------------------------------------------------------------
//     */

//     if (Array.isArray(content.comments)) {
//       content.comments.push(comment._id);
//       await content.save();
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | POPULATE COMMENT
//     |--------------------------------------------------------------------------
//     */

//     const populated = await Comment.findById(
//       comment._id
//     )
//       .populate(
//         "author",
//         "name username email avatar"
//       )
//       .populate(
//         "content",
//         "title category slug"
//       );

//     /*
//     |--------------------------------------------------------------------------
//     | RESPONSE
//     |--------------------------------------------------------------------------
//     */

//     return res.status(201).json({
//       success: true,
//       message:
//         "Comment submitted successfully. It will appear after admin approval.",
//       data: populated,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | GET PUBLIC COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getComments = asyncHandler(
//   async (req, res) => {
//     const {
//       contentId,
//       contentType,
//     } = req.query;

//     console.log(
//       "GET COMMENTS:",
//       {
//         contentId,
//         contentType,
//       }
//     );

//     if (!contentId) {
//       return res.status(400).json({
//         success: false,
//         message: "Content ID is required",
//       });
//     }

//     if (!contentType) {
//       return res.status(400).json({
//         success: false,
//         message: "Content type is required",
//       });
//     }

//     if (!["Blog", "Content"].includes(contentType)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid content type",
//       });
//     }

//     if (!isValidObjectId(contentId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid content ID",
//       });
//     }

//     const comments = await Comment.find({
//       content: contentId,
//       contentType,
//       status: "approved",
//     })
//       .populate(
//         "author",
//         "name username avatar"
//       )
//       .populate(
//         "replies.author",
//         "name username avatar"
//       )
//       .sort({
//         createdAt: -1,
//       });

//     return res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET ALL COMMENTS
// |--------------------------------------------------------------------------
// */

// export const getAdminComments =
//   asyncHandler(async (req, res) => {
//     const comments =
//       await Comment.find({})
//         .populate(
//           "author",
//           "name username email avatar"
//         )
//         .populate(
//           "content",
//           "title category slug"
//         )
//         .sort({
//           createdAt: -1,
//         });

//     return res.status(200).json({
//       success: true,
//       count: comments.length,
//       data: comments,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - APPROVE COMMENT
// |--------------------------------------------------------------------------
// */

// export const approveComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "approved",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           "author",
//           "name username email avatar"
//         )
//         .populate(
//           "content",
//           "title category slug"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         "Comment approved successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - REJECT COMMENT
// |--------------------------------------------------------------------------
// */

// export const rejectComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findByIdAndUpdate(
//         req.params.id,
//         {
//           status: "rejected",
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       )
//         .populate(
//           "author",
//           "name username email avatar"
//         )
//         .populate(
//           "content",
//           "title category slug"
//         );

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message:
//         "Comment rejected successfully",
//       data: comment,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE COMMENT
// |--------------------------------------------------------------------------
// */

// export const deleteComment =
//   asyncHandler(async (req, res) => {
//     const comment =
//       await Comment.findById(req.params.id);

//     if (!comment) {
//       return res.status(404).json({
//         success: false,
//         message: "Comment not found",
//       });
//     }

//     const Model = getModel(
//       comment.contentType
//     );

//     if (
//       Model &&
//       isValidObjectId(comment.content)
//     ) {
//       await Model.findByIdAndUpdate(
//         comment.content,
//         {
//           $pull: {
//             comments: comment._id,
//           },
//         }
//       );
//     }

//     await Comment.findByIdAndDelete(
//       req.params.id
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Comment deleted successfully",
//     });
//   });

import mongoose from "mongoose";

import Comment from "../models/Comment.js";
import Article from "../models/Article.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
import Blog from "../models/Blog.js";
// Import Blog/Book/Publication models if these exist in your project.

/*
|--------------------------------------------------------------------------
| HELPER - FIND CONTENT
|--------------------------------------------------------------------------
*/

const findContent = async (contentId, contentType) => {
  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    return null;
  }

  switch (contentType) {
    case "Article":
      return Article.findById(contentId);

    case "Story":
      return Story.findById(contentId);

    case "Poem":
      return Story.findById(contentId);

    /*
    |--------------------------------------------------------------------------
    | Add these only if these models exist in your project.
    |--------------------------------------------------------------------------
    */

    case "Blog":
      return Blog.findById(contentId);

    // case "Book":
    //   return Book.findById(contentId);

    // case "Publication":
    //   return Publication.findById(contentId);

    default:
      return null;
  }
};

/*
|--------------------------------------------------------------------------
| GET PUBLIC COMMENTS
|--------------------------------------------------------------------------
*/

export const getComments = async (req, res) => {
  try {
    const { contentId, contentType = "Blog" } = req.query;

    console.log("GET COMMENTS:", {
      contentId,
      contentType,
    });

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID.",
      });
    }

    const allowedTypes = [
      "Blog",
      "Story",
      "Poem",
      "Article",
      "Book",
      "Publication",
    ];

    if (!allowedTypes.includes(contentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content type.",
      });
    }

    /*
     * Only return approved comments publicly.
     */
    const comments = await Comment.find({
      content: contentId,
      contentType,
      status: "approved",
    })
      .populate("author", "name email")
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE COMMENT
|--------------------------------------------------------------------------
*/

export const createComment = async (req, res) => {
  try {
    console.log("CREATE COMMENT BODY:", req.body);

    const {
      contentId,
      contentType = "Blog",
      name,
      text,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE CONTENT ID
    |--------------------------------------------------------------------------
    */

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required.",
      });
    }

    const cleanContentId = String(contentId).trim();

    if (!mongoose.Types.ObjectId.isValid(cleanContentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content ID.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDATE CONTENT TYPE
    |--------------------------------------------------------------------------
    */

    const cleanContentType =
      contentType !== undefined &&
      contentType !== null
        ? String(contentType).trim()
        : "Blog";

    const allowedTypes = [
      "Blog",
      "Story",
      "Poem",
      "Article",
      "Book",
      "Publication",
    ];

    if (!allowedTypes.includes(cleanContentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid content type.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDATE NAME
    |--------------------------------------------------------------------------
    */

    const cleanName =
      name !== undefined &&
      name !== null
        ? String(name).trim()
        : "";

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDATE TEXT
    |--------------------------------------------------------------------------
    */

    const cleanText =
      text !== undefined &&
      text !== null
        ? String(text).trim()
        : "";

    if (!cleanText) {
      return res.status(400).json({
        success: false,
        message: "Please provide comment text.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FIND ARTICLE / CONTENT
    |--------------------------------------------------------------------------
    */

    const contentDocument = await findContent(
      cleanContentId,
      cleanContentType
    );

    if (!contentDocument) {
      return res.status(404).json({
        success: false,
        message: `${cleanContentType} not found.`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK COMMENTS
    |--------------------------------------------------------------------------
    */

   if (
  cleanContentType !== "Blog" &&
  contentDocument.allowComments === false
) {
  return res.status(403).json({
    success: false,
    message: "Comments are disabled for this content.",
  });
}
    /*
    |--------------------------------------------------------------------------
    | CREATE COMMENT
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    |
    | Your MongoDB Comment model uses:
    |
    | content: ObjectId
    |
    | NOT:
    |
    | contentId
    |
    */

    const commentData = {
      content: new mongoose.Types.ObjectId(
        cleanContentId
      ),

      contentType: cleanContentType,

      name: cleanName,

      text: cleanText,

      status: "pending",
    };

    /*
    |--------------------------------------------------------------------------
    | ADD LOGGED-IN USER IF AVAILABLE
    |--------------------------------------------------------------------------
    */

    if (
      req.user?._id &&
      mongoose.Types.ObjectId.isValid(
        req.user._id
      )
    ) {
      commentData.author = req.user._id;
    }

    console.log(
      "COMMENT DATA BEFORE SAVE:",
      commentData
    );

    const comment =
      await Comment.create(commentData);

    console.log(
      "COMMENT CREATED:",
      comment._id
    );

    return res.status(201).json({
      success: true,
      message:
        "Comment submitted successfully. It will appear after approval.",
      data: comment,
    });
  } catch (error) {
    console.error(
      "CREATE COMMENT ERROR:",
      error
    );

    /*
    |--------------------------------------------------------------------------
    | MONGOOSE VALIDATION ERROR
    |--------------------------------------------------------------------------
    */

    if (
      error instanceof mongoose.Error.ValidationError
    ) {
      const messages = Object.values(
        error.errors
      ).map(
        (item) => item.message
      );

      return res.status(400).json({
        success: false,
        message:
          messages.join(", ") ||
          "Comment validation failed.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DUPLICATE KEY
    |--------------------------------------------------------------------------
    */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A duplicate comment already exists.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FINAL ERROR
    |--------------------------------------------------------------------------
    */

    return res.status(500).json({
      success: false,
      message: "Failed to create comment.",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - GET COMMENTS
|--------------------------------------------------------------------------
*/


export const getAdminComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const commentsWithContent = await Promise.all(
      comments.map(async (comment) => {
        const contentDocument = await findContent(
          comment.content,
          comment.contentType
        );

        return {
          ...comment,
          contentInfo: contentDocument
            ? {
                title:
                  contentDocument.title ||
                  contentDocument.name ||
                  contentDocument.heading ||
                  `${comment.contentType} (Untitled)`,
              }
            : {
                title: `${comment.contentType} (Content not found)`,
              },
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: commentsWithContent,
    });
  } catch (error) {
    console.error("GET ADMIN COMMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin comments.",
    });
  }
};


/*
|--------------------------------------------------------------------------
| ADMIN - APPROVE
|--------------------------------------------------------------------------
*/

export const approveComment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID.",
      });
    }

    const comment =
      await Comment.findByIdAndUpdate(
        id,
        {
          status: "approved",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment approved.",
      data: comment,
    });
  } catch (error) {
    console.error(
      "APPROVE COMMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to approve comment.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - REJECT
|--------------------------------------------------------------------------
*/

export const rejectComment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID.",
      });
    }

    const comment =
      await Comment.findByIdAndUpdate(
        id,
        {
          status: "rejected",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment rejected.",
      data: comment,
    });
  } catch (error) {
    console.error(
      "REJECT COMMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to reject comment.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| ADMIN - DELETE
|--------------------------------------------------------------------------
*/

export const deleteComment = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid comment ID.",
      });
    }

    const comment =
      await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE COMMENT ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete comment.",
    });
  }
};