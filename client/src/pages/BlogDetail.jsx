// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   FaThumbsUp,
//   FaThumbsDown,
//   FaEye,
//   FaCalendar,
//   FaUser,
//   FaShare,
// } from "react-icons/fa";
// import "./BlogDetail.css";

// const BlogDetail = () => {
//   const { slug } = useParams();
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [showCommentForm, setShowCommentForm] = useState(false);
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       author: "Priya Singh",
//       date: "2024-01-15",
//       text: "This article was incredibly helpful! Thank you for sharing such valuable insights.",
//       approved: true,
//     },
//     {
//       id: 2,
//       author: "Rajesh Kumar",
//       date: "2024-01-14",
//       text: "Great explanation of complex concepts. Looking forward to more articles like this.",
//       approved: true,
//     },
//   ]);

//   // Sample blog post data - Replace with API call
//   const blogPost = {
//     id: 1,
//     title: "Understanding Your Horoscope: A Beginner's Guide",
//     slug: "understanding-horoscope",
//     author: "Dr. Amit Kumar Pushpam",
//     date: "2024-01-15",
//     readTime: 5,
//     views: 1250,
//     category: "Astrology",
//     tags: ["Astrology", "Horoscope", "Guide"],
//     image: "🌙",
//     likes: 85,
//     dislikes: 5,
//     content: `
//       <h2>Introduction to Astrology</h2>
//       <p>
//         Astrology is an ancient science that has guided humanity for thousands of years. 
//         It is based on the belief that celestial bodies influence our lives and personalities.
//       </p>

//       <h2>Understanding Your Birth Chart</h2>
//       <p>
//         Your birth chart is a snapshot of the sky at the exact moment you were born. 
//         It contains valuable information about your personality, strengths, and life path.
//       </p>

//       <h3>Key Elements of a Birth Chart:</h3>
//       <ul>
//         <li><strong>Sun Sign:</strong> Your core identity and basic personality traits</li>
//         <li><strong>Moon Sign:</strong> Your emotional nature and inner world</li>
//         <li><strong>Rising Sign (Ascendant):</strong> How others perceive you</li>
//         <li><strong>Houses:</strong> Different areas of life (career, relationships, health, etc.)</li>
//         <li><strong>Planets:</strong> Different aspects of our personality and life experiences</li>
//         <li><strong>Aspects:</strong> The relationships between planets in your chart</li>
//       </ul>

//       <h2>How to Read Your Horoscope</h2>
//       <p>
//         Reading your horoscope involves understanding the current planetary positions and 
//         how they interact with your natal chart. Here are some tips for getting the most out of your horoscope:
//       </p>

//       <ol>
//         <li>Know your birth details (date, time, and location)</li>
//         <li>Understand your birth chart</li>
//         <li>Read your horoscope with an open mind</li>
//         <li>Consider the broader context of your life</li>
//         <li>Use it as guidance, not absolute truth</li>
//       </ol>

//       <h2>Practical Applications</h2>
//       <p>
//         Understanding your horoscope can help you make better decisions about your career, 
//         relationships, and personal growth. It provides valuable insights into your strengths 
//         and challenges, helping you navigate life with more confidence and clarity.
//       </p>

//       <h2>Conclusion</h2>
//       <p>
//         Your horoscope is a powerful tool for self-discovery and personal development. 
//         Whether you're new to astrology or already familiar with it, understanding your birth 
//         chart can open up new perspectives on your life and help you align with your true purpose.
//       </p>
//     `,
//   };

//   const handleLike = () => {
//     setLiked(!liked);
//     if (disliked) setDisliked(false);
//   };

