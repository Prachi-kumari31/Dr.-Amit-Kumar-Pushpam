// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   Link,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaBookOpen,
//   FaCalendarAlt,
//   FaClock,
//   FaComment,
//   FaEye,
//   FaFacebookF,
//   FaHeart,
//   FaLink,
//   FaPaperPlane,
//   FaPen,
//   FaQuoteLeft,
//   FaShareAlt,
//   FaTwitter,
//   FaUser,
//   FaFeatherAlt,
//   FaRegHeart,
//   FaSpinner,
//   FaCheckCircle,
//   FaPrint,
//   FaBookmark,
// } from "react-icons/fa";

// import {
//   getStoryBySlug,
//   getPublicStories,
//   registerStoryView,
//   likeStory,
// } from "../api/storyApi";

// import {
//   getComments,
//   createComment,
// } from "../api/commentApi";

// import "./StoryDetail.css";

// export default function StoryDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   const [story, setStory] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [comments, setComments] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [commentsLoading, setCommentsLoading] =
//     useState(true);

//   const [error, setError] = useState("");

//   const [commentName, setCommentName] =
//     useState("");
//   const [commentText, setCommentText] =
//     useState("");

//   const [submittingComment, setSubmittingComment] =
//     useState(false);

//   const [commentMessage, setCommentMessage] =
//     useState("");

//   const [liked, setLiked] = useState(false);
//   const [likes, setLikes] = useState(0);

//   const [readingProgress, setReadingProgress] =
//     useState(0);

//   const [copied, setCopied] = useState(false);
//   const [bookmarked, setBookmarked] =
//     useState(false);

//   /*
//   |--------------------------------------------------------------------------
//   | LOAD STORY
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     let mounted = true;

//     const loadStory = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response =
//           await getStoryBySlug(slug);

//         const item = response?.data;

//         if (!item) {
//           throw new Error(
//             "Story not found"
//           );
//         }

//         if (!mounted) return;

//         setStory(item);
//         setLikes(item.likes || 0);

//         /*
//         | Register view
//         */

//         try {
//           const viewResponse =
//             await registerStoryView(
//               item._id
//             );

//           if (mounted) {
//             setStory((prev) =>
//               prev
//                 ? {
//                     ...prev,
//                     views:
//                       viewResponse?.views ??
//                       prev.views,
//                   }
//                 : prev
//             );
//           }
//         } catch (viewError) {
//           console.warn(
//             "View registration failed:",
//             viewError
//           );
//         }

//         /*
//         | Related content
//         */

//         try {
//           const relatedResponse =
//             await getPublicStories({
//               type:
//                 item.contentType ||
//                 "story",
//               limit: 6,
//             });

//           const relatedItems =
//             relatedResponse?.data || [];

//           if (mounted) {
//             setRelated(
//               relatedItems.filter(
//                 (item) =>
//                   item._id !==
//                   item._id
//               )
//             );

//             setRelated(
//               relatedItems.filter(
//                 (relatedItem) =>
//                   relatedItem._id !==
//                   item._id
//               )
//             );
//           }
//         } catch (relatedError) {
//           console.warn(
//             "Related content failed:",
//             relatedError
//           );
//         }
//       } catch (err) {
//         console.error(err);

