// import Blog from '../models/Blog.js';
// import { asyncHandler } from '../middleware/errorHandler.js';

// export const getAllBlogs = asyncHandler(async (req, res) => {
//   const { category, page = 1, limit = 9, search } = req.query;

//   let query = { isPublished: true };

//   if (category) {
//     query.category = category;
//   }

//   if (search) {
//     query.$or = [
//       { title: { $regex: search, $options: 'i' } },
//       { excerpt: { $regex: search, $options: 'i' } },
//       { tags: { $regex: search, $options: 'i' } },
//     ];
//   }

//   const skip = (page - 1) * limit;

//   const blogs = await Blog.find(query)
//     .populate('author', 'name email avatar')
//     .populate('comments')
//     .skip(skip)
//     .limit(parseInt(limit))
//     .sort({ createdAt: -1 });

//   const total = await Blog.countDocuments(query);
//   const pages = Math.ceil(total / limit);

//   res.status(200).json({
//     success: true,
//     data: blogs,
//     pagination: {
//       total,
//       pages,
//       currentPage: parseInt(page),
//       limit: parseInt(limit),
//     },
//   });
// });

// export const getBlogBySlug = asyncHandler(async (req, res) => {
//   const { slug } = req.params;

//   const blog = await Blog.findOne({ slug, isPublished: true })
//     .populate('author', 'name email avatar bio')
//     .populate({
//       path: 'comments',
//       populate: { path: 'author', select: 'name avatar' },
//     });

//   if (!blog) {
//     return res.status(404).json({ success: false, message: 'Blog not found' });
//   }

//   blog.views += 1;
//   await blog.save();

//   res.status(200).json({
//     success: true,
//     data: blog,
//   });
// });

// export const createBlog = asyncHandler(async (req, res) => {
//   const { title, excerpt, content, category, tags, readTime } = req.body;

//   if (!title || !excerpt || !content || !category) {
//     return res.status(400).json({ success: false, message: 'Please provide all required fields' });
//   }

//   const blog = await Blog.create({
//     title,
//     excerpt,
//     content,
//     category,
//     tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
//     readTime: readTime || 5,
//     author: req.user._id,
//     isPublished: false,
//   });

//   res.status(201).json({
//     success: true,
//     message: 'Blog created successfully',
//     data: blog,
//   });
// });

// export const updateBlog = asyncHandler(async (req, res) => {
//   let blog = await Blog.findById(req.params.id);

//   if (!blog) {
//     return res.status(404).json({ success: false, message: 'Blog not found' });
//   }

//   if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//     return res.status(403).json({ success: false, message: 'Not authorized to update this blog' });
//   }

//   const { title, excerpt, content, category, tags, isPublished } = req.body;

//   blog = await Blog.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: title || blog.title,
//       excerpt: excerpt || blog.excerpt,
//       content: content || blog.content,
//       category: category || blog.category,
//       tags: tags ? tags.split(',').map((tag) => tag.trim()) : blog.tags,
//       isPublished: isPublished !== undefined ? isPublished : blog.isPublished,
//     },
//     { new: true, runValidators: true }
//   );

//   res.status(200).json({
//     success: true,
//     message: 'Blog updated successfully',
//     data: blog,
//   });
// });

// export const deleteBlog = asyncHandler(async (req, res) => {
//   const blog = await Blog.findById(req.params.id);

//   if (!blog) {
//     return res.status(404).json({ success: false, message: 'Blog not found' });
//   }

//   if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//     return res.status(403).json({ success: false, message: 'Not authorized to delete this blog' });
//   }

//   await Blog.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     message: 'Blog deleted successfully',
//   });
// });

// export const likeBlog = asyncHandler(async (req, res) => {
//   let blog = await Blog.findById(req.params.id);

//   if (!blog) {
//     return res.status(404).json({ success: false, message: 'Blog not found' });
//   }

//   const userIndex = blog.likedBy.indexOf(req.user._id);