//   const handleDislike = () => {
//     setDisliked(!disliked);
//     if (liked) setLiked(false);
//   };

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (commentText.trim()) {
//       const newComment = {
//         id: comments.length + 1,
//         author: "You",
//         date: new Date().toLocaleDateString(),
//         text: commentText,
//         approved: false,
//       };
//       setComments([...comments, newComment]);
//       setCommentText("");
//       setShowCommentForm(false);
//     }
//   };

//   const approvedComments = comments.filter((c) => c.approved);

//   return (
//     <div className="blog-detail">
//       {/* Hero Section */}
//       <section className="blog-detail-hero">
//         <div className="container">
//           <div className="breadcrumb">
//             <Link to="/blog">Blog</Link>
//             <span>/</span>
//             <span>{blogPost.category}</span>
//           </div>
//           <h1>{blogPost.title}</h1>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="blog-detail-content">
//         <div className="container">
//           <div className="content-grid">
//             {/* Main Content */}
//             <div className="main-content">
//               {/* Article Meta */}
//               <div className="article-meta">
//                 <span className="meta-badge">{blogPost.category}</span>
//                 <div className="meta-info">
//                   <span className="meta-item">
//                     <FaUser /> {blogPost.author}
//                   </span>
//                   <span className="meta-item">
//                     <FaCalendar /> {blogPost.date}
//                   </span>
//                   <span className="meta-item">
//                     <FaEye /> {blogPost.views} views
//                   </span>
//                   <span className="meta-item">⏱️ {blogPost.readTime} min read</span>
//                 </div>
//               </div>

//               {/* Featured Image */}
//               <div className="featured-image">
//                 <div className="image-placeholder">{blogPost.image}</div>
//               </div>

//               {/* Article Content */}
//               <div
//                 className="article-body"
//                 dangerouslySetInnerHTML={{ __html: blogPost.content }}
//               />

//               {/* Tags */}
//               <div className="tags-section">
//                 <p className="tags-label">Tags:</p>
//                 <div className="tags">
//                   {blogPost.tags.map((tag, index) => (
//                     <span key={index} className="tag">
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Article Footer */}
//               <div className="article-footer">
//                 <div className="article-actions">
//                   <button
//                     className={`action-btn ${liked ? "liked" : ""}`}
//                     onClick={handleLike}
//                   >
//                     <FaThumbsUp /> Like ({liked ? blogPost.likes + 1 : blogPost.likes})
//                   </button>
//                   <button
//                     className={`action-btn ${disliked ? "disliked" : ""}`}
//                     onClick={handleDislike}
//                   >
//                     <FaThumbsDown /> Dislike ({disliked ? blogPost.dislikes + 1 : blogPost.dislikes})
//                   </button>
//                   <button className="action-btn">
//                     <FaShare /> Share
//                   </button>
//                 </div>
//               </div>

//               {/* Author Bio */}
//               <div className="author-bio">
//                 <div className="author-avatar">AK</div>
//                 <div className="author-info">
//                   <h3>{blogPost.author}</h3>
//                   <p>
//                     Expert in occult psychology, spirituality, and holistic wellness with 20+ years
//                     of experience in transforming lives through ancient wisdom and modern psychology.
//                   </p>
//                   <a href="#contact" className="btn btn-secondary" style={{ marginTop: "10px" }}>
//                     Contact Author
//                   </a>
//                 </div>
//               </div>

//               {/* Comments Section */}
//               <div className="comments-section">
//                 <h2>Comments ({approvedComments.length})</h2>

//                 {/* Add Comment Form */}
//                 {!showCommentForm ? (
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowCommentForm(true)}
//                     style={{ width: "100%", marginBottom: "30px" }}
//                   >
//                     Add a Comment
//                   </button>
//                 ) : (
//                   <form onSubmit={handleCommentSubmit} className="comment-form">
//                     <textarea
//                       placeholder="Share your thoughts..."
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       rows="5"
//                       required
//                     />
//                     <div className="form-actions">
//                       <button type="submit" className="btn btn-primary">
//                         Post Comment
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-secondary"
//                         onClick={() => setShowCommentForm(false)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                     <p className="comment-note">
//                       📝 Your comment will be visible after admin approval.
//                     </p>
//                   </form>
//                 )}