//         if (mounted) {
//           setError(
//             err?.response?.data?.message ||
//               err?.message ||
//               "Unable to load this story."
//           );
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     if (slug) {
//       loadStory();
//     }

//     return () => {
//       mounted = false;
//     };
//   }, [slug]);

//   /*
//   |--------------------------------------------------------------------------
//   | LOAD COMMENTS
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (!story?._id) return;

//     const loadComments = async () => {
//       try {
//         setCommentsLoading(true);

//         const type =
//           story.contentType === "poem"
//             ? "Poem"
//             : "Story";

//         const response =
//           await getComments(
//             story._id,
//             type
//           );

//         setComments(
//           response?.data || []
//         );
//       } catch (err) {
//         console.error(
//           "Comments error:",
//           err
//         );

//         setComments([]);
//       } finally {
//         setCommentsLoading(false);
//       }
//     };

//     loadComments();
//   }, [
//     story?._id,
//     story?.contentType,
//   ]);

//   /*
//   |--------------------------------------------------------------------------
//   | READING PROGRESS
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop =
//         window.scrollY;

//       const documentHeight =
//         document.documentElement
//           .scrollHeight -
//         window.innerHeight;

//       if (documentHeight <= 0) {
//         setReadingProgress(0);
//         return;
//       }

//       const progress =
//         (scrollTop / documentHeight) *
//         100;

//       setReadingProgress(
//         Math.min(
//           100,
//           Math.max(0, progress)
//         )
//       );
//     };

//     window.addEventListener(
//       "scroll",
//       handleScroll,
//       { passive: true }
//     );

//     handleScroll();

//     return () => {
//       window.removeEventListener(
//         "scroll",
//         handleScroll
//       );
//     };
//   }, []);

//   /*
//   |--------------------------------------------------------------------------
//   | CONTENT TYPE
//   |--------------------------------------------------------------------------
//   */

//   const isPoem =
//     story?.contentType === "poem";

//   const typeLabel = isPoem
//     ? "POETRY"
//     : "SHORT STORY";

//   /*
//   |--------------------------------------------------------------------------
//   | DATE
//   |--------------------------------------------------------------------------
//   */

//   const formattedDate =
//     useMemo(() => {
//       if (!story?.publishedAt) {
//         return "";
//       }

//       return new Date(
//         story.publishedAt
//       ).toLocaleDateString(
//         "en-IN",
//         {
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//         }
//       );
//     }, [story?.publishedAt]);

//   /*
//   |--------------------------------------------------------------------------
//   | LIKE
//   |--------------------------------------------------------------------------
//   */

//   const handleLike = async () => {
//     if (!story?._id || liked) {
//       return;
//     }

//     try {
//       const response =
//         await likeStory(
//           story._id
//         );

//       setLikes(
//         response?.likes ??
//           likes + 1
//       );

//       setLiked(true);
//     } catch (err) {
//       console.error(
//         "Like failed:",
//         err
//       );
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | COPY LINK
//   |--------------------------------------------------------------------------
//   */

//   const handleCopyLink =
//     async () => {
//       try {
//         await navigator.clipboard.writeText(
//           window.location.href
//         );

//         setCopied(true);

//         setTimeout(() => {
//           setCopied(false);
//         }, 2000);
//       } catch (err) {
//         console.error(
//           "Copy failed:",
//           err
//         );
//       }
//     };

//   /*
//   |--------------------------------------------------------------------------
//   | SHARE
//   |--------------------------------------------------------------------------
//   */

//   const handleShare =
//     async () => {
//       if (
//         navigator.share
//       ) {
//         try {
//           await navigator.share({
//             title:
//               story?.title,
//             text:
//               story?.excerpt ||
//               `Read ${story?.title}`,
//             url:
//               window.location.href,
//           });
//         } catch {
//           // User cancelled
//         }
//       } else {
//         handleCopyLink();
//       }
//     };

//   /*
//   |--------------------------------------------------------------------------
//   | PRINT / SAVE AS PDF
//   |--------------------------------------------------------------------------
//   */

//   const handlePrint = () => {
//     window.print();
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | BOOKMARK
//   |--------------------------------------------------------------------------
//   */

//   const handleBookmark = () => {
//     setBookmarked(
//       !bookmarked
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | COMMENT SUBMIT
//   |--------------------------------------------------------------------------
//   */

//   const handleCommentSubmit =
//     async (e) => {
//       e.preventDefault();

//       if (!story?._id) {
//         return;
//       }

//       if (
//         !commentName.trim() ||
//         !commentText.trim()
//       ) {
//         setCommentMessage(
//           "Please enter your name and comment."
//         );

//         return;
//       }

//       try {
//         setSubmittingComment(
//           true
//         );

//         setCommentMessage("");

//         const contentType =
//           isPoem
//             ? "Poem"
//             : "Story";

//         const response =
//           await createComment(
//             story._id,
//             commentName.trim(),
//             commentText.trim(),
//             contentType
//           );

//         setCommentText("");

//         setCommentMessage(
//           response?.message ||
//             "Your comment has been submitted for approval."
//         );
//       } catch (err) {
//         console.error(
//           "Comment failed:",
//           err
//         );

//         setCommentMessage(
//           err?.response?.data
//             ?.message ||
//             "Unable to submit your comment."
//         );
//       } finally {
//         setSubmittingComment(
//           false
//         );
//       }
//     };

//   /*
//   |--------------------------------------------------------------------------
//   | LOADING
//   |--------------------------------------------------------------------------
//   */

//   if (loading) {
//     return (
//       <div className="story-detail-loading">
//         <div className="loading-orbit">
//           <FaFeatherAlt />
//         </div>

//         <h2>
//           Opening the story...
//         </h2>

//         <p>
//           Preparing your reading
//           experience.
//         </p>
//       </div>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | ERROR
//   |--------------------------------------------------------------------------
//   */

//   if (error || !story) {
//     return (
//       <div className="story-detail-error-page">
//         <div className="story-error-card">
//           <FaBookOpen />

//           <span>404</span>

//           <h1>
//             This story could not
//             be found.
//           </h1>

//           <p>
//             The story may have
//             been removed, unpublished,
//             or the link may be
//             incorrect.
//           </p>

//           <button
//             onClick={() =>
//               navigate(
//                 isPoem
//                   ? "/poems"
//                   : "/stories"
//               )
//             }
//           >
//             <FaArrowLeft />
//             Back to{" "}
//             {isPoem
//               ? "Poems"
//               : "Stories"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | READING TIME
//   |--------------------------------------------------------------------------
//   */

//   const readingTime =
//     story.readingTime ||
//     Math.max(
//       1,
//       Math.ceil(
//         (story.content
//           ?.replace(/<[^>]+>/g, "")
//           .split(/\s+/)
//           .filter(Boolean)
//           .length || 200) /
//           200
//       )
//     );

//   /*
//   |--------------------------------------------------------------------------
//   | DYNAMIC CONTENT STYLE
//   |--------------------------------------------------------------------------
//   */

//   const contentStyle = {
//     fontFamily:
//       story.fontFamily ||
//       undefined,

//     fontSize:
//       story.fontSize
//         ? `${story.fontSize}px`
//         : undefined,
//   };

//   return (
//     <div
//       className={`story-detail-page ${
//         isPoem
//           ? "poem-detail"
//           : ""
//       }`}
//     >
//       {/* READING PROGRESS */}

//       <div
//         className="reading-progress"
//         style={{
//           width: `${readingProgress}%`,
//         }}
//       />

//       {/* HERO */}

//       <header
//         className={`story-hero ${
//           story.coverImage
//             ? "has-cover"
//             : "no-cover"
//         }`}
//       >
//         {story.coverImage && (
//           <>
//             <img
//               src={story.coverImage}
//               alt={story.title}
//               className="story-hero-image"
//             />

//             <div className="story-hero-gradient" />
//           </>
//         )}

//         <div className="story-hero-decoration">
//           <span />
//           <span />
//           <span />
//         </div>

//         <div className="story-hero-content">
//           <Link
//             to={
//               isPoem
//                 ? "/poems"
//                 : "/stories"
//             }
//             className="story-back-link"
//           >
//             <FaArrowLeft />
//             Back to{" "}
//             {isPoem
//               ? "Poems"
//               : "Stories"}
//           </Link>

//           <div className="story-hero-label-row">
//             <div className="story-type-pill">
//               {isPoem ? (
//                 <FaFeatherAlt />
//               ) : (
//                 <FaBookOpen />
//               )}

//               {typeLabel}
//             </div>

//             <span className="hero-reading-label">
//               <FaClock />
//               {readingTime} min read
//             </span>
//           </div>

//           <h1>
//             {story.title}
//           </h1>

//           {story.excerpt && (
//             <p className="story-hero-excerpt">
//               {story.excerpt}
//             </p>
//           )}

//           <div className="story-hero-meta">
//             {story.author?.name ||
//             story.authorName ? (
//               <span>
//                 <FaUser />
//                 {story.author?.name ||
//                   story.authorName}
//               </span>
//             ) : null}

//             {formattedDate && (
//               <span>
//                 <FaCalendarAlt />
//                 {formattedDate}
//               </span>
//             )}

//             <span>
//               <FaEye />
//               {story.views || 0} views
//             </span>
//           </div>

//           <div className="hero-actions">
//             <button
//               type="button"
//               onClick={handleShare}
//             >
//               <FaShareAlt />
//               Share
//             </button>

//             <button
//               type="button"
//               onClick={handleBookmark}
//               className={
//                 bookmarked
//                   ? "active"
//                   : ""
//               }
//             >
//               <FaBookmark />
//               {bookmarked
//                 ? "Saved"
//                 : "Save"}
//             </button>

//             <button
//               type="button"
//               onClick={handlePrint}
//             >
//               <FaPrint />
//               PDF / Print
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MAIN */}

