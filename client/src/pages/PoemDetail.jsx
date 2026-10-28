// import React, {
//   useCallback,
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
//   FaCalendarAlt,
//   FaClock,
//   FaComment,
//   FaCopy,
//   FaEye,
//   FaFacebookF,
//   FaFeatherAlt,
//   FaHeart,
//   FaLink,
//   FaPaperPlane,
//   FaShareAlt,
//   FaThumbsDown,
//   FaThumbsUp,
//   FaUser,
//   FaBookOpen,
//   FaCheck,
//   FaExclamationCircle,
// } from "react-icons/fa";

// import {
//   getPublicStoryBySlug,
//   getPublicStories,
//   likeStory,
//   dislikeStory,
//   registerStoryView,
// } from "../api/storyApi";

// import {
//   getComments,
//   createComment,
// } from "../api/commentApi";

// import "./PoemDetail.css";

// /* =========================================================
//    HELPERS
// ========================================================= */

// const getAuthorName = (poem) => {
//   if (typeof poem?.author === "string") {
//     return poem.author;
//   }

//   return (
//     poem?.authorName ||
//     poem?.author?.name ||
//     poem?.author?.fullName ||
//     poem?.author?.username ||
//     "Prosper Foundation"
//   );
// };

// const getAuthorAvatar = (poem) => {
//   if (!poem?.author || typeof poem.author !== "object") {
//     return "";
//   }

//   return (
//     poem.author.avatar ||
//     poem.author.profileImage ||
//     poem.author.profilePicture ||
//     ""
//   );
// };

// const getContentId = (poem) => {
//   return (
//     poem?.contentId ||
//     poem?.content?._id ||
//     poem?.content?.id ||
//     poem?._id ||
//     ""
//   );
// };

// const formatDate = (date) => {
//   if (!date) return "";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "";
//   }

//   return parsed.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
// };

// const getInitial = (name) => {
//   return (
//     name?.trim()?.charAt(0)?.toUpperCase() ||
//     "A"
//   );
// };

// const getCommentName = (comment) => {
//   return (
//     comment?.name ||
//     comment?.authorName ||
//     comment?.user?.name ||
//     comment?.user?.fullName ||
//     "Anonymous"
//   );
// };

// const getCommentText = (comment) => {
//   return (
//     comment?.text ||
//     comment?.comment ||
//     comment?.content ||
//     ""
//   );
// };

// const getCommentDate = (comment) => {
//   return formatDate(
//     comment?.createdAt ||
//       comment?.date ||
//       comment?.updatedAt
//   );
// };

// const extractComments = (response) => {
//   const data = response?.data ?? response;

//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (Array.isArray(data?.comments)) {
//     return data.comments;
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };

// const extractApiData = (response) => {
//   return (
//     response?.data?.data ||
//     response?.data ||
//     response
//   );
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// export default function PoemDetail() {
//   const { slug } = useParams();
//   const navigate = useNavigate();

//   /* =======================================================
//      POEM
//   ======================================================= */

//   const [poem, setPoem] = useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   /* =======================================================
//      COMMENTS
//   ======================================================= */

//   const [comments, setComments] =
//     useState([]);

//   const [commentsLoading, setCommentsLoading] =
//     useState(false);

//   const [commentName, setCommentName] =
//     useState("");

//   const [commentText, setCommentText] =
//     useState("");

//   const [commentSubmitting, setCommentSubmitting] =
//     useState(false);

//   const [commentMessage, setCommentMessage] =
//     useState("");

//   const [commentError, setCommentError] =
//     useState("");

//   /* =======================================================
//      REACTIONS
//   ======================================================= */

//   const [liked, setLiked] =
//     useState(false);

//   const [disliked, setDisliked] =
//     useState(false);

//   const [interactionLoading, setInteractionLoading] =
//     useState(false);

//   const [reactionMessage, setReactionMessage] =
//     useState("");

//   /* =======================================================
//      SHARE
//   ======================================================= */

//   const [shareOpen, setShareOpen] =
//     useState(false);

//   const [copied, setCopied] =
//     useState(false);

//   /* =======================================================
//      READING PROGRESS
//   ======================================================= */

//   const [readingProgress, setReadingProgress] =
//     useState(0);

//   /* =======================================================
//      LOAD POEM
//   ======================================================= */

//   const loadPoem = useCallback(async () => {
//     if (!slug) {
//       setError("Poem not found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       /*
//        * Do not use storyApi.default.get().
//        *
//        * Use the named API function already exported
//        * by storyApi.js.
//        */

//       const response =
//         await getPublicStoryBySlug(
//           encodeURIComponent(slug)
//         );

//       const item =
//         response?.data?.data ||
//         response?.data ||
//         response;

//       if (!item) {
//         throw new Error(
//           "Poem not found."
//         );
//       }

//       /*
//        * This route is specifically for poems.
//        */

//       if (
//         item.contentType &&
//         String(item.contentType).toLowerCase() !==
//           "poem"
//       ) {
//         throw new Error(
//           "This content is not a poem."
//         );
//       }

//       setPoem(item);

//       /*
//        * Register view.
//        *
//        * View failure should NOT break
//        * the poem page.
//        */

//       if (item._id) {
//         try {
//           const viewResponse =
//             await registerStoryView(
//               item._id
//             );

//           const viewData =
//             extractApiData(
//               viewResponse
//             );