//                 {/* Comments List */}
//                 <div className="comments-list">
//                   {approvedComments.length > 0 ? (
//                     approvedComments.map((comment) => (
//                       <div key={comment.id} className="comment-card">
//                         <div className="comment-header">
//                           <div className="comment-avatar">{comment.author.charAt(0)}</div>
//                           <div className="comment-meta">
//                             <h4>{comment.author}</h4>
//                             <p>{comment.date}</p>
//                           </div>
//                         </div>
//                         <p className="comment-text">{comment.text}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="no-comments">No comments yet. Be the first to comment!</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <aside className="sidebar">
//               {/* Related Articles */}
//               <div className="sidebar-widget">
//                 <h3>Related Articles</h3>
//                 <div className="related-articles">
//                   <a href="#related1" className="related-item">
//                     <span className="related-icon">🌙</span>
//                     <span className="related-title">Mercury Retrograde Explained</span>
//                   </a>
//                   <a href="#related2" className="related-item">
//                     <span className="related-icon">✨</span>
//                     <span className="related-title">Spiritual Practices for Daily Life</span>
//                   </a>
//                   <a href="#related3" className="related-item">
//                     <span className="related-icon">🧠</span>
//                     <span className="related-title">Psychology of Self-Discovery</span>
//                   </a>
//                 </div>
//               </div>

//               {/* Newsletter */}
//               <div className="sidebar-widget newsletter">
//                 <h3>Subscribe to Newsletter</h3>
//                 <p>Get weekly insights and articles delivered to your inbox.</p>
//                 <form onSubmit={(e) => e.preventDefault()}>
//                   <input type="email" placeholder="Your email" required />
//                   <button type="submit" className="btn btn-primary">
//                     Subscribe
//                   </button>
//                 </form>
//               </div>

//               {/* Categories */}
//               <div className="sidebar-widget">
//                 <h3>Categories</h3>
//                 <div className="categories">
//                   <a href="#astrology" className="category-link">
//                     Astrology <span className="count">12</span>
//                   </a>
//                   <a href="#psychology" className="category-link">
//                     Psychology <span className="count">8</span>
//                   </a>
//                   <a href="#spiritual" className="category-link">
//                     Spiritual <span className="count">15</span>
//                   </a>
//                   <a href="#paranormal" className="category-link">
//                     Paranormal <span className="count">6</span>
//                   </a>
//                 </div>
//               </div>
//             </aside>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default BlogDetail;



// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useParams,
//   Link,
// } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaClock,
//   FaEye,
// } from "react-icons/fa";

// import { apiFetch } from "../utils/api";

// import "./ContentDetail.css";

// const BlogDetail = () => {
//   const { slug } = useParams();

//   const [blog, setBlog] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     const fetchBlog =
//       async () => {
//         try {
//           setLoading(true);

//           const response =
//             await apiFetch(
//               `/blogs/${slug}`
//             );

//           setBlog(
//             response?.data
//           );
//         } catch (err) {
//           setError(
//             err.message ||
//               "Blog not found."
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//     fetchBlog();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="detail-loading">
//         Loading article...
//       </div>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <div className="detail-error">
//         <h2>
//           Blog not found
//         </h2>

//         <p>
//           {error}
//         </p>

//         <Link to="/blogs">
//           Back to Blogs
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <main className="content-detail">

//       <div className="detail-container">

//         <Link
//           to="/blogs"
//           className="back-link"
//         >
//           <FaArrowLeft />
//           Back to Blogs
//         </Link>

//         <header className="detail-header">

//           <span className="detail-category">
//             {blog.category}
//           </span>

//           <h1>
//             {blog.title}
//           </h1>

//           {blog.excerpt && (
//             <p className="detail-excerpt">
//               {blog.excerpt}
//             </p>
//           )}

//           <div className="detail-meta">

//             {blog.author && (
//               <span>
//                 By{" "}
//                 {blog.author.name ||
//                   blog.author.username ||
//                   "Prosper Foundation"}
//               </span>
//             )}

//             {blog.createdAt && (
//               <span>
//                 {new Date(
//                   blog.createdAt
//                 ).toLocaleDateString(
//                   "en-IN",
//                   {
//                     day: "2-digit",
//                     month: "long",
//                     year: "numeric",
//                   }
//                 )}
//               </span>
//             )}

