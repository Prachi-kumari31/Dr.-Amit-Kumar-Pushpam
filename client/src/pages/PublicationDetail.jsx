// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   FaSearch,
//   FaBookOpen,
//   FaArrowRight,
// } from "react-icons/fa";

// import { Link, useParams } from "react-router-dom";

// import { apiFetch } from "../utils/api";

// import "./Publications.css";

// const labels = {
//   blogs: "Blogs",
//   stories: "Stories",
//   poems: "Poems",
//   books: "Books",
//   articles: "Articles",
//   publications:
//     "Publications",
// };

// const typeMap = {
//   blogs: "blog",
//   stories: "story",
//   poems: "poem",
//   books: "book",
//   articles: "article",
//   publications:
//     "publication",
// };

// const Publications = () => {
//   const { type } =
//     useParams();

//   const contentType =
//     typeMap[type] || "blog";

//   const [items, setItems] =
//     useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoading(true);

//         const response =
//           await apiFetch(
//             `/publications/public?type=${contentType}`
//           );

//         setItems(
//           response.data || []
//         );
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [contentType]);

//   const filtered =
//     items.filter((item) =>
//       item.title
//         ?.toLowerCase()
//         .includes(
//           search.toLowerCase()
//         )
//     );

//   return (
//     <main className="publications-page">

//       <section className="publications-hero">

//         <div className="hero-content">

//           <span>
//             PROSPER FOUNDATION
//           </span>

//           <h1>
//             {labels[type] ||
//               "Our Collection"}
//           </h1>

//           <p>
//             Explore thoughtful
//             ideas, stories,
//             reflections and
//             knowledge curated
//             by Prosper Foundation.
//           </p>

//         </div>

//       </section>

//       <section className="publication-library">

//         <div className="library-toolbar">

//           <div className="library-search">
//             <FaSearch />

//             <input
//               placeholder={`Search ${labels[
//                 type
//               ]?.toLowerCase()}...`}
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//             />
//           </div>

//         </div>

//         {loading ? (
//           <div className="library-loading">
//             Loading...
//           </div>
//         ) : (
//           <div className="publication-grid">

//             {filtered.map(
//               (item) => (
//                 <article
//                   className="publication-card"
//                   key={item._id}
//                 >

//                   <div className="publication-image">

//                     {item.coverImage ? (
//                       <img
//                         src={
//                           item.coverImage
//                         }
//                         alt={
//                           item.title
//                         }
//                       />
//                     ) : (
//                       <div>
//                         <FaBookOpen />
//                       </div>
//                     )}

//                   </div>

//                   <div className="publication-body">

//                     <span className="publication-category">
//                       {item.category ||
//                         labels[type]}
//                     </span>

//                     <h2>
//                       {item.title}
//                     </h2>

//                     <p>
//                       {item.excerpt}
//                     </p>

//                     <div className="publication-meta">
//                       <span>
//                         By{" "}
//                         {item.author}
//                       </span>

//                       <span>
//                         {item.views} views
//                       </span>
//                     </div>

//                     <Link
//                       to={`/${type}/${item.slug}`}
//                     >
//                       Read More
//                       <FaArrowRight />
//                     </Link>

//                   </div>

//                 </article>
//               )
//             )}

//           </div>
//         )}

//       </section>

//     </main>
//   );
// };

// export default Publications;


// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
//   useParams,
// } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaDownload,
//   FaExternalLinkAlt,
// } from "react-icons/fa";

// import { apiFetch } from "../utils/api";

// import "./PublicationDetail.css";

// const PublicationDetail = () => {
//   const { slug } =
//     useParams();

//   const [
//     publication,
//     setPublication,
//   ] = useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     const load =
//       async () => {
//         try {
//           const response =
//             await apiFetch(
//               `/publications/${slug}`
//             );

//           setPublication(
//             response?.data
//           );
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//     load();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="publication-detail-loading">
//         Loading publication...
//       </div>
//     );
//   }

//   if (!publication) {
//     return (
//       <div className="publication-detail-error">
//         <h2>
//           Publication not found
//         </h2>

//         <Link to="/publications">
//           Back to Publications
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <main className="publication-detail-page">

//       <div className="publication-detail-container">

//         <Link
//           to="/publications"
//           className="publication-back"
//         >
//           <FaArrowLeft />
//           Back to Publications
//         </Link>

//         <header className="publication-detail-header">

//           <span>
//             {publication.type ||
//               "RESEARCH PUBLICATION"}
//           </span>

//           <h1>
//             {publication.title}
//           </h1>

//           {publication.authors && (
//             <p className="publication-detail-authors">
//               {Array.isArray(
//                 publication.authors
//               )
//                 ? publication.authors.join(
//                     ", "
//                   )
//                 : publication.authors}
//             </p>
//           )}

//           <div className="publication-detail-meta">

//             {publication.year && (
//               <span>
//                 Year:{" "}
//                 {publication.year}
//               </span>
//             )}

//             {publication.journal && (
//               <span>
//                 Journal:{" "}
//                 {publication.journal}
//               </span>
//             )}