//           if (
//             typeof viewData === "object" &&
//             viewData
//           ) {
//             setPoem((previous) =>
//               previous
//                 ? {
//                     ...previous,
//                     ...viewData,
//                   }
//                 : previous
//             );
//           }
//         } catch (viewError) {
//           console.warn(
//             "Poem view registration failed:",
//             viewError
//           );
//         }
//       }
//     } catch (err) {
//       console.error(
//         "Failed to fetch poem:",
//         err
//       );

//       setError(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Unable to load this poem."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [slug]);

//   useEffect(() => {
//     loadPoem();
//   }, [loadPoem]);

//   /* =======================================================
//      LOAD COMMENTS
//   ======================================================= */

//   const loadComments = useCallback(
//     async () => {
//       if (!poem?._id) {
//         return;
//       }

//       try {
//         setCommentsLoading(true);
//         setCommentError("");

//         /*
//          * IMPORTANT:
//          *
//          * Your latest StoryDetail uses:
//          *
//          * getComments(story._id, contentType)
//          *
//          * Therefore poems use:
//          *
//          * getComments(poem._id, "Poem")
//          */

//         const response =
//           await getComments(
//             poem._id,
//             "Poem"
//           );

//         const list =
//           extractComments(response);

//         setComments(list);
//       } catch (err) {
//         console.error(
//           "Failed to fetch poem comments:",
//           err
//         );

//         setComments([]);

//         /*
//          * Comments should not prevent
//          * the poem from being displayed.
//          */
//       } finally {
//         setCommentsLoading(false);
//       }
//     },
//     [poem?._id]
//   );

//   useEffect(() => {
//     loadComments();
//   }, [loadComments]);

//   /* =======================================================
//      READING PROGRESS
//   ======================================================= */

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
//         (scrollTop /
//           documentHeight) *
//         100;

//       setReadingProgress(
//         Math.min(
//           100,
//           Math.max(
//             0,
//             progress
//           )
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

//   /* =======================================================
//      WORD COUNT
//   ======================================================= */

//   const wordCount = useMemo(() => {
//     if (!poem?.content) {
//       return 0;
//     }

//     const text =
//       String(poem.content)
//         .replace(/<[^>]+>/g, " ")
//         .replace(/&nbsp;/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();

//     return text
//       ? text.split(" ").length
//       : 0;
//   }, [poem?.content]);

//   /* =======================================================
//      READING TIME
//   ======================================================= */

//   const readingTime = useMemo(() => {
//     if (
//       poem?.readingTime &&
//       Number(poem.readingTime) > 0
//     ) {
//       return Number(
//         poem.readingTime
//       );
//     }

//     return Math.max(
//       1,
//       Math.ceil(
//         wordCount / 180
//       )
//     );
//   }, [
//     poem?.readingTime,
//     wordCount,
//   ]);

//   /* =======================================================
//      DATE
//   ======================================================= */

//   const formattedDate = useMemo(() => {
//     return formatDate(
//       poem?.publishedAt ||
//         poem?.createdAt ||
//         poem?.updatedAt
//     );
//   }, [
//     poem?.publishedAt,
//     poem?.createdAt,
//     poem?.updatedAt,
//   ]);

//   /* =======================================================
//      DYNAMIC FONT
//   ======================================================= */

//   const contentStyle = useMemo(() => {
//     const style = {};

//     if (poem?.fontFamily) {
//       style.fontFamily =
//         poem.fontFamily;
//     }

//     if (
//       poem?.fontSize &&
//       !Number.isNaN(
//         Number(poem.fontSize)
//       )
//     ) {
//       style.fontSize = `${Number(
//         poem.fontSize
//       )}px`;
//     }

//     return style;
//   }, [
//     poem?.fontFamily,
//     poem?.fontSize,
//   ]);

//   /* =======================================================
//      LIKE
//   ======================================================= */

//   const handleLike = async () => {
//     if (
//       !poem?._id ||
//       interactionLoading
//     ) {
//       return;
//     }

//     try {
//       setInteractionLoading(true);
//       setReactionMessage("");

//       const response =
//         await likeStory(
//           poem._id
//         );

//       const data =
//         extractApiData(
//           response
//         );

//       if (
//         data &&
//         typeof data === "object"
//       ) {
//         setPoem((previous) =>
//           previous
//             ? {
//                 ...previous,
//                 ...data,
//               }
//             : previous
//         );

//         if (
//           typeof data.liked !==
//           "undefined"
//         ) {
//           setLiked(
//             Boolean(data.liked)
//           );
//         } else {
//           setLiked(true);
//         }

//         if (
//           typeof data.disliked !==
//           "undefined"
//         ) {
//           setDisliked(
//             Boolean(
//               data.disliked
//             )
//           );
//         } else {
//           setDisliked(false);
//         }
//       } else {
//         setLiked(true);
//         setDisliked(false);
//       }

//       setReactionMessage(
//         "Thanks for sharing your response."
//       );

//       setTimeout(() => {
//         setReactionMessage("");
//       }, 2500);
//     } catch (err) {
//       console.error(
//         "Like failed:",
//         err?.response?.data ||
//           err
//       );

//       setReactionMessage(
//         err?.response?.data
//           ?.message ||
//           "Unable to register your response."
//       );
//     } finally {
//       setInteractionLoading(false);
//     }
//   };

//   /* =======================================================
//      DISLIKE
//   ======================================================= */