//       <main className="story-detail-container">
//         <div className="story-reading-layout">

//           {/* SHARE RAIL */}

//           <aside className="story-share-rail">
//             <span>
//               SHARE
//             </span>

//             <button
//               onClick={handleShare}
//               title="Share"
//             >
//               <FaShareAlt />
//             </button>

//             <button
//               onClick={handleCopyLink}
//               title="Copy link"
//             >
//               {copied ? (
//                 <FaCheckCircle />
//               ) : (
//                 <FaLink />
//               )}
//             </button>

//             <a
//               href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
//                 story.title
//               )}&url=${encodeURIComponent(
//                 window.location.href
//               )}`}
//               target="_blank"
//               rel="noreferrer"
//               title="Share on X"
//             >
//               <FaTwitter />
//             </a>

//             <a
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//                 window.location.href
//               )}`}
//               target="_blank"
//               rel="noreferrer"
//               title="Share on Facebook"
//             >
//               <FaFacebookF />
//             </a>

//             <button
//               onClick={handlePrint}
//               title="Print / Save PDF"
//             >
//               <FaPrint />
//             </button>
//           </aside>

//           {/* ARTICLE */}

//           <article className="story-reading-column">

//             <div className="story-reading-top">
//               <div className="reading-category">
//                 <span>
//                   {story.category ||
//                     (isPoem
//                       ? "Poetry"
//                       : "Stories")}
//                 </span>

