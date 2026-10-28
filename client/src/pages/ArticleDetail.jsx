import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaEye,
  FaClock,
  FaCalendarAlt,
  FaShareAlt,
  FaComment,
} from "react-icons/fa";

import {
  getArticleBySlug,
  registerArticleView,
  likeArticle,
  dislikeArticle,
} from "../api/articleApi";

import {
  getComments,
  createComment,
} from "../api/commentApi";

import "./ArticleDetail.css";

export default function ArticleDetail() {
  const { slug } = useParams();

  const [article, setArticle] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

 const [commentError, setCommentError]=useState(null);

//  const [CommentSubmitting, setCommentSubmitting]=useState(true);

  const [commentLoading, setCommentLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [commentText, setCommentText] =
    useState("");

  const [commentName, setCommentName] =
    useState("");
    // const [commentsLoading, setCommentsLoading] =
    // useState(false);

  const [liked, setLiked] =
    useState(false);

  const [shareMessage, setShareMessage] =
    useState("");

//   useEffect(() => {
//     loadArticle();
//   }, [slug]);


  // make fetchComments available to the whole component
const fetchComments = async (articleId) => {
  if (!articleId) {
    console.warn(
      "Skipping comments fetch: article ID missing."
    );
    return;
  }

  try {
    const data = await getComments(
      articleId,
      "Article"
    );

    setComments(
      Array.isArray(data) ? data : []
    );
  } catch (error) {
    console.error(
      "Failed to fetch comments:",
      error
    );

    setComments([]);
  }
};
  useEffect(() => {
  let cancelled = false;

  const loadArticle = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response =
        await getArticleBySlug(slug);

      const articleData =
        response?.data?.data ||
        response?.data ||
        null;

      if (!articleData?._id) {
        throw new Error(
          "Article not found."
        );
      }

      if (cancelled) return;

      setArticle(articleData);

      /*
       * Fetch comments only after we
       * have a valid article ID.
       */
      await fetchComments(
        articleData._id
      );

      /*
       * Register article view.
       */
      try {
        await registerArticleView(
          articleData._id
        );
      } catch (viewError) {
        console.warn(
          "Failed to register article view:",
          viewError
        );
      }
    } catch (error) {
      if (cancelled) return;

      console.error(
        "Failed to load article:",
        error
      );

      setArticle(null);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load article."
      );
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadArticle();

  return () => {
    cancelled = true;
  };
}, [slug]);
 
  const handleLike = async () => {
    if (!article?._id) return;

    try {
      const response =
        await likeArticle(
          article._id
        );

      setArticle((prev) => ({
        ...prev,
        likes:
          response?.likes ??
          prev.likes,
      }));

      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!article?._id) return;

    try {
      const response =
        await dislikeArticle(
          article._id
        );

      setArticle((prev) => ({
        ...prev,
        dislikes:
          response?.dislikes ??
          prev.dislikes,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
  e.preventDefault();

  if (!article?._id) {
    setCommentError(
      "Article is not available."
    );
    return;
  }

  const trimmedName =
    String(commentName || "").trim();

  const trimmedText =
    String(commentText || "").trim();

  if (!trimmedName) {
    setCommentError(
      "Please enter your name."
    );
    return;
  }

  if (!trimmedText) {
    setCommentError(
      "Please enter your comment."
    );
    return;
  }

  try {
    setCommentLoading(true);
    setCommentError("");

    console.log(
      "Submitting article comment:",
      {
        contentId: article._id,
        contentType: "Article",
        name: trimmedName,
        text: trimmedText,
      }
    );

    const response =
      await createComment(
        article._id,
        trimmedName,
        trimmedText,
        "Article"
      );

    console.log(
      "Comment created:",
      response
    );

    /*
     * Clear input fields.
     */
    setCommentName("");
    setCommentText("");

    /*
     * IMPORTANT:
     *
     * New comments are created as "pending".
     * Therefore they may NOT appear in public
     * comments until admin approves them.
     */
    setCommentError(
      "Comment submitted successfully. It will appear after admin approval."
    );

    /*
     * Fetch comments again.
     */
    await fetchComments(
      article._id
    );
  } catch (error) {
    console.error(
      "Comment submission failed:",
      error
    );

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to submit comment.";

    setCommentError(message);
  } finally {
    setCommentLoading(false);
  }
};
  
 

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setShareMessage(
        "Link copied!"
      );

      setTimeout(
        () =>
          setShareMessage(""),
        2000
      );
    } catch {
      setShareMessage(
        "Unable to copy link."
      );
    }
  };

  if (loading) {
    return (
      <div className="article-detail-loading">
        <div className="article-detail-spinner" />
        <p>
          Loading article...
        </p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail-error">
        <h2>
          Article unavailable
        </h2>

        <p>
          {error ||
            "The requested article could not be found."}
        </p>

        <Link to="/articles">
          Back to Articles
        </Link>
      </div>
    );
  }

  const words =
    article.content
      ?.replace(
        /<[^>]*>/g,
        " "
      )
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length || 0;

  const readingTime =
    Math.max(
      1,
      Math.ceil(words / 200)
    );

  return (
    <div className="article-detail-page">

      {/* HERO */}

      <section className="article-detail-hero">

        {article.coverImage && (
          <img
            src={
              article.coverImage
            }
            alt={
              article.title
            }
          />
        )}

        <div className="article-detail-hero-overlay" />

        <div className="article-detail-hero-content">

          <Link
            to="/articles"
            className="article-back"
          >
            <FaArrowLeft />
            Back to Articles
          </Link>

          {article.category && (
            <span className="detail-category">
              {article.category}
            </span>
          )}

          <h1>
            {article.title}
          </h1>

          {article.excerpt && (
            <p>
              {article.excerpt}
            </p>
          )}

          <div className="detail-meta">

            <span>
              <FaCalendarAlt />
              {new Date(
                article.publishedAt ||
                  article.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </span>

            <span>
              <FaClock />
              {readingTime} min read
            </span>

            <span>
              <FaEye />
              {article.views || 0}
            </span>

            <span>
              By{" "}
              {article.authorName ||
                "Prosper Foundation"}
            </span>

          </div>

        </div>
      </section>

      {/* ARTICLE */}

      <main className="article-detail-main">

        <article className="article-content-card">

          <div
            className="article-rich-content"
            dangerouslySetInnerHTML={{
              __html:
                article.content,
            }}
          />

          {/* TAGS */}

          {article.tags?.length >
            0 && (
            <div className="detail-tags">
              {article.tags.map(
                (tag) => (
                  <span key={tag}>
                    #{tag}
                  </span>
                )
              )}
            </div>
          )}

          {/* ACTIONS */}

          <div className="article-actions">

            <button
              onClick={
                handleLike
              }
              className={
                liked
                  ? "liked"
                  : ""
              }
            >
              {liked ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}

              {article.likes ||
                0}
            </button>

            <button
              onClick={
                handleDislike
              }
            >
              <FaThumbsDown />
              {article.dislikes ||
                0}
            </button>

            <button
              onClick={
                handleShare
              }
            >
              <FaShareAlt />
              Share
            </button>

          </div>

          {shareMessage && (
            <div className="share-message">
              {shareMessage}
            </div>
          )}

        </article>

        {/* COMMENTS */}

        {article.allowComments !==
          false && (
          <section className="article-comments">

            <div className="comments-heading">

              <span>
                <FaComment />
              </span>

              <div>
                <h2>
                  Join the conversation
                </h2>

                <p>
                  Share your thoughts
                  about this article.
                </p>
              </div>

            </div>

            <form
  className="comment-form"
  onSubmit={submitComment}
>
  <input
    type="text"
    value={commentName}
    onChange={(e) =>
      setCommentName(e.target.value)
    }
    placeholder="Your name"
    maxLength={100}
    disabled={commentLoading}
    required
  />

  <textarea
    value={commentText}
    onChange={(e) =>
      setCommentText(e.target.value)
    }
    placeholder="Write your comment..."
    rows={5}
    maxLength={1000}
    disabled={commentLoading}
    required
  />

  {commentError && (
    <div className="comment-form-message">
      {commentError}
    </div>
  )}

  <button
    type="submit"
    disabled={commentLoading}
  >
    {commentLoading
      ? "Submitting..."
      : "Post Comment"}
  </button>
</form>
            <div className="comments-list">

              {comments.length ===
              0 ? (
                <div className="no-comments">
                  <FaComment />

                  <p>
                    Be the first to
                    share your thoughts.
                  </p>
                </div>
              ) : (
                comments.map(
                  (comment) => (
                    <div
                      className="comment-card"
                      key={
                        comment._id
                      }
                    >

                      <div className="comment-avatar">
                        {(
                          comment.name ||
                          "A"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="comment-body">

                        <div className="comment-head">

                          <strong>
                            {
                              comment.name
                            }
                          </strong>

                          <span>
                            {comment.createdAt
                              ? new Date(
                                  comment.createdAt
                                ).toLocaleDateString(
                                  "en-IN"
                                )
                              : ""}
                          </span>

                        </div>

                        <p>
                          {
                            comment.text
                          }
                        </p>

                      </div>

                    </div>
                  )
                )
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  );
}