//   if (userIndex > -1) {
//     blog.likedBy.splice(userIndex, 1);
//     blog.likes -= 1;
//   } else {
//     blog.likedBy.push(req.user._id);
//     blog.likes += 1;

//     const dislikeIndex = blog.dislikedBy.indexOf(req.user._id);
//     if (dislikeIndex > -1) {
//       blog.dislikedBy.splice(dislikeIndex, 1);
//       blog.dislikes -= 1;
//     }
//   }

//   await blog.save();

//   res.status(200).json({
//     success: true,
//     message: 'Blog liked successfully',
//     data: {
//       likes: blog.likes,
//       dislikes: blog.dislikes,
//       liked: blog.likedBy.includes(req.user._id),
//       disliked: blog.dislikedBy.includes(req.user._id),
//     },
//   });
// });

// export const dislikeBlog = asyncHandler(async (req, res) => {
//   let blog = await Blog.findById(req.params.id);

//   if (!blog) {
//     return res.status(404).json({ success: false, message: 'Blog not found' });
//   }

//   const userIndex = blog.dislikedBy.indexOf(req.user._id);

//   if (userIndex > -1) {
//     blog.dislikedBy.splice(userIndex, 1);
//     blog.dislikes -= 1;
//   } else {
//     blog.dislikedBy.push(req.user._id);
//     blog.dislikes += 1;

//     const likeIndex = blog.likedBy.indexOf(req.user._id);
//     if (likeIndex > -1) {
//       blog.likedBy.splice(likeIndex, 1);
//       blog.likes -= 1;
//     }
//   }

//   await blog.save();

//   res.status(200).json({
//     success: true,
//     message: 'Blog disliked successfully',
//     data: {
//       likes: blog.likes,
//       dislikes: blog.dislikes,
//       liked: blog.likedBy.includes(req.user._id),
//       disliked: blog.dislikedBy.includes(req.user._id),
//     },
//   });
// });

// import Blog from "../models/Blog.js";
// import { asyncHandler } from "../middleware/errorHandler.js";

// /*
// |--------------------------------------------------------------------------
// | PUBLIC - GET ALL PUBLISHED BLOGS
// |--------------------------------------------------------------------------
// */

// export const getAllBlogs = asyncHandler(async (req, res) => {
//   const {
//     category,
//     page = 1,
//     limit = 9,
//     search,
//   } = req.query;

//   const pageNumber = Math.max(1, parseInt(page));
//   const limitNumber = Math.min(
//     50,
//     Math.max(1, parseInt(limit))
//   );

//   const query = {
//     isPublished: true,
//   };

//   if (category) {
//     query.category = category;
//   }

//   if (search) {
//     query.$or = [
//       {
//         title: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//       {
//         excerpt: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//       {
//         tags: {
//           $regex: search,
//           $options: "i",
//         },
//       },
//     ];
//   }

//   const skip =
//     (pageNumber - 1) * limitNumber;

//   const [blogs, total] =
//     await Promise.all([
//       Blog.find(query)
//         .populate(
//           "author",
//           "name username email avatar bio"
//         )
//         .populate({
//           path: "comments",
//           populate: {
//             path: "author",
//             select: "name username avatar",
//           },
//         })
//         .skip(skip)
//         .limit(limitNumber)
//         .sort({ createdAt: -1 }),

//       Blog.countDocuments(query),
//     ]);

//   res.status(200).json({
//     success: true,
//     data: blogs,
//     pagination: {
//       total,
//       pages: Math.ceil(
//         total / limitNumber
//       ),
//       currentPage: pageNumber,
//       limit: limitNumber,
//     },
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | PUBLIC - GET SINGLE BLOG
// |--------------------------------------------------------------------------
// */

// export const getBlogBySlug =
//   asyncHandler(async (req, res) => {
//     const { slug } = req.params;