//   const handleDislike = async () => {
//     if (
//       !poem?._id ||
//       interactionLoading
//     ) {
//       return;
//     }

//     try {
//       setInteractionLoading(true);
//       setReactionMessage("");

//       const response =
//         await dislikeStory(
//           poem._id
//         );

//       const data =
//         extractApiData(
//           response
//         );

//       if (
//         data &&
//         typeof data === "object"
//       ) {
//         setPoem((previous) =>
//           previous
//             ? {
//                 ...previous,
//                 ...data,
//               }
//             : previous
//         );

//         if (
//           typeof data.disliked !==
//           "undefined"
//         ) {
//           setDisliked(
//             Boolean(
//               data.disliked
//             )
//           );
//         } else {
//           setDisliked(true);
//         }

//         if (
//           typeof data.liked !==
//           "undefined"
//         ) {
//           setLiked(
//             Boolean(data.liked)
//           );
//         } else {
//           setLiked(false);
//         }
//       } else {
//         setDisliked(true);
//         setLiked(false);
//       }

//       setReactionMessage(
//         "Thanks for sharing your response."
//       );

//       setTimeout(() => {
//         setReactionMessage("");
//       }, 2500);
//     } catch (err) {
//       console.error(
//         "Dislike failed:",
//         err?.response?.data ||
//           err
//       );

//       setReactionMessage(
//         err?.response?.data
//           ?.message ||
//           "Unable to register your response."
//       );
//     } finally {
//       setInteractionLoading(false);
//     }
//   };

//   /* =======================================================
//      COMMENT SUBMIT
//   ======================================================= */

//   const handleCommentSubmit =
//     async (event) => {
//       event.preventDefault();

//       setCommentMessage("");
//       setCommentError("");

//       const name =
//         commentName.trim();

//       const text =
//         commentText.trim();

//       const contentId =
//         getContentId(poem);

//       if (!contentId) {
//         setCommentError(
//           "Poem information is unavailable. Please refresh the page."
//         );
//         return;
//       }

//       if (!name) {
//         setCommentError(
//           "Please enter your name."
//         );
//         return;
//       }

//       if (!text) {
//         setCommentError(
//           "Please write a comment before submitting."
//         );
//         return;
//       }

//       try {
//         setCommentSubmitting(true);

//         /*
//          * IMPORTANT BACKEND FIX
//          *
//          * Do NOT do this:
//          *
//          * createComment({
//          *   contentId,
//          *   name,
//          *   comment: text
//          * })
//          *
//          * Your current StoryDetail uses the
//          * positional createComment signature:
//          *
//          * createComment(
//          *   contentId,
//          *   name,
//          *   text,
//          *   contentType
//          * )
//          *
//          * We follow exactly that here.
//          */

//         const response =
//           await createComment(
//             contentId,
//             name,
//             text,
//             "Poem"
//           );

//         console.log(
//           "Poem comment submitted:",
//           response
//         );

//         /*
//          * The backend may require admin approval.
//          *
//          * Therefore we intentionally do NOT
//          * immediately add the submitted comment
//          * to the public comments list.
//          */

//         setCommentName("");
//         setCommentText("");

//         setCommentMessage(
//           response?.message ||
//             response?.data?.message ||
//             "Your comment has been submitted for approval."
//         );

//         /*
//          * Refresh after a short delay.
//          * If backend immediately approves it,
//          * it will appear.
//          *
//          * If it is pending, it will correctly
//          * remain hidden until approval.
//          */

//         setTimeout(() => {
//           loadComments();
//         }, 800);
//       } catch (err) {
//         console.error(
//           "Comment submission failed:",
//           err?.response?.data ||
//             err
//         );

//         setCommentError(
//           err?.response?.data
//             ?.message ||
//             err?.message ||
//             "Unable to submit your comment."
//         );
//       } finally {
//         setCommentSubmitting(false);
//       }
//     };

//   /* =======================================================
//      SHARE
//   ======================================================= */

//   const handleCopyLink =
//     async () => {
//       try {
//         await navigator.clipboard.writeText(
//           window.location.href
//         );

//         setCopied(true);

//         setTimeout(() => {
//           setCopied(false);
//         }, 2200);
//       } catch (err) {
//         console.error(
//           "Copy link failed:",
//           err
//         );
//       }
//     };

//   const handleShare =
//     async () => {
//       if (
//         navigator.share
//       ) {
//         try {
//           await navigator.share({
//             title:
//               poem?.title ||
//               "Poem",
//             text:
//               poem?.excerpt ||
//               `Read ${poem?.title || "this poem"}`,
//             url:
//               window.location.href,
//           });
//         } catch {
//           /*
//            * User cancelled share.
//            */
//         }
//       } else {
//         await handleCopyLink();
//       }
//     };

//   const handleFacebookShare =
//     () => {
//       const url =
//         `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//           window.location.href
//         )}`;

//       window.open(
//         url,
//         "_blank",
//         "noopener,noreferrer"
//       );
//     };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <main className="poem-detail-loading-page">
//         <div className="poem-loading-card">
//           <div className="poem-loading-orbit">
//             <FaFeatherAlt />
//           </div>

//           <div className="poem-loading-spinner" />

//           <h2>
//             Opening the poem...
//           </h2>

//           <p>
//             Preparing your reading experience.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error || !poem) {
//     return (
//       <main className="poem-detail-error-page">
//         <div className="poem-error-card">
//           <div className="poem-error-icon">
//             <FaExclamationCircle />
//           </div>