//                 <i />
//               </div>

//               <div className="reading-stats">
//                 <span>
//                   <FaEye />
//                   {story.views || 0}
//                 </span>

//                 <span>
//                   <FaComment />
//                   {comments.length}
//                 </span>
//               </div>
//             </div>

//             {/* CONTENT */}

//             <div
//               className={`story-content ${
//                 isPoem
//                   ? "poem-content"
//                   : ""
//               }`}
//               style={contentStyle}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   story.content,
//               }}
//             />

//             {/* TAGS */}

//             {story.tags?.length >
//               0 && (
//               <div className="story-tags-section">
//                 <span className="tags-label">
//                   EXPLORE TOPICS
//                 </span>

//                 <div className="story-tags">
//                   {story.tags.map(
//                     (tag) => (
//                       <span
//                         key={tag}
//                       >
//                         #{tag}
//                       </span>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* AUTHOR */}

//             <section className="story-author-card">
//               <div className="author-card-accent" />

//               <div className="author-avatar">
//                 {story.author?.avatar ? (
//                   <img
//                     src={
//                       story.author.avatar
//                     }
//                     alt={
//                       story.author.name ||
//                       "Author"
//                     }
//                   />
//                 ) : (
//                   <FaPen />
//                 )}
//               </div>

//               <div className="author-info">
//                 <span>
//                   WRITTEN BY
//                 </span>

//                 <h3>
//                   {story.author?.name ||
//                     story.authorName ||
//                     "Prosper Foundation"}
//                 </h3>

//                 <p>
//                   A thoughtful
//                   contribution to the
//                   Prosper Foundation
//                   literary collection.
//                 </p>
//               </div>

//               <FaFeatherAlt className="author-decoration" />
//             </section>

//             {/* REACTION */}

//             <section className="story-reaction-card">
//               <div className="reaction-copy">
//                 <span>
//                   Did this piece speak
//                   to you?
//                 </span>

//                 <p>
//                   Your reaction helps
//                   us discover what
//                   resonates with our
//                   readers.
//                 </p>
//               </div>

//               <button
//                 className={
//                   liked
//                     ? "liked"
//                     : ""
//                 }
//                 onClick={
//                   handleLike
//                 }
//               >
//                 <span className="heart-icon">
//                   {liked ? (
//                     <FaHeart />
//                   ) : (
//                     <FaRegHeart />
//                   )}
//                 </span>

//                 <strong>
//                   {likes}
//                 </strong>

//                 <small>
//                   Likes
//                 </small>
//               </button>
//             </section>

//             {/* COMMENTS */}

//             <section
//               className="story-comments"
//               id="comments"
//             >
//               <div className="comments-heading">
//                 <div>
//                   <span className="section-kicker">
//                     THE CONVERSATION
//                   </span>

//                   <h2>
//                     Reader's Thoughts
//                   </h2>