//             {blog.readingTime && (
//               <span>
//                 <FaClock />
//                 {blog.readingTime} min read
//               </span>
//             )}

//             <span>
//               <FaEye />
//               {blog.views || 0}
//             </span>

//           </div>

//         </header>

//         {blog.coverImage && (
//           <div className="detail-cover">
//             <img
//               src={
//                 blog.fcoverImage
//               }
//               alt={blog.title}
//             />
//           </div>
//         )}

//         <article
//           className="detail-content"
//           dangerouslySetInnerHTML={{
//             __html:
//               blog.content || "",
//           }}
//         />

//         {blog.tags?.length > 0 && (
//           <div className="detail-tags">

//             {blog.tags.map(
//               (tag) => (
//                 <span key={tag}>
//                   #{tag}
//                 </span>
//               )
//             )}

//           </div>
//         )}

//       </div>

//     </main>
//   );
// };

// export default BlogDetail;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Eye,
  Share2,
  Tag,
  UserRound,
  AlertCircle,
  Check,
  MessageCircle,
  Heart,
  ThumbsDown,
  Send,
  Copy,
  Sparkles,
} from "lucide-react";

import api from "../api/api";
import {
  getComments,
  createComment,
} from "../api/commentApi";

import "./BlogDetail.css";

/* =========================================================
   HELPERS
========================================================= */

const getImage = (blog) =>
  blog?.coverImage ||
  blog?.image ||
  blog?.featuredImage ||
  "";

const getAuthorName = (blog) => {
  if (typeof blog?.author === "string") {
    return blog.author;
  }

  return (
    blog?.author?.name ||
    blog?.author?.fullName ||
    blog?.author?.username ||
    "Prosper Foundation"
  );
};

const getAuthorAvatar = (blog) => {
  if (
    !blog?.author ||
    typeof blog.author !== "object"
  ) {
    return "";
  }

  return (
    blog.author.avatar ||
    blog.author.profileImage ||
    ""
  );
};

const getContentId = (blog) => {
  if (!blog) return "";

  return (
    blog.contentId ||
    blog.content?._id ||
    blog.content?.id ||
    blog.contentRef ||
    blog._id ||
    ""
  );
};