//           <span className="poem-error-code">
//             404
//           </span>

//           <h1>
//             This poem could not be found.
//           </h1>

//           <p>
//             {error ||
//               "The poem may have been unpublished, removed, or the link may be incorrect."}
//           </p>

//           <div className="poem-error-actions">
//             <button
//               type="button"
//               onClick={loadPoem}
//             >
//               Try Again
//             </button>

//             <Link to="/poems">
//               <FaArrowLeft />
//               Back to Poems
//             </Link>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   /* =======================================================
//      RELATED POEMS
//   ======================================================= */

//   const currentContentType =
//     poem.contentType ||
//     "poem";

//   /* =======================================================
//      MAIN UI
//   ======================================================= */

//   return (
//     <main className="poem-detail-page">

//       {/* ===================================================
//           READING PROGRESS
//       =================================================== */}

//       <div
//         className="poem-reading-progress"
//         style={{
//           width: `${readingProgress}%`,
//         }}
//       />

//       {/* ===================================================
//           HERO
//       =================================================== */}

//       <section
//         className={`poem-detail-hero ${
//           poem.coverImage
//             ? "has-cover"
//             : ""
//         }`}
//         style={
//           poem.coverImage
//             ? {
//                 backgroundImage: `url("${poem.coverImage}")`,
//               }
//             : undefined
//         }
//       >
//         <div className="poem-hero-background" />

//         <div className="poem-hero-content">

//           <Link
//             to="/poems"
//             className="poem-back-link"
//           >
//             <FaArrowLeft />
//             <span>
//               Back to Poems
//             </span>
//           </Link>

//           <div className="poem-type-pill">
//             <FaFeatherAlt />
//             <span>
//               POETRY
//             </span>
//           </div>

//           <h1>
//             {poem.title ||
//               "Untitled Poem"}
//           </h1>

//           {poem.excerpt && (
//             <p className="poem-hero-excerpt">
//               {poem.excerpt}
//             </p>
//           )}

//           <div className="poem-hero-meta">

//             <div className="poem-meta-item">
//               <FaUser />

//               <span>
//                 {getAuthorName(poem)}
//               </span>
//             </div>

//             {formattedDate && (
//               <div className="poem-meta-item">
//                 <FaCalendarAlt />

//                 <span>
//                   {formattedDate}
//                 </span>
//               </div>
//             )}

//             <div className="poem-meta-item">
//               <FaClock />

//               <span>
//                 {readingTime} min read
//               </span>
//             </div>

//             <div className="poem-meta-item">
//               <FaEye />

//               <span>
//                 {Number(
//                   poem.views || 0
//                 ).toLocaleString(
//                   "en-IN"
//                 )}{" "}
//                 views
//               </span>
//             </div>

//           </div>

//         </div>
//       </section>

//       {/* ===================================================
//           MAIN
//       =================================================== */}

//       <div className="poem-detail-container">

//         <div className="poem-detail-layout">

//           {/* =================================================
//               ARTICLE
//           ================================================= */}

//           <article className="poem-article">

//             {/* COVER */}

//             {poem.coverImage && (
//               <div className="poem-featured-image">
//                 <img
//                   src={
//                     poem.coverImage
//                   }
//                   alt={
//                     poem.title ||
//                     "Poem"
//                   }
//                 />

//                 <div className="poem-image-caption">
//                   <FaFeatherAlt />
//                   <span>
//                     A poem from Prosper Foundation
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* CATEGORY + TAGS */}

//             {(poem.category ||
//               Array.isArray(
//                 poem.tags
//               ) &&
//               poem.tags.length > 0) && (
//               <div className="poem-taxonomy">

//                 {poem.category && (
//                   <span className="poem-category-badge">
//                     {poem.category}
//                   </span>
//                 )}

//                 {Array.isArray(
//                   poem.tags
//                 ) &&
//                   poem.tags.map(
//                     (tag, index) => (
//                       <span
//                         className="poem-tag"
//                         key={`${tag}-${index}`}
//                       >
//                         #{tag}
//                       </span>
//                     )
//                   )}

//               </div>
//             )}

//             {/* POEM READING CARD */}

//             <section className="poem-reading-card">

//               <div className="poem-card-decoration top">
//                 <span />
//                 <FaFeatherAlt />
//                 <span />
//               </div>

//               <div
//                 className="poem-body"
//                 style={contentStyle}
//                 dangerouslySetInnerHTML={{
//                   __html:
//                     poem.content ||
//                     "<p>This poem has no content yet.</p>",
//                 }}
//               />

//               <div className="poem-card-decoration bottom">
//                 <span />
//                 <FaFeatherAlt />
//                 <span />
//               </div>

//             </section>

//             {/* AUTHOR */}

//             <section className="poem-author-card">

//               <div className="poem-author-image">
//                 {getAuthorAvatar(
//                   poem
//                 ) ? (
//                   <img
//                     src={getAuthorAvatar(
//                       poem
//                     )}
//                     alt={
//                       getAuthorName(
//                         poem
//                       )
//                     }
//                   />
//                 ) : (
//                   getInitial(
//                     getAuthorName(
//                       poem
//                     )
//                   )
//                 )}
//               </div>

//               <div className="poem-author-info">

//                 <span>
//                   WRITTEN BY
//                 </span>

//                 <h3>
//                   {getAuthorName(
//                     poem
//                   )}
//                 </h3>