//                   <p>
//                     Every perspective
//                     adds something to
//                     the conversation.
//                   </p>
//                 </div>

//                 <div className="comment-count">
//                   <FaComment />
//                   <strong>
//                     {comments.length}
//                   </strong>
//                 </div>
//               </div>

//               {/* COMMENT FORM */}

//               <form
//                 className="comment-form"
//                 onSubmit={
//                   handleCommentSubmit
//                 }
//               >
//                 <div className="comment-form-header">
//                   <div className="comment-form-icon">
//                     <FaPen />
//                   </div>

//                   <div>
//                     <h3>
//                       Join the conversation
//                     </h3>

//                     <p>
//                       Your comment will
//                       appear after
//                       moderation.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="comment-fields">
//                   <div className="field-wrapper">
//                     <label>
//                       Your name
//                     </label>

//                     <input
//                       type="text"
//                       placeholder="Enter your name"
//                       value={
//                         commentName
//                       }
//                       onChange={(e) =>
//                         setCommentName(
//                           e.target.value
//                         )
//                       }
//                       maxLength={100}
//                     />
//                   </div>

//                   <div className="field-wrapper">
//                     <label>
//                       Your thoughts
//                     </label>

//                     <textarea
//                       placeholder="What did this piece make you think or feel?"
//                       value={
//                         commentText
//                       }
//                       onChange={(e) =>
//                         setCommentText(
//                           e.target.value
//                         )
//                       }
//                       rows={6}
//                       maxLength={1000}
//                     />
//                   </div>
//                 </div>

//                 {commentMessage && (
//                   <div className="comment-message">
//                     <FaCheckCircle />
//                     {commentMessage}
//                   </div>
//                 )}

//                 <div className="comment-form-footer">
//                   <span>
//                     Be respectful,
//                     thoughtful and
//                     constructive.
//                   </span>

//                   <button
//                     type="submit"
//                     disabled={
//                       submittingComment
//                     }
//                   >
//                     {submittingComment ? (
//                       <>
//                         <FaSpinner className="spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <FaPaperPlane />
//                         Submit Comment
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>

//               {/* COMMENTS */}

//               {commentsLoading ? (
//                 <div className="comments-loading">
//                   <FaSpinner className="spin" />
//                   Loading reader
//                   thoughts...
//                 </div>
//               ) : comments.length ===
//                 0 ? (
//                 <div className="no-comments">
//                   <div className="empty-comment-icon">
//                     <FaQuoteLeft />
//                   </div>

//                   <h3>
//                     Be the first to
//                     share a thought.
//                   </h3>

//                   <p>
//                     Your perspective
//                     could start a
//                     meaningful
//                     conversation.
//                   </p>
//                 </div>
//               ) : (
//                 <div className="comments-list">
//                   {comments.map(
//                     (comment) => (
//                       <article
//                         className="comment-card"
//                         key={
//                           comment._id
//                         }
//                       >
//                         <div className="comment-avatar">
//                           {comment.author
//                             ?.avatar ? (
//                             <img
//                               src={
//                                 comment
//                                   .author
//                                   .avatar
//                               }
//                               alt=""
//                             />
//                           ) : (
//                             (
//                               comment.name ||
//                               "R"
//                             )
//                               .charAt(0)
//                               .toUpperCase()
//                           )}
//                         </div>

//                         <div className="comment-body">
//                           <div className="comment-top">
//                             <strong>
//                               {
//                                 comment.name
//                               }
//                             </strong>

//                             <time>
//                               {new Date(
//                                 comment.createdAt
//                               ).toLocaleDateString(
//                                 "en-IN",
//                                 {
//                                   day: "numeric",
//                                   month:
//                                     "short",
//                                   year:
//                                     "numeric",
//                                 }
//                               )}
//                             </time>
//                           </div>

//                           <p>
//                             {
//                               comment.text
//                             }
//                           </p>
//                         </div>
//                       </article>
//                     )
//                   )}
//                 </div>
//               )}
//             </section>
//           </article>
//         </div>

//         {/* RELATED */}

//         {related.length >
//           0 && (
//           <section className="related-stories">
//             <div className="related-heading">
//               <div>
//                 <span className="section-kicker">
//                   CONTINUE READING
//                 </span>

//                 <h2>
//                   More from the collection
//                 </h2>