//     const blog =
//       await Blog.findOne({
//         slug,
//         isPublished: true,
//       })
//         .populate(
//           "author",
//           "name username email avatar bio"
//         )
//         .populate({
//           path: "comments",
//           populate: {
//             path: "author",
//             select: "name username avatar",
//           },
//         });

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     blog.views += 1;

//     await blog.save();

//     res.status(200).json({
//       success: true,
//       data: blog,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - CREATE BLOG
// |--------------------------------------------------------------------------
// */

// export const createBlog = asyncHandler(async (req, res) => {
//   const {
//     title,
//     excerpt,
//     content,
//     category,
//     tags,
//     readTime,
//     image,
//     isPublished,
//     isFeatured,
//   } = req.body;

//   if (!title || !excerpt || !content || !category) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "Title, excerpt, content and category are required",
//     });
//   }

//   const existingBlog = await Blog.findOne({
//     $or: [
//       {
//         title: title.trim(),
//       },
//       {
//         slug: title
//           .toLowerCase()
//           .trim()
//           .replace(/[^\w\s-]/g, "")
//           .replace(/\s+/g, "-")
//           .replace(/-+/g, "-"),
//       },
//     ],
//   });

//   if (existingBlog) {
//     return res.status(409).json({
//       success: false,
//       message: "A blog with this title already exists",
//     });
//   }

//   const blog = await Blog.create({
//     title: title.trim(),
//     excerpt: excerpt.trim(),
//     content,
//     category,

//     tags: Array.isArray(tags)
//       ? tags
//       : typeof tags === "string"
//       ? tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean)
//       : [],

//     readTime: readTime || 5,

//     image: image || null,

//     isPublished:
//       isPublished !== undefined
//         ? Boolean(isPublished)
//         : false,

//     isFeatured:
//       isFeatured !== undefined
//         ? Boolean(isFeatured)
//         : false,

//     // IMPORTANT
//     author: req.admin._id,
//   });

//   const populatedBlog = await Blog.findById(blog._id).populate(
//     "author",
//     "name username email avatar"
//   );

//   res.status(201).json({
//     success: true,
//     message: "Blog created successfully",
//     data: populatedBlog,
//   });
// });
// /*
// |--------------------------------------------------------------------------
// | ADMIN - UPDATE BLOG
// |--------------------------------------------------------------------------
// */