const formatDate = (date) => {
  if (!date) return "Recently";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const createExcerpt = (text = "") => {
  const clean = String(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return clean.substring(0, 155);
};

/* =========================================================
   COMPONENT
========================================================= */

export default function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);

  const [interaction, setInteraction] = useState({
    likes: 0,
    dislikes: 0,
    liked: false,
    disliked: false,
  });

  const [interactionLoading, setInteractionLoading] =
    useState(false);

  const [reactionMessage, setReactionMessage] =
    useState("");

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] =
    useState(false);

  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  const [commentLoading, setCommentLoading] =
    useState(false);

  const [commentMessage, setCommentMessage] =
    useState("");

  const [commentError, setCommentError] =
    useState("");

  /* =========================================================
     FETCH BLOG
  ========================================================= */

  const fetchBlog = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/blogs/${encodeURIComponent(slug)}`
      );

      const data =
        response?.data?.data ||
        response?.data?.blog ||
        response?.data;

      if (!data) {
        throw new Error("Blog not found");
      }

      console.log("BLOG DATA:", data);
      console.log(
        "BLOG ID:",
        data._id
      );
      console.log(
        "COMMENT CONTENT ID:",
        getContentId(data)
      );

      setBlog(data);

      setInteraction({
        likes: Number(data.likes || 0),
        dislikes: Number(data.dislikes || 0),
        liked: Boolean(data.liked),
        disliked: Boolean(data.disliked),
      });
    } catch (err) {
      console.error(
        "Failed to fetch blog:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load this article."
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  /* =========================================================
     CONTENT ID
  ========================================================= */

  const contentId = useMemo(
    () => getContentId(blog),
    [blog]
  );

  /* =========================================================
     FETCH COMMENTS
  ========================================================= */

  const fetchBlogComments = useCallback(
    async (id) => {
      if (!id) return;

      try {
        setCommentsLoading(true);

        /*
         * IMPORTANT:
         * The comments system is shared by Blog,
         * Story, Poem and other Content.
         */

        const response = await getComments(
          id,
          "Blog"
        );

        const data =
          response?.data ||
          [];

        const safeComments = Array.isArray(data)
          ? data.map((comment) => ({
              ...comment,

              authorName:
                comment?.name ||
                comment?.author?.name ||
                comment?.author?.username ||
                "Reader",
            }))
          : [];

        setComments(safeComments);
      } catch (err) {
        console.error(
          "Failed to fetch comments:",
          err?.response?.data || err
        );

        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    },
    []
  );

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchBlog();

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [fetchBlog]);

  /* =========================================================
     LOAD COMMENTS
  ========================================================= */

  useEffect(() => {
    if (!contentId) return;

    fetchBlogComments(contentId);
  }, [
    contentId,
    fetchBlogComments,
  ]);

  /* =========================================================
     SHARE
  ========================================================= */

  const shareData = useMemo(() => {
    return {
      title:
        blog?.title ||
        "Prosper Foundation",
      text:
        blog?.excerpt ||
        createExcerpt(blog?.content),
      url: window.location.href,
    };
  }, [blog]);

  const handleShare = async () => {
    try {
      if (
        navigator.share &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);
        return;
      }

      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText ===
          "function"
      ) {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2200);
      }
    } catch (err) {
      if (err?.name !== "AbortError") {
        console.error(
          "Share failed:",
          err
        );
      }
    }
  };

  /* =========================================================
     REGISTER VIEW
  ========================================================= */

  const registerView = useCallback(
    async (blogId) => {
      if (!blogId) return;

      try {
        await api.post(
          `/blogs/${blogId}/view`
        );
      } catch (err) {
        console.warn(
          "View registration failed:",
          err?.response?.data?.message ||
            err?.message
        );
      }
    },
    []
  );

  useEffect(() => {
    if (!blog?._id) return;

    registerView(blog._id);
  }, [
    blog?._id,
    registerView,
  ]);

  /* =========================================================
     LIKE
  ========================================================= */

  const handleLike = async () => {
    if (
      !blog?._id ||
      interactionLoading
    ) {
      return;
    }

    try {
      setInteractionLoading(true);
      setReactionMessage("");

      const response = await api.post(
        `/blogs/${blog._id}/like`
      );

      const data =
        response?.data?.data ||
        response?.data;

      if (data) {
        setInteraction({
          likes: Number(data.likes || 0),
          dislikes: Number(
            data.dislikes || 0
          ),
          liked: Boolean(data.liked),
          disliked: Boolean(
            data.disliked
          ),
        });
      }

      setReactionMessage(
        "Thanks for sharing your response."
      );

      setTimeout(() => {
        setReactionMessage("");
      }, 2500);
    } catch (err) {
      setReactionMessage(
        err?.response?.data?.message ||
          "Unable to register your like."
      );
    } finally {
      setInteractionLoading(false);
    }
  };

  /* =========================================================
     DISLIKE
  ========================================================= */

  const handleDislike = async () => {
    if (
      !blog?._id ||
      interactionLoading
    ) {
      return;
    }

    try {
      setInteractionLoading(true);
      setReactionMessage("");

      const response = await api.post(
        `/blogs/${blog._id}/dislike`
      );

      const data =
        response?.data?.data ||
        response?.data;

      if (data) {
        setInteraction({
          likes: Number(data.likes || 0),
          dislikes: Number(
            data.dislikes || 0
          ),
          liked: Boolean(data.liked),
          disliked: Boolean(
            data.disliked
          ),
        });
      }

      setReactionMessage(
        "Thanks for sharing your response."
      );

      setTimeout(() => {
        setReactionMessage("");
      }, 2500);
    } catch (err) {
      setReactionMessage(
        err?.response?.data?.message ||
          "Unable to register your response."
      );
    } finally {
      setInteractionLoading(false);
    }
  };

  /* =========================================================
     COMMENT SUBMIT
  ========================================================= */

  const handleCommentSubmit = async (
    event
  ) => {
    event.preventDefault();

    setCommentMessage("");
    setCommentError("");

    const name = commentName.trim();
    const text = commentText.trim();

    if (!name) {
      setCommentError(
        "Please enter your name."
      );
      return;
    }

    if (!text) {
      setCommentError(
        "Please write a comment before submitting."
      );
      return;
    }

    if (!contentId) {
      setCommentError(
        "This article cannot accept comments right now."
      );
      return;
    }

    try {
      setCommentLoading(true);

      const payload = {
        contentId,
        contentType: "Blog",
        name,
        text,
      };

      console.log(
        "Submitting comment:",
        payload
      );

      /*
       * USE commentApi.
       * Do not directly duplicate comment API logic here.
       */

      const response =
        await createComment(
          contentId,
          name,
          text,
          "Blog"
        );

      console.log(
        "Comment submitted:",
        response
      );

      if (
        response?.success === false
      ) {
        throw new Error(
          response?.message ||
            "Unable to submit comment."
        );
      }

      setCommentName("");
      setCommentText("");

      setCommentMessage(
        "Your comment has been submitted for review. It will appear after admin approval."
      );
    } catch (err) {
      console.error(
        "Comment failed:",
        err?.response?.data ||
          err
      );

      setCommentError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to submit your comment."
      );
    } finally {
      setCommentLoading(false);
    }
  };

  /* =========================================================
     ARTICLE CONTENT
  ========================================================= */

  const articleContent = useMemo(
    () => blog?.content || "",
    [blog]
  );

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="blog-detail-page">
        <div className="blog-detail-loading">
          <div className="loading-shimmer loading-hero" />

          <div className="blog-detail-container">
            <div className="loading-shimmer loading-line small" />
            <div className="loading-shimmer loading-line large" />
            <div className="loading-shimmer loading-line medium" />
            <div className="loading-shimmer loading-meta" />
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !blog) {
    return (
      <main className="blog-detail-page">
        <section className="blog-detail-error-page">
          <div className="error-icon">
            <AlertCircle size={30} />
          </div>

          <span>ARTICLE UNAVAILABLE</span>

          <h1>
            We couldn't find this article.
          </h1>

          <p>
            {error ||
              "The article may have been unpublished, moved, or deleted."}
          </p>

          <div className="error-actions">
            <button
              type="button"
              onClick={fetchBlog}
            >
              Try again
            </button>

            <Link to="/blog">
              <ArrowLeft size={16} />
              Back to journal
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-detail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="blog-detail-hero">

        <div className="hero-image">
          {getImage(blog) && (
            <img
              src={getImage(blog)}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>

        <div className="hero-gradient" />

        <div className="blog-detail-container hero-container">

          <Link
            to="/blog"
            className="back-link"
          >
            <ArrowLeft size={16} />
            Back to journal
          </Link>

          <div className="hero-content">

            <div className="hero-kicker">
              <Sparkles size={14} />

              <span>
                {blog.category ||
                  "Prosper Foundation Journal"}
              </span>
            </div>

            <h1>{blog.title}</h1>

            {blog.excerpt && (
              <p className="hero-excerpt">
                {blog.excerpt}
              </p>
            )}

            <div className="hero-meta">

              <div className="hero-author">
                <div className="author-avatar">
                  {getAuthorAvatar(blog) ? (
                    <img
                      src={getAuthorAvatar(blog)}
                      alt={getAuthorName(blog)}
                    />
                  ) : (
                    <UserRound size={18} />
                  )}
                </div>

                <div>
                  <small>
                    Written by
                  </small>

                  <strong>
                    {getAuthorName(blog)}
                  </strong>
                </div>
              </div>

              <span className="meta-divider" />

              <span>
                <CalendarDays size={15} />
                {formatDate(
                  blog.publishedAt ||
                    blog.createdAt
                )}
              </span>

              <span>
                <Clock3 size={15} />
                {blog.readTime || 5} min read
              </span>

              <span>
                <Eye size={15} />
                {blog.views || 0} views
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="blog-detail-main">

        <div className="blog-detail-container article-grid">

          {/* SHARE RAIL */}

          <aside className="share-rail">
            <span>SHARE</span>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share article"
              title="Share article"
            >
              {copied ? (
                <Check size={17} />
              ) : (
                <Share2 size={17} />
              )}
            </button>

            <small>
              {copied ? "Copied" : ""}
            </small>
          </aside>

          {/* ARTICLE */}

          <article className="blog-detail-article">

            <div className="reading-intro">
              <BookOpen size={18} />

              <span>
                Take a moment. Read slowly.
              </span>
            </div>

            <div
              className="blog-detail-content"
              dangerouslySetInnerHTML={{
                __html: articleContent,
              }}
            />

            {/* TAGS */}

            {Array.isArray(blog.tags) &&
              blog.tags.length > 0 && (
                <div className="article-tags">

                  <div className="tags-heading">
                    <Tag size={16} />
                    <span>
                      Filed under
                    </span>
                  </div>

                  <div className="tag-list">
                    {blog.tags.map(
                      (tag, index) => (
                        <Link
                          key={`${tag}-${index}`}
                          to={`/blog?search=${encodeURIComponent(
                            tag
                          )}`}
                        >
                          #{tag}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* AUTHOR */}

            <section className="author-card">

              <div className="author-card-avatar">
                {getAuthorAvatar(blog) ? (
                  <img
                    src={getAuthorAvatar(blog)}
                    alt={getAuthorName(blog)}
                  />
                ) : (
                  <UserRound size={26} />
                )}
              </div>

              <div>
                <span>
                  ABOUT THE AUTHOR
                </span>

                <h3>
                  {getAuthorName(blog)}
                </h3>

                <p>
                  {blog.author?.bio ||
                    "Contributor to Prosper Foundation's journal, exploring ideas around personal growth, consciousness and holistic understanding."}
                </p>
              </div>
            </section>

            {/* REACTIONS */}

            <section className="reaction-section">

              <div>
                <span className="section-eyebrow">
                  YOUR RESPONSE
                </span>

                <h3>
                  Was this perspective useful?
                </h3>

                <p>
                  Tell us what resonated with you.
                </p>

                {reactionMessage && (
                  <small>
                    {reactionMessage}
                  </small>
                )}
              </div>

              <div className="reaction-buttons">

                <button
                  type="button"
                  disabled={interactionLoading}
                  className={
                    interaction.liked
                      ? "active"
                      : ""
                  }
                  onClick={handleLike}
                >
                  <Heart
                    size={17}
                    fill={
                      interaction.liked
                        ? "currentColor"
                        : "none"
                    }
                  />

                  <span>Like</span>

                  <b>
                    {interaction.likes}
                  </b>
                </button>

                <button
                  type="button"
                  disabled={interactionLoading}
                  className={
                    interaction.disliked
                      ? "active"
                      : ""
                  }
                  onClick={
                    handleDislike
                  }
                >
                  <ThumbsDown size={17} />

                  <span>
                    Dislike
                  </span>

                  <b>
                    {interaction.dislikes}
                  </b>
                </button>

              </div>
            </section>

            {/* COMMENTS */}

            <section
              className="comments-section"
              id="comments"
            >

              <div className="comments-header">

                <div>
                  <span className="section-eyebrow">
                    COMMUNITY
                  </span>

                  <h2>
                    Join the conversation
                  </h2>

                  <p>
                    Share a thought, reflection,
                    or question about this article.
                  </p>
                </div>

                <div className="comment-count">
                  <MessageCircle size={17} />
                  {comments.length}
                </div>

              </div>

              {/* FORM */}

              <form
                className="comment-form"
                onSubmit={
                  handleCommentSubmit
                }
              >

                <div className="form-top">

                  <div className="comment-form-icon">
                    <UserRound size={20} />
                  </div>

                  <div>
                    <strong>
                      Leave a comment
                    </strong>

                    <span>
                      Your name is displayed with your comment.
                    </span>
                  </div>

                </div>

                <div className="form-fields">

                  <div className="field">
                    <label htmlFor="comment-name">
                      Your name
                    </label>

                    <input
                      id="comment-name"
                      type="text"
                      value={commentName}
                      onChange={(e) =>
                        setCommentName(
                          e.target.value
                        )
                      }
                      placeholder="Enter your name"
                      maxLength={100}
                      autoComplete="name"
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="comment-text">
                      Your comment
                    </label>

                    <textarea
                      id="comment-text"
                      value={commentText}
                      onChange={(e) =>
                        setCommentText(
                          e.target.value
                        )
                      }
                      placeholder="Write your thoughts..."
                      maxLength={1000}
                      rows={5}
                    />
                  </div>

                </div>

                <div className="comment-form-bottom">

                  <span>
                    {commentText.length}/1000
                  </span>

                  <button
                    type="submit"
                    disabled={
                      commentLoading ||
                      !commentName.trim() ||
                      !commentText.trim()
                    }
                  >
                    {commentLoading ? (
                      <>
                        <span className="button-spinner" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit comment
                        <Send size={15} />
                      </>
                    )}
                  </button>

                </div>

                {commentMessage && (
                  <div className="message success">
                    <Check size={16} />
                    <span>
                      {commentMessage}
                    </span>
                  </div>
                )}

                {commentError && (
                  <div className="message error">
                    <AlertCircle size={16} />
                    <span>
                      {commentError}
                    </span>
                  </div>
                )}

              </form>

              {/* COMMENTS LIST */}

              <div className="comments-list">

                {commentsLoading ? (
                  <>
                    <div className="comment-skeleton" />
                    <div className="comment-skeleton" />
                  </>
                ) : comments.length === 0 ? (
                  <div className="comments-empty">
                    <div>
                      <MessageCircle size={27} />
                    </div>

                    <h3>
                      No comments yet
                    </h3>

                    <p>
                      Be the first to share your perspective.
                    </p>
                  </div>
                ) : (
                  comments.map(
                    (comment) => (
                      <article
                        className="comment-item"
                        key={comment._id}
                      >

                        <div className="comment-avatar">
                          <UserRound size={19} />
                        </div>

                        <div className="comment-content">

                          <div className="comment-top">

                            <strong>
                              {comment.name ||
                                comment.author?.name ||
                                "Reader"}
                            </strong>

                            <time>
                              {formatDate(
                                comment.createdAt
                              )}
                            </time>

                          </div>

                          <p>
                            {comment.text}
                          </p>

                        </div>

                      </article>
                    )
                  )
                )}

              </div>
            </section>
          </article>

          {/* SIDEBAR */}

          <aside className="article-sidebar">

            <div className="sidebar-card primary">

              <span>
                THE JOURNAL
              </span>

              <h3>
                Keep exploring.
              </h3>

              <p>
                Discover more thoughtful
                perspectives from Prosper
                Foundation.
              </p>

              <Link to="/blog">
                Explore journal
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="sidebar-card quote">

              <BookOpen size={22} />

              <blockquote>
                “Knowledge becomes meaningful
                when it leads to reflection.”
              </blockquote>

              <span>
                — Prosper Foundation
              </span>

            </div>

            {blog.category && (
              <div className="sidebar-card category-card">

                <span>
                  EXPLORE TOPIC
                </span>

                <strong>
                  {blog.category}
                </strong>

                <Link
                  to={`/blog?search=${encodeURIComponent(
                    blog.category
                  )}`}
                >
                  View related articles
                  <ArrowRight size={15} />
                </Link>

              </div>
            )}

          </aside>

        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="blog-bottom-cta">

        <div className="blog-detail-container">

          <div className="cta-inner">

            <div>
              <span>
                MORE FROM THE JOURNAL
              </span>

              <h2>
                Continue your exploration.
              </h2>
            </div>

            <Link to="/blog">
              Browse journal
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}