//                 <p>
//                   Discover another
//                   thoughtful piece from
//                   our literary collection.
//                 </p>
//               </div>

//               <Link
//                 to={
//                   isPoem
//                     ? "/poems"
//                     : "/stories"
//                 }
//               >
//                 View all
//                 <FaArrowRight />
//               </Link>
//             </div>

//             <div className="related-grid">
//               {related
//                 .slice(0, 3)
//                 .map((item) => {
//                   const itemIsPoem =
//                     item.contentType ===
//                     "poem";

//                   return (
//                     <Link
//                       to={`${
//                         itemIsPoem
//                           ? "/poems"
//                           : "/stories"
//                       }/${item.slug}`}
//                       className="related-card"
//                       key={
//                         item._id
//                       }
//                     >
//                       <div className="related-image">
//                         {item.coverImage ? (
//                           <img
//                             src={
//                               item.coverImage
//                             }
//                             alt={
//                               item.title
//                             }
//                           />
//                         ) : (
//                           <div className="related-placeholder">
//                             {itemIsPoem ? (
//                               <FaFeatherAlt />
//                             ) : (
//                               <FaBookOpen />
//                             )}
//                           </div>
//                         )}

//                         <span>
//                           {itemIsPoem
//                             ? "POEM"
//                             : "STORY"}
//                         </span>
//                       </div>

//                       <div className="related-body">
//                         <div className="related-meta">
//                           <small>
//                             {item.category ||
//                               "Literary Collection"}
//                           </small>

//                           <FaArrowRight />
//                         </div>

//                         <h3>
//                           {item.title}
//                         </h3>

//                         <p>
//                           {item.excerpt ||
//                             "Discover another thoughtful piece from our collection."}
//                         </p>

//                         <span className="read-more">
//                           Read piece
//                           <FaArrowRight />
//                         </span>
//                       </div>
//                     </Link>
//                   );
//                 })}
//             </div>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }


import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaDownload,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaFilePdf,
  FaShareAlt,
} from "react-icons/fa";

import {
  getStoryBySlug,
  likeStory,
  dislikeStory,
  registerStoryView,
} from "../api/storyApi";

import {
  getComments,
  createComment,
} from "../api/commentApi";

import "./StoryDetail.css";

const StoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [story, setStory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [liked, setLiked] =
    useState(false);

  const [disliked, setDisliked] =
    useState(false);

  const [comments, setComments] =
    useState([]);

  const [commentName, setCommentName] =
    useState("");

  const [commentText, setCommentText] =
    useState("");

  const [commentLoading, setCommentLoading] =
    useState(false);

  const [commentError, setCommentError] =
    useState("");

  const [commentSuccess, setCommentSuccess] =
    useState("");

  /* =========================================================
     LOAD STORY
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const loadStory = async () => {
      try {
        setLoading(true);
        setError("");

        if (!slug) {
          throw new Error(
            "Story slug is missing."
          );
        }

        /*
         * IMPORTANT:
         *
         * getStoryBySlug now returns
         * the actual story object.
         */
        const item =
          await getStoryBySlug(slug);

        console.log(
          "Story detail data:",
          item
        );

        if (!item?._id) {
          throw new Error(
            "Story not found."
          );
        }

        if (!mounted) return;

        setStory(item);

        /*
         * Register view
         */
        try {
          const viewResponse =
            await registerStoryView(
              item._id
            );

          if (
            mounted &&
            viewResponse?.views !==
              undefined
          ) {
            setStory(
              (previous) =>
                previous
                  ? {
                      ...previous,
                      views:
                        viewResponse.views,
                    }
                  : previous
            );
          }
        } catch (viewError) {
          console.warn(
            "View registration failed:",
            viewError
          );
        }
      } catch (err) {
        console.error(
          "Failed to fetch story:",
          err
        );

        if (mounted) {
          setError(
            err?.response?.data
              ?.message ||
              err?.message ||
              "Unable to load this story."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStory();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =========================================================
     LOAD COMMENTS
  ========================================================= */

  useEffect(() => {
    if (!story?._id) return;

    const loadComments =
      async () => {
        try {
          const response =
            await getComments(
              story._id,
              "Story"
            );

          const data =
            Array.isArray(response)
              ? response
              : Array.isArray(
                  response?.data
                )
              ? response.data
              : Array.isArray(
                  response?.comments
                )
              ? response.comments
              : [];

          setComments(data);
        } catch (err) {
          console.error(
            "Failed to fetch comments:",
            err
          );

          setComments([]);
        }
      };

    loadComments();
  }, [story?._id]);

  /* =========================================================
     LIKE
  ========================================================= */

  const handleLike = async () => {
    if (!story?._id) return;

    try {
      const response =
        await likeStory(
          story._id
        );

      setStory(
        (previous) => ({
          ...previous,
          likes:
            response?.likes ??
            previous.likes ??
            0,
        })
      );

      setLiked(true);
      setDisliked(false);
    } catch (err) {
      console.error(
        "Like failed:",
        err
      );
    }
  };

  /* =========================================================
     DISLIKE
  ========================================================= */

  const handleDislike =
    async () => {
      if (!story?._id) return;

      try {
        const response =
          await dislikeStory(
            story._id
          );

        setStory(
          (previous) => ({
            ...previous,
            dislikes:
              response?.dislikes ??
              previous.dislikes ??
              0,
          })
        );

        setDisliked(true);
        setLiked(false);
      } catch (err) {
        console.error(
          "Dislike failed:",
          err
        );
      }
    };

  /* =========================================================
     COMMENT
  ========================================================= */

  const submitComment =
    async (event) => {
      event.preventDefault();

      setCommentError("");
      setCommentSuccess("");

      if (!commentName.trim()) {
        setCommentError(
          "Please enter your name."
        );
        return;
      }

      if (!commentText.trim()) {
        setCommentError(
          "Please write a comment."
        );
        return;
      }

      if (!story?._id) {
        setCommentError(
          "Story is not available."
        );
        return;
      }

      try {
        setCommentLoading(true);

        const response =
          await createComment(
            story._id,
            commentName.trim(),
            commentText.trim(),
            "Story"
          );

        const newComment =
          response?.data ||
          response?.comment ||
          response;

        if (
          newComment &&
          typeof newComment ===
            "object"
        ) {
          setComments(
            (previous) => [
              ...previous,
              newComment,
            ]
          );
        }

        setCommentName("");
        setCommentText("");

        setCommentSuccess(
          "Your comment has been submitted successfully."
        );
      } catch (err) {
        console.error(
          "Comment submission failed:",
          err
        );

        setCommentError(
          err?.response?.data
            ?.message ||
            "Unable to submit your comment."
        );
      } finally {
        setCommentLoading(false);
      }
    };

  /* =========================================================
     SHARE
  ========================================================= */

  const handleShare =
    async () => {
      try {
        if (
          navigator.share
        ) {
          await navigator.share({
            title:
              story?.title ||
              "Story",
            text:
              story?.excerpt ||
              "",
            url:
              window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(
            window.location.href
          );

          alert(
            "Story link copied!"
          );
        }
      } catch (err) {
        console.warn(
          "Share cancelled:",
          err
        );
      }
    };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="story-detail-loading">
        <div className="story-spinner" />
        <p>
          Loading story...
        </p>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !story) {
    return (
      <div className="story-detail-error">
        <div className="story-error-card">
          <FaBookOpen />

          <h2>
            Story not available
          </h2>

          <p>
            {error ||
              "This story could not be found."}
          </p>

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     PDF URL
  ========================================================= */

  const pdfUrl =
    story.originalPdfUrl ||
    story.pdfUrl ||
    story.originalPdf ||
    story.pdf ||
    "";

  /* =========================================================
     CONTENT
  ========================================================= */

  const storyContent =
    story.content ||
    "";

  return (
    <main className="story-detail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="story-detail-hero">

        <div className="story-hero-overlay" />

        {story.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="story-hero-image"
          />
        )}

        <div className="story-hero-content">

          <button
            className="story-back-btn"
            onClick={() =>
              navigate(-1)
            }
          >
            <FaArrowLeft />
            Back
          </button>

          <span className="story-type-badge">
            {story.contentType ===
            "poem"
              ? "Poem"
              : "Story"}
          </span>

          <h1>
            {story.title}
          </h1>

          {story.excerpt && (
            <p className="story-excerpt">
              {story.excerpt}
            </p>
          )}

          <div className="story-meta">

            {story.publishedAt && (
              <span>
                <FaCalendarAlt />

                {new Date(
                  story.publishedAt
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
            )}

            <span>
              <FaClock />
              {story.readingTime ||
                1}{" "}
              min read
            </span>

            <span>
              <FaEye />
              {story.views || 0}
            </span>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="story-detail-container">

        <article
          className="story-reading-card"
          style={{
            fontFamily:
              story.fontFamily ||
              "Georgia",

            fontSize: `${
              story.fontSize ||
              18
            }px`,
          }}
        >

          <div className="story-content-top">

            <div>
              <span>
                {story.authorName ||
                  "Prosper Foundation"}
              </span>
            </div>

            <button
              className="share-btn"
              onClick={
                handleShare
              }
            >
              <FaShareAlt />
              Share
            </button>

          </div>

          {/* =================================================
              PDF EXTRACTED CONTENT
          ================================================= */}

          {storyContent.trim() ? (
            <div
              className="story-html-content"
              dangerouslySetInnerHTML={{
                __html:
                  storyContent,
              }}
            />
          ) : (
            <div className="empty-story-content">
              <FaBookOpen />

              <p>
                The content of this
                story is not available
                yet.
              </p>
            </div>
          )}

          {/* =================================================
              ORIGINAL PDF
          ================================================= */}

          {pdfUrl && (
            <div className="original-pdf-box">

              <div className="pdf-icon">
                <FaFilePdf />
              </div>

              <div className="pdf-info">

                <h3>
                  Original Designed PDF
                </h3>

                <p>
                  View or download the
                  original version with
                  its complete design,
                  images and formatting.
                </p>

                {story.originalPdfName && (
                  <small>
                    {
                      story.originalPdfName
                    }
                  </small>
                )}

              </div>

              <div className="pdf-actions">

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdf-view-btn"
                >
                  <FaEye />
                  View PDF
                </a>

                <a
                  href={pdfUrl}
                  download={
                    story.originalPdfName ||
                    "original-story.pdf"
                  }
                  className="pdf-download-btn"
                >
                  <FaDownload />
                  Download
                </a>

              </div>

            </div>
          )}

          {/* =================================================
              REACTIONS
          ================================================= */}

          <div className="story-reactions">

            <button
              className={
                liked
                  ? "reaction active"
                  : "reaction"
              }
              onClick={
                handleLike
              }
            >
              {liked ? (
                <FaHeart />
              ) : (
                <FaRegHeart />
              )}

              <span>
                {story.likes || 0}
              </span>

              Like
            </button>

            <button
              className={
                disliked
                  ? "reaction dislike active"
                  : "reaction dislike"
              }
              onClick={
                handleDislike
              }
            >
              <FaThumbsDown />

              <span>
                {story.dislikes ||
                  0}
              </span>

              Dislike
            </button>

          </div>

        </article>

        {/* =====================================================
            COMMENTS
        ===================================================== */}

        {story.allowComments !==
          false && (
          <section className="comments-section">

            <div className="comments-heading">
              <span>
                Community
              </span>

              <h2>
                Share your thoughts
              </h2>

              <p>
                What did this story
                make you feel?
              </p>
            </div>

            <form
              className="comment-form"
              onSubmit={
                submitComment
              }
            >

              <div className="comment-input-group">
                <label>
                  Your name
                </label>

                <input
                  type="text"
                  value={
                    commentName
                  }
                  onChange={(e) =>
                    setCommentName(
                      e.target.value
                    )
                  }
                  placeholder="Enter your name"
                  maxLength={100}
                />
              </div>

              <div className="comment-input-group">
                <label>
                  Your comment
                </label>

                <textarea
                  value={
                    commentText
                  }
                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }
                  placeholder="Write your thoughts..."
                  rows={5}
                  maxLength={2000}
                />
              </div>

              {commentError && (
                <div className="comment-error">
                  {commentError}
                </div>
              )}

              {commentSuccess && (
                <div className="comment-success">
                  {commentSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  commentLoading
                }
                className="comment-submit"
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
                        comment._id ||
                        Math.random()
                      }
                    >

                      <div className="comment-avatar">
                        {(
                          comment.name ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="comment-body">

                        <h4>
                          {
                            comment.name
                          }
                        </h4>

                        <p>
                          {comment.text ||
                            comment.content ||
                            ""}
                        </p>

                        {comment.createdAt && (
                          <small>
                            {new Date(
                              comment.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )}
                          </small>
                        )}

                      </div>
                    </div>
                  )
                )
              )}

            </div>

          </section>
        )}

      </section>
    </main>
  );
};

export default StoryDetail;