//                 <p>
//                   Words that inspire,
//                   connect and stay with us.
//                 </p>

//               </div>

//               <div className="author-feather">
//                 <FaFeatherAlt />
//               </div>

//             </section>

//             {/* REACTIONS */}

//             <section className="poem-reaction-card">

//               <div className="reaction-title">
//                 <span>
//                   Did this poem speak to you?
//                 </span>

//                 <small>
//                   Your response helps us understand what resonates.
//                 </small>
//               </div>

//               <div className="reaction-buttons">

//                 <button
//                   type="button"
//                   disabled={
//                     interactionLoading
//                   }
//                   className={`poem-reaction-button like ${
//                     liked
//                       ? "active"
//                       : ""
//                   }`}
//                   onClick={
//                     handleLike
//                   }
//                 >
//                   <FaThumbsUp />

//                   <span>
//                     Like
//                   </span>

//                   <strong>
//                     {Number(
//                       poem.likes || 0
//                     )}
//                   </strong>
//                 </button>

//                 <button
//                   type="button"
//                   disabled={
//                     interactionLoading
//                   }
//                   className={`poem-reaction-button dislike ${
//                     disliked
//                       ? "active"
//                       : ""
//                   }`}
//                   onClick={
//                     handleDislike
//                   }
//                 >
//                   <FaThumbsDown />

//                   <span>
//                     Dislike
//                   </span>

//                   <strong>
//                     {Number(
//                       poem.dislikes || 0
//                     )}
//                   </strong>
//                 </button>

//                 <button
//                   type="button"
//                   className="poem-reaction-button share"
//                   onClick={() =>
//                     setShareOpen(
//                       (previous) =>
//                         !previous
//                     )
//                   }
//                 >
//                   <FaShareAlt />

//                   <span>
//                     Share
//                   </span>
//                 </button>

//               </div>

//               {reactionMessage && (
//                 <div className="reaction-message">
//                   <FaCheck />
//                   {reactionMessage}
//                 </div>
//               )}

//               {shareOpen && (
//                 <div className="poem-share-panel">

//                   <button
//                     type="button"
//                     onClick={
//                       handleShare
//                     }
//                   >
//                     <FaShareAlt />
//                     Share
//                   </button>

//                   <button
//                     type="button"
//                     onClick={
//                       handleFacebookShare
//                     }
//                   >
//                     <FaFacebookF />
//                     Facebook
//                   </button>

//                   <button
//                     type="button"
//                     onClick={
//                       handleCopyLink
//                     }
//                   >
//                     {copied ? (
//                       <FaCheck />
//                     ) : (
//                       <FaCopy />
//                     )}

//                     {copied
//                       ? "Copied"
//                       : "Copy Link"}
//                   </button>

//                 </div>
//               )}

//             </section>

//             {/* COMMENTS */}

//             <section
//               className="poem-comments-section"
//               id="comments"
//             >

//               <div className="comments-header">

//                 <div>
//                   <span className="comments-eyebrow">
//                     COMMUNITY
//                   </span>

//                   <h2>
//                     Join the conversation
//                   </h2>

//                   <p>
//                     Share your thoughts,
//                     feelings or reflections
//                     about this poem.
//                   </p>
//                 </div>

//                 <div className="comments-count-box">
//                   <FaComment />

//                   <strong>
//                     {comments.length}
//                   </strong>

//                   <span>
//                     Comments
//                   </span>
//                 </div>

//               </div>

//               {/* COMMENT FORM */}

//               {poem.allowComments !==
//                 false ? (
//                 <form
//                   className="poem-comment-form"
//                   onSubmit={
//                     handleCommentSubmit
//                   }
//                 >

//                   <div className="comment-form-heading">
//                     <div className="comment-form-icon">
//                       <FaFeatherAlt />
//                     </div>

//                     <div>
//                       <h3>
//                         Leave a thought
//                       </h3>

//                       <p>
//                         Tell us what this poem means to you.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="comment-form-grid">

//                     <div className="comment-field">

//                       <label htmlFor="poem-comment-name">
//                         Your name
//                       </label>

//                       <input
//                         id="poem-comment-name"
//                         type="text"
//                         value={
//                           commentName
//                         }
//                         onChange={(event) =>
//                           setCommentName(
//                             event.target
//                               .value
//                           )
//                         }
//                         placeholder="Enter your name"
//                         autoComplete="name"
//                         maxLength={80}
//                         required
//                       />

//                     </div>

//                   </div>

//                   <div className="comment-field">

//                     <label htmlFor="poem-comment-text">
//                       Your comment
//                     </label>

//                     <textarea
//                       id="poem-comment-text"
//                       value={
//                         commentText
//                       }
//                       onChange={(event) =>
//                         setCommentText(
//                           event.target
//                             .value
//                         )
//                       }
//                       placeholder="What did this poem make you feel or think about?"
//                       rows={6}
//                       maxLength={1000}
//                       required
//                     />

//                     <div className="comment-character-count">
//                       {commentText.length}/1000
//                     </div>

//                   </div>

//                   {commentError && (
//                     <div className="comment-alert error">
//                       <FaExclamationCircle />
//                       <span>
//                         {commentError}
//                       </span>
//                     </div>
//                   )}

//                   {commentMessage && (
//                     <div className="comment-alert success">
//                       <FaCheck />
//                       <span>
//                         {commentMessage}
//                       </span>
//                     </div>
//                   )}