// export const updateBlog =
//   asyncHandler(async (req, res) => {
//     const blog =
//       await Blog.findById(
//         req.params.id
//       );

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     const {
//       title,
//       excerpt,
//       content,
//       category,
//       tags,
//       readTime,
//       image,
//       isPublished,
//       isFeatured,
//     } = req.body;

//     if (title !== undefined) {
//       blog.title = title;
//     }

//     if (excerpt !== undefined) {
//       blog.excerpt = excerpt;
//     }

//     if (content !== undefined) {
//       blog.content = content;
//     }

//     if (category !== undefined) {
//       blog.category = category;
//     }

//     if (tags !== undefined) {
//       blog.tags =
//         Array.isArray(tags)
//           ? tags
//           : tags
//               .split(",")
//               .map((tag) =>
//                 tag.trim()
//               )
//               .filter(Boolean);
//     }

//     if (readTime !== undefined) {
//       blog.readTime =
//         Number(readTime) || 5;
//     }

//     if (image !== undefined) {
//       blog.image = image;
//     }

//     if (isFeatured !== undefined) {
//       blog.isFeatured =
//         Boolean(isFeatured);
//     }

//     if (isPublished !== undefined) {
//       const wasPublished =
//         blog.isPublished;

//       blog.isPublished =
//         Boolean(isPublished);

//       if (
//         !wasPublished &&
//         blog.isPublished
//       ) {
//         blog.publishedAt =
//           new Date();
//       }

//       if (!blog.isPublished) {
//         blog.publishedAt = null;
//       }
//     }

//     await blog.save();

//     const updatedBlog =
//       await Blog.findById(
//         blog._id
//       ).populate(
//         "author",
//         "name username email avatar bio"
//       );

//     res.status(200).json({
//       success: true,
//       message:
//         "Blog updated successfully",
//       data: updatedBlog,
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE BLOG
// |--------------------------------------------------------------------------
// */

// export const deleteBlog = asyncHandler(async (req, res) => {
//   const blog = await Blog.findById(req.params.id);

//   if (!blog) {
//     return res.status(404).json({
//       success: false,
//       message: "Blog not found",
//     });
//   }

//   await Blog.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     message: "Blog deleted successfully",
//   });
// });

// /*
// |--------------------------------------------------------------------------
// | USER - LIKE
// |--------------------------------------------------------------------------
// */

// export const likeBlog =
//   asyncHandler(async (req, res) => {
//     const blog =
//       await Blog.findById(
//         req.params.id
//       );

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     const userId =
//       req.user._id.toString();

//     const likedIndex =
//       blog.likedBy.findIndex(
//         (id) =>
//           id.toString() ===
//           userId
//       );

//     const dislikedIndex =
//       blog.dislikedBy.findIndex(
//         (id) =>
//           id.toString() ===
//           userId
//       );

//     if (likedIndex !== -1) {
//       blog.likedBy.splice(
//         likedIndex,
//         1
//       );

//       blog.likes = Math.max(
//         0,
//         blog.likes - 1
//       );
//     } else {
//       blog.likedBy.push(
//         req.user._id
//       );

//       blog.likes += 1;

//       if (dislikedIndex !== -1) {
//         blog.dislikedBy.splice(
//           dislikedIndex,
//           1
//         );

//         blog.dislikes =
//           Math.max(
//             0,
//             blog.dislikes - 1
//           );
//       }
//     }

//     await blog.save();

//     res.status(200).json({
//       success: true,
//       data: {
//         likes: blog.likes,
//         dislikes: blog.dislikes,
//         liked: likedIndex === -1,
//         disliked: false,
//       },
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | USER - DISLIKE
// |--------------------------------------------------------------------------
// */

// export const dislikeBlog =
//   asyncHandler(async (req, res) => {
//     const blog =
//       await Blog.findById(
//         req.params.id
//       );

//     if (!blog) {
//       return res.status(404).json({
//         success: false,
//         message: "Blog not found",
//       });
//     }

//     const userId =
//       req.user._id.toString();

//     const dislikedIndex =
//       blog.dislikedBy.findIndex(
//         (id) =>
//           id.toString() ===
//           userId
//       );

//     const likedIndex =
//       blog.likedBy.findIndex(
//         (id) =>
//           id.toString() ===
//           userId
//       );

//     if (
//       dislikedIndex !== -1
//     ) {
//       blog.dislikedBy.splice(
//         dislikedIndex,
//         1
//       );

//       blog.dislikes =
//         Math.max(
//           0,
//           blog.dislikes - 1
//         );
//     } else {
//       blog.dislikedBy.push(
//         req.user._id
//       );

//       blog.dislikes += 1;

//       if (likedIndex !== -1) {
//         blog.likedBy.splice(
//           likedIndex,
//           1
//         );

//         blog.likes =
//           Math.max(
//             0,
//             blog.likes - 1
//           );
//       }
//     }

//     await blog.save();

//     res.status(200).json({
//       success: true,
//       data: {
//         likes: blog.likes,
//         dislikes: blog.dislikes,
//         liked: false,
//         disliked:
//           dislikedIndex === -1,
//       },
//     });
//   });
import mongoose from "mongoose";
import Blog from "../models/Blog.js";
import { asyncHandler } from "../middleware/errorHandler.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const calculateWordCount = (content = "") => {
  return content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
};

const calculateReadTime = (wordCount) => {
  const WORDS_PER_MINUTE = 200;

  return Math.max(
    1,
    Math.ceil(wordCount / WORDS_PER_MINUTE)
  );
};

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => String(tag).trim().toLowerCase())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);
  }

  return [];
};