//             {publication.doi && (
//               <span>
//                 DOI:{" "}
//                 {publication.doi}
//               </span>
//             )}

//           </div>

//         </header>

//         {publication.abstract && (
//           <section className="publication-abstract-box">

//             <h2>
//               Abstract
//             </h2>

//             <p>
//               {publication.abstract}
//             </p>

//           </section>
//         )}

//         <section className="publication-detail-body">

//           <div
//             dangerouslySetInnerHTML={{
//               __html:
//                 publication.content ||
//                 "",
//             }}
//           />

//         </section>

//         <div className="publication-detail-actions">

//           {publication.pdfUrl && (
//             <a
//               href={
//                 publication.pdfUrl
//               }
//               target="_blank"
//               rel="noreferrer"
//             >
//               <FaDownload />
//               Download PDF
//             </a>
//           )}

//           {publication.externalUrl && (
//             <a
//               href={
//                 publication.externalUrl
//               }
//               target="_blank"
//               rel="noreferrer"
//             >
//               <FaExternalLinkAlt />
//               External Source
//             </a>
//           )}

//         </div>

//       </div>

//     </main>
//   );
// };

// export default PublicationDetail;


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Heart,
  ThumbsDown,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";

import {
  getPublication,
  likePublication,
  dislikePublication,
  getPublicationById,
} from "../api/contentApi";

import CommentSection from "../components/CommentSection";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";

import "./PublicationDetail.css";


export default function PublicationDetail() {
  const { id } = useParams();

  const [publication, setPublication] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPublication = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublication(id);

      const payload = response?.data;

      if (payload?.publication) {
        setPublication(payload.publication);
        setComments(payload.comments || []);
      } else {
        setPublication(payload || null);
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "Unable to load this publication."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const loadPublication = async () => {
      try {
        const data = await getPublicationById(id);
        setPublication(data);
      } catch (error) {
        console.error("Error loading publication:", error);
      }
    };

    if (id) loadPublication();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await likePublication(publication._id);

      setPublication((prev) => ({
        ...prev,
        likes: response.likes ?? response.data?.likes ?? prev.likes,
        dislikes:
          response.dislikes ??
          response.data?.dislikes ??
          prev.dislikes,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await dislikePublication(publication._id);

      setPublication((prev) => ({
        ...prev,
        likes: response.likes ?? response.data?.likes ?? prev.likes,
        dislikes:
          response.dislikes ??
          response.data?.dislikes ??
          prev.dislikes,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const sharePublication = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: publication.title,
          text: publication.excerpt || "",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Publication link copied.");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  if (loading) {
    return <LoadingState message="Loading publication..." />;
  }

  if (error) {
    return (
      <div className="publication-detail-state">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={loadPublication}>
          Try Again
        </button>
      </div>
    );
  }

  if (!publication) {
    return (
      <EmptyState
        title="Publication not found"
        message="This publication may have been removed or is no longer available."
      />
    );
  }

  return (
    <main className="publication-detail-page">
      <section className="publication-detail-hero">
        <div className="publication-detail-container">
          <Link
            to="/publications"
            className="publication-back-link"
          >
            <ArrowLeft size={17} />
            Back to publications
          </Link>

          <div className="publication-detail-category">
            <BookOpen size={15} />
            {publication.type || "Publication"}
          </div>

          <h1>{publication.title}</h1>

          {publication.excerpt && (
            <p className="publication-detail-excerpt">
              {publication.excerpt}
            </p>
          )}

          <div className="publication-detail-meta">
            <span>
              <Calendar size={16} />
              {publication.publishedAt
                ? new Date(
                    publication.publishedAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Published recently"}
            </span>

            <span>
              <Eye size={16} />
              {publication.views || 0} views
            </span>

            <span>
              By {publication.author || "Prosper Foundation"}
            </span>
          </div>
        </div>
      </section>

      <section className="publication-detail-container publication-main">
        <div className="publication-detail-cover">
          {publication.coverImage ? (
            <img
              src={publication.coverImage}
              alt={publication.title}
            />
          ) : (
            <div className="publication-detail-cover-placeholder">
              <BookOpen size={70} />
            </div>
          )}
        </div>

        <div className="publication-content-layout">
          <article className="publication-content">
            <div
              className="publication-rich-content"
              dangerouslySetInnerHTML={{
                __html: publication.content || "",
              }}
            />

            {publication.tags?.length > 0 && (
              <div className="publication-tags">
                <Tag size={17} />

                {publication.tags.map((tag, index) => (
                  <span key={`${tag}-${index}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="publication-actions">
              <button onClick={handleLike}>
                <Heart size={18} />
                {publication.likes || 0}
              </button>

              <button onClick={handleDislike}>
                <ThumbsDown size={18} />
                {publication.dislikes || 0}
              </button>

              <button onClick={sharePublication}>
                <Share2 size={18} />
                Share
              </button>
            </div>
          </article>
        </div>

        <CommentSection
          contentId={publication._id}
          comments={comments}
          setComments={setComments}
        />
      </section>
    </main>
  );
}