//                   <div className="comment-form-footer">

//                     <p>
//                       Your comment may require
//                       approval before appearing
//                       publicly.
//                     </p>

//                     <button
//                       type="submit"
//                       disabled={
//                         commentSubmitting
//                       }
//                     >
//                       <FaPaperPlane />

//                       {commentSubmitting
//                         ? "Submitting..."
//                         : "Post Comment"}
//                     </button>

//                   </div>

//                 </form>
//               ) : (
//                 <div className="comments-disabled">
//                   <FaComment />

//                   <div>
//                     <h3>
//                       Comments are closed
//                     </h3>

//                     <p>
//                       Comments are currently
//                       disabled for this poem.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* COMMENTS LIST */}

//               <div className="poem-comments-list">

//                 {commentsLoading ? (
//                   <div className="comments-loading-state">
//                     <div className="comments-spinner" />

//                     <p>
//                       Loading comments...
//                     </p>
//                   </div>
//                 ) : comments.length ===
//                   0 ? (
//                   <div className="no-comments-state">

//                     <div className="no-comments-icon">
//                       <FaComment />
//                     </div>

//                     <h3>
//                       Be the first to comment
//                     </h3>

//                     <p>
//                       Your thoughts could
//                       start a meaningful
//                       conversation.
//                     </p>

//                   </div>
//                 ) : (
//                   comments.map(
//                     (
//                       comment,
//                       index
//                     ) => {
//                       const name =
//                         getCommentName(
//                           comment
//                         );

//                       const text =
//                         getCommentText(
//                           comment
//                         );

//                       return (
//                         <article
//                           className="poem-comment"
//                           key={
//                             comment?._id ||
//                             comment?.id ||
//                             index
//                           }
//                         >

//                           <div className="comment-avatar">
//                             {getInitial(
//                               name
//                             )}
//                           </div>

//                           <div className="comment-main">

//                             <div className="comment-top">

//                               <div>
//                                 <h4>
//                                   {name}
//                                 </h4>

//                                 <span>
//                                   {getCommentDate(
//                                     comment
//                                   )}
//                                 </span>
//                               </div>

//                               <FaFeatherAlt />

//                             </div>

//                             <p>
//                               {text}
//                             </p>

//                           </div>

//                         </article>
//                       );
//                     }
//                   )
//                 )}

//               </div>

//             </section>

//           </article>

//           {/* =================================================
//               SIDE INFORMATION
//           ================================================= */}

//           <aside className="poem-sidebar">

//             <div className="poem-sidebar-card poem-stats-card">

//               <div className="sidebar-card-heading">
//                 <FaBookOpen />

//                 <span>
//                   POEM DETAILS
//                 </span>
//               </div>

//               <div className="poem-stat">

//                 <FaEye />

//                 <div>
//                   <span>
//                     Views
//                   </span>

//                   <strong>
//                     {Number(
//                       poem.views || 0
//                     ).toLocaleString(
//                       "en-IN"
//                     )}
//                   </strong>
//                 </div>

//               </div>

//               <div className="poem-stat">

//                 <FaComment />

//                 <div>
//                   <span>
//                     Comments
//                   </span>

//                   <strong>
//                     {comments.length}
//                   </strong>
//                 </div>

//               </div>

//               <div className="poem-stat">

//                 <FaClock />

//                 <div>
//                   <span>
//                     Reading time
//                   </span>

//                   <strong>
//                     {readingTime} min
//                   </strong>
//                 </div>

//               </div>

//               <div className="poem-stat">

//                 <FaFeatherAlt />

//                 <div>
//                   <span>
//                     Words
//                   </span>

//                   <strong>
//                     {wordCount}
//                   </strong>
//                 </div>

//               </div>

//             </div>

//             {/* SHARE CARD */}

//             <div className="poem-sidebar-card poem-share-card">

//               <div className="sidebar-card-heading">
//                 <FaShareAlt />

//                 <span>
//                   SHARE THIS POEM
//                 </span>
//               </div>

//               <p>
//                 If these words resonated with you,
//                 share them with someone who may
//                 appreciate them too.
//               </p>

//               <button
//                 type="button"
//                 onClick={
//                   handleShare
//                 }
//               >
//                 <FaShareAlt />
//                 Share Poem
//               </button>

//               <button
//                 type="button"
//                 className="copy-link-button"
//                 onClick={
//                   handleCopyLink
//                 }
//               >
//                 {copied ? (
//                   <FaCheck />
//                 ) : (
//                   <FaLink />
//                 )}

//                 {copied
//                   ? "Link Copied"
//                   : "Copy Link"}
//               </button>

//             </div>

//             {/* CATEGORY */}

//             {poem.category && (
//               <div className="poem-sidebar-card">

//                 <div className="sidebar-card-heading">
//                   <FaFeatherAlt />

//                   <span>
//                     CATEGORY
//                   </span>
//                 </div>

//                 <div className="sidebar-category">
//                   {poem.category}
//                 </div>

//               </div>
//             )}

//             {/* TAGS */}

//             {Array.isArray(
//               poem.tags
//             ) &&
//               poem.tags.length > 0 && (
//                 <div className="poem-sidebar-card">

//                   <div className="sidebar-card-heading">
//                     <FaLink />

//                     <span>
//                       TAGS
//                     </span>
//                   </div>

//                   <div className="sidebar-tags">