/*
|--------------------------------------------------------------------------
| PUBLIC GET BLOGS
|--------------------------------------------------------------------------
*/

export const getAllBlogs = asyncHandler(
  async (req, res) => {
    const {
      category,
      page = 1,
      limit = 9,
      search,
    } = req.query;

    const pageNumber = Math.max(
      1,
      Number(page) || 1
    );

    const limitNumber = Math.min(
      50,
      Math.max(1, Number(limit) || 9)
    );

    const query = {
      isPublished: true,
    };

    if (
      category &&
      category !== "All"
    ) {
      query.category = category;
    }

    if (search?.trim()) {
      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const skip =
      (pageNumber - 1) * limitNumber;

    const [blogs, total] =
      await Promise.all([
        Blog.find(query)
          .populate(
            "author",
            "fullName username profilePicture"
          )
          .sort({
            publishedAt: -1,
            createdAt: -1,
          })
          .skip(skip)
          .limit(limitNumber)
          .lean(),

        Blog.countDocuments(query),
      ]);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  }
);

/*
|--------------------------------------------------------------------------
| PUBLIC SINGLE BLOG
|--------------------------------------------------------------------------
*/

export const getBlogBySlug = asyncHandler(
  async (req, res) => {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).populate(
      "author",
      "fullName username profilePicture bio"
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Published blog not found",
      });
    }

    blog.views += 1;

    await blog.save();

    res.status(200).json({
      success: true,
      data: blog,
    });
  }
);

/*
|--------------------------------------------------------------------------
| ADMIN GET ALL BLOGS
|--------------------------------------------------------------------------
*/

export const getAdminBlogs =
  asyncHandler(async (req, res) => {
    const {
      search,
      category,
      status,
      page = 1,
      limit = 100,
    } = req.query;

    const query = {};

    /*
     * Category filter
     */

    if (
      category &&
      category !== "All"
    ) {
      query.category = category;
    }

    /*
     * Status filter
     */

    if (status === "published") {
      query.isPublished = true;
    }

    if (status === "draft") {
      query.isPublished = false;
    }

    /*
     * Search
     */

    if (search?.trim()) {
      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          excerpt: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          content: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const pageNumber = Math.max(
      1,
      Number(page) || 1
    );

    const limitNumber = Math.min(
      200,
      Math.max(
        1,
        Number(limit) || 100
      )
    );

    const skip =
      (pageNumber - 1) * limitNumber;

    const [blogs, total] =
      await Promise.all([
        Blog.find(query)
          .populate(
            "author",
            "fullName username profilePicture"
          )
          .sort({
            updatedAt: -1,
          })
          .skip(skip)
          .limit(limitNumber)
          .lean(),

        Blog.countDocuments(query),
      ]);

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        total,
        pages: Math.ceil(
          total / limitNumber
        ),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
  });

/*
|--------------------------------------------------------------------------
| CREATE BLOG
|--------------------------------------------------------------------------
*/

export const createBlog =
  asyncHandler(async (req, res) => {
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      readTime,
      coverImage,
      isPublished,
      isFeatured,
    } = req.body;

    if (
      !title?.trim() ||
      !excerpt?.trim() ||
      !content?.trim() ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, excerpt, content and category are required",
      });
    }

    const wordCount =
      calculateWordCount(content);

    const finalReadTime =
      readTime &&
      Number(readTime) > 0
        ? Number(readTime)
        : calculateReadTime(
            wordCount
          );

    const published =
      Boolean(isPublished);

    const blog = await Blog.create({
      title: title.trim(),

      excerpt: excerpt.trim(),

      content,

      category,

      tags: normalizeTags(tags),

      coverImage:
        coverImage?.trim() || "",

      readTime: finalReadTime,

      wordCount,

      isPublished: published,

      publishedAt: published
        ? new Date()
        : null,

      isFeatured:
        Boolean(isFeatured),

      author: req.admin._id,
    });

    const populated =
      await Blog.findById(
        blog._id
      ).populate(
        "author",
        "fullName username profilePicture"
      );

    res.status(201).json({
      success: true,

      message: published
        ? "Blog published successfully"
        : "Draft saved successfully",

      data: populated,
    });
  });

/*
|--------------------------------------------------------------------------
| UPDATE BLOG
|--------------------------------------------------------------------------
*/

export const updateBlog =
  asyncHandler(async (req, res) => {
    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const {
      title,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      readTime,
      isPublished,
      isFeatured,
    } = req.body;

    /*
     * Basic fields
     */

    if (title !== undefined) {
      blog.title =
        String(title).trim();
    }

    if (excerpt !== undefined) {
      blog.excerpt =
        String(excerpt).trim();
    }

    if (content !== undefined) {
      blog.content = content;
    }

    if (category !== undefined) {
      blog.category = category;
    }

    if (tags !== undefined) {
      blog.tags =
        normalizeTags(tags);
    }

    if (
      coverImage !== undefined
    ) {
      blog.coverImage =
        String(coverImage).trim();
    }

    if (readTime !== undefined) {
      blog.readTime =
        Number(readTime) > 0
          ? Number(readTime)
          : calculateReadTime(
              calculateWordCount(
                blog.content
              )
            );
    }

    if (
      isFeatured !== undefined
    ) {
      blog.isFeatured =
        Boolean(isFeatured);
    }

    /*
     * Word count
     */

    blog.wordCount =
      calculateWordCount(
        blog.content
      );

    /*
     * Publish / Draft handling
     */

    if (
      isPublished !== undefined
    ) {
      const wasPublished =
        blog.isPublished;

      blog.isPublished =
        Boolean(isPublished);

      /*
       * Draft -> Published
       */

      if (
        !wasPublished &&
        blog.isPublished
      ) {
        blog.publishedAt =
          new Date();
      }

      /*
       * Published -> Draft
       */

      if (!blog.isPublished) {
        blog.publishedAt = null;
      }
    }

    await blog.save();

    const updated =
      await Blog.findById(
        blog._id
      ).populate(
        "author",
        "fullName username profilePicture"
      );

    res.status(200).json({
      success: true,

      message:
        updated.isPublished
          ? "Blog updated and published successfully"
          : "Blog saved as draft successfully",

      data: updated,
    });
  });

/*
|--------------------------------------------------------------------------
| DELETE BLOG
|--------------------------------------------------------------------------
*/

export const deleteBlog =
  asyncHandler(async (req, res) => {
    const blog =
      await Blog.findById(
        req.params.id
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  });

/*
|--------------------------------------------------------------------------
| LIKE BLOG - PUBLIC
|--------------------------------------------------------------------------
*/
export const likeBlog = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog =
      await Blog.findOneAndUpdate(
        {
          _id: id,
          isPublished: true,
        },
        {
          $inc: {
            likes: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          "Blog not found or not published",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog liked successfully",
      likes: blog.likes,
    });
  }
);

/*
|--------------------------------------------------------------------------
| DISLIKE BLOG - PUBLIC
|--------------------------------------------------------------------------
*/

export const dislikeBlog = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog =
      await Blog.findOneAndUpdate(
        {
          _id: id,
          isPublished: true,
        },
        {
          $inc: {
            dislikes: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          "Blog not found or not published",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Blog disliked successfully",
      dislikes: blog.dislikes,
    });
  }
);

/*
|--------------------------------------------------------------------------
| REGISTER VIEW - PUBLIC
|--------------------------------------------------------------------------
*/
export const registerBlogView = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    console.log(
      "REGISTER BLOG VIEW:",
      id
    );

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog =
      await Blog.findOneAndUpdate(
        {
          _id: id,
          isPublished: true,
        },
        {
          $inc: {
            views: 1,
          },
        },
        {
          new: true,
        }
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          "Blog not found or not published",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog view registered",
      views: blog.views,
    });
  }
);