//                     {poem.tags.map(
//                       (
//                         tag,
//                         index
//                       ) => (
//                         <span
//                           key={`${tag}-${index}`}
//                         >
//                           #{tag}
//                         </span>
//                       )
//                     )}

//                   </div>

//                 </div>
//               )}

//           </aside>

//         </div>

//       </div>

//       {/* ===================================================
//           BOTTOM DECORATION
//       =================================================== */}

//       <section className="poem-ending">

//         <div className="poem-ending-line" />

//         <FaFeatherAlt />

//         <p>
//           Thank you for taking the time to read.
//         </p>

//         <Link to="/poems">
//           Explore more poems
//           <FaArrowLeft />
//         </Link>

//       </section>

//     </main>
//   );
// }


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
  FaFeatherAlt,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaUser,
  FaComment,
  FaPaperPlane,
  FaFilePdf,
  FaDownload,
} from "react-icons/fa";

import {
  getPublicStoryBySlug,
  likeStory,
  dislikeStory,
  registerStoryView,
} from "../api/storyApi";

import {
  getComments,
  createComment,
} from "../api/commentApi";

import "./PoemDetail.css";

const PoemDetail = () => {
  const { slug } =
    useParams();

  const [poem, setPoem] =
    useState(null);

  const [comments, setComments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [commentsLoading, setCommentsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [commentName, setCommentName] =
    useState("");

  const [commentText, setCommentText] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [liked, setLiked] =
    useState(false);

  const [disliked, setDisliked] =
    useState(false);

  const [likes, setLikes] =
    useState(0);

  const [dislikes, setDislikes] =
    useState(0);

  const [views, setViews] =
    useState(0);

  /* =========================================================
     LOAD POEM
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    const fetchPoem =
      async () => {
        try {
          setLoading(true);
          setError("");

          if (!slug) {
            throw new Error(
              "Poem slug is missing."
            );
          }

          /*
           * getPublicStoryBySlug now
           * returns the actual document.
           */
          const data =
            await getPublicStoryBySlug(
              slug
            );

          console.log(
            "Poem detail data:",
            data
          );

          if (!data?._id) {
            throw new Error(
              "Poem not found."
            );
          }

          if (
            data.contentType &&
            data.contentType !==
              "poem"
          ) {
            throw new Error(
              "This content is not a poem."
            );
          }

          if (!mounted) return;

          setPoem(data);

          setLikes(
            Number(
              data.likes ?? 0
            )
          );

          setDislikes(
            Number(
              data.dislikes ?? 0
            )
          );

          setViews(
            Number(
              data.views ?? 0
            )
          );

          /* Register view */

          try {
            const response =
              await registerStoryView(
                data._id
              );

            if (
              mounted &&
              response?.views !==
                undefined
            ) {
              setViews(
                Number(
                  response.views
                )
              );

              setPoem(
                (previous) =>
                  previous
                    ? {
                        ...previous,
                        views:
                          response.views,
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
            "Failed to fetch poem:",
            err
          );

          if (mounted) {
            setError(
              err?.response?.data
                ?.message ||
                err?.message ||
                "Unable to load poem."
            );
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      };

    fetchPoem();

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =========================================================
     COMMENTS
  ========================================================= */

  useEffect(() => {
    if (!poem?._id) return;

    const fetchComments =
      async () => {
        try {
          setCommentsLoading(true);

          const response =
            await getComments(
              String(poem._id),
              "Poem"
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
        } finally {
          setCommentsLoading(false);
        }
      };

    fetchComments();
  }, [poem?._id]);

  /* =========================================================
     COMMENT
  ========================================================= */

  const submitComment =
    async (event) => {
      event.preventDefault();

      if (!poem?._id) return;

      const name =
        commentName.trim();

      const text =
        commentText.trim();

      if (!name || !text) {
        return;
      }

      try {
        setSubmitting(true);

        const response =
          await createComment(
            String(poem._id),
            name,
            text,
            "Poem"
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
      } catch (err) {
        console.error(
          "Comment submission failed:",
          err
        );

        alert(
          err?.response?.data
            ?.message ||
            "Unable to submit comment."
        );
      } finally {
        setSubmitting(false);
      }
    };

  /* =========================================================
     LIKE
  ========================================================= */

  const handleLike =
    async () => {
      if (!poem?._id) return;

      try {
        const response =
          await likeStory(
            poem._id
          );

        setLiked(true);
        setDisliked(false);

        const nextLikes =
          response?.likes ??
          response?.likesCount;

        setLikes(
          nextLikes !== undefined
            ? Number(nextLikes)
            : (previous) =>
                previous + 1
        );
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
      if (!poem?._id) return;

      try {
        const response =
          await dislikeStory(
            poem._id
          );

        setDisliked(true);
        setLiked(false);

        const nextDislikes =
          response?.dislikes ??
          response?.dislikesCount;

        setDislikes(
          nextDislikes !== undefined
            ? Number(
                nextDislikes
              )
            : (previous) =>
                previous + 1
        );
      } catch (err) {
        console.error(
          "Dislike failed:",
          err
        );
      }
    };

  /* =========================================================
     DATE
  ========================================================= */

  const dateText =
    poem?.publishedAt ||
    poem?.createdAt
      ? new Date(
          poem.publishedAt ||
            poem.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
      : "";

  /* =========================================================
     PDF
  ========================================================= */

  const pdfUrl =
    poem?.originalPdfUrl ||
    poem?.pdfUrl ||
    poem?.originalPdf ||
    poem?.pdf ||
    "";

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="poem-loading">
        <div className="poem-spinner" />

        <h3>
          Opening poem...
        </h3>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !poem) {
    return (
      <div className="poem-error">

        <h2>
          Poem unavailable
        </h2>

        <p>
          {error ||
            "This poem could not be found."}
        </p>

        <Link to="/poems">
          <FaArrowLeft />
          Back to Poems
        </Link>

      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="poem-detail-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="poem-detail-hero">

        {poem.coverImage && (
          <img
            src={poem.coverImage}
            alt={poem.title}
            className="poem-hero-image"
          />
        )}

        <div className="poem-hero-overlay" />

        <div className="poem-hero-content">

          <Link
            to="/poems"
            className="poem-back-link"
          >
            <FaArrowLeft />
            Back to Poems
          </Link>

          <div className="poem-label">
            <FaFeatherAlt />
            POETRY
          </div>

          <h1>
            {poem.title}
          </h1>

          {poem.excerpt && (
            <p>
              {poem.excerpt}
            </p>
          )}

          <div className="poem-meta">

            <span>
              <FaUser />
              {poem.authorName ||
                "Prosper Foundation"}
            </span>

            {dateText && (
              <span>
                <FaCalendarAlt />
                {dateText}
              </span>
            )}

            <span>
              <FaEye />
              {views} views
            </span>

          </div>

        </div>
      </section>

      {/* =====================================================
          POEM CONTENT
      ===================================================== */}

      <div className="poem-detail-container">

        <article className="poem-paper">

          {poem.content?.trim() ? (
            <div
              className="poem-content"
              style={{
                fontFamily:
                  poem.fontFamily ||
                  "Georgia",

                fontSize: `${
                  poem.fontSize ||
                  18
                }px`,
              }}
              dangerouslySetInnerHTML={{
                __html:
                  poem.content,
              }}
            />
          ) : (
            <div className="poem-content">
              <p>
                No poem content
                available.
              </p>
            </div>
          )}

          {/* =================================================
              ORIGINAL PDF
          ================================================= */}

          {pdfUrl && (
            <div className="poem-pdf-card">

              <div className="poem-pdf-icon">
                <FaFilePdf />
              </div>

              <div className="poem-pdf-info">

                <strong>
                  Original Designed PDF
                </strong>

                <span>
                  Experience the poem
                  in its original visual
                  format.
                </span>

                {poem.originalPdfName && (
                  <small>
                    {
                      poem.originalPdfName
                    }
                  </small>
                )}

              </div>

              <div className="poem-pdf-actions">

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaEye />
                  View PDF
                </a>

                <a
                  href={pdfUrl}
                  download={
                    poem.originalPdfName ||
                    "original-poem.pdf"
                  }
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

          <div className="poem-reactions">

            <button
              className={
                liked
                  ? "active"
                  : ""
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

              {likes}
              Like
            </button>

            <button
              className={
                disliked
                  ? "active"
                  : ""
              }
              onClick={
                handleDislike
              }
            >
              <FaThumbsDown />

              {dislikes}
              Dislike
            </button>

          </div>

        </article>

        {/* =====================================================
            COMMENTS
        ===================================================== */}

        {poem.allowComments !==
          false && (
          <section className="poem-comments">

            <div className="poem-comments-heading">

              <div>
                <span>
                  SHARE YOUR THOUGHTS
                </span>

                <h2>
                  Comments
                </h2>
              </div>

              <div className="poem-comment-count">
                <FaComment />
                {comments.length}
              </div>

            </div>

            <form
              className="poem-comment-form"
              onSubmit={
                submitComment
              }
            >

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
                placeholder="Your name"
                required
                maxLength={80}
              />

              <textarea
                value={
                  commentText
                }
                onChange={(e) =>
                  setCommentText(
                    e.target.value
                  )
                }
                placeholder="Write your thoughts about this poem..."
                rows={5}
                required
                maxLength={1000}
              />

              <button
                type="submit"
                disabled={
                  submitting
                }
              >
                <FaPaperPlane />

                {submitting
                  ? "Submitting..."
                  : "Post Comment"}
              </button>

            </form>

            <div className="poem-comments-list">

              {commentsLoading ? (
                <div className="poem-comment-state">
                  Loading comments...
                </div>
              ) : comments.length ===
                0 ? (
                <div className="poem-comment-state">

                  <FaComment />

                  <h3>
                    No comments yet
                  </h3>

                  <p>
                    Be the first to
                    share your thoughts.
                  </p>

                </div>
              ) : (
                comments.map(
                  (comment) => (
                    <article
                      className="poem-comment"
                      key={
                        comment._id
                      }
                    >

                      <div className="poem-comment-avatar">
                        {(
                          comment.name ||
                          "A"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="poem-comment-body">

                        <div className="poem-comment-top">

                          <strong>
                            {
                              comment.name
                            }
                          </strong>

                          {comment.createdAt && (
                            <time>
                              {new Date(
                                comment.createdAt
                              ).toLocaleDateString(
                                "en-IN"
                              )}
                            </time>
                          )}

                        </div>

                        <p>
                          {comment.text ||
                            comment.content ||
                            ""}
                        </p>

                      </div>

                    </article>
                  )
                )
              )}

            </div>

          </section>
        )}

      </div>

    </main>
  );
};

export default PoemDetail;