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
//   FaBookOpen,
//   FaDownload,
//   FaSearch,
//   FaExternalLinkAlt,
// } from "react-icons/fa";

// import {
//   Link,
// } from "react-router-dom";

// import { apiFetch } from "../utils/api";

// import "./Publications.css";

// const Publications = () => {
//   const [
//     publications,
//     setPublications,
//   ] = useState([]);

//   const [search, setSearch] =
//     useState("");

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     const load =
//       async () => {
//         try {
//           const response =
//             await apiFetch(
//               "/publications"
//             );

//           setPublications(
//             response?.data || []
//           );
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//     load();
//   }, []);

//   const filtered =
//     publications.filter(
//       (item) =>
//         item.title
//           ?.toLowerCase()
//           .includes(
//             search.toLowerCase()
//           ) ||
//         item.abstract
//           ?.toLowerCase()
//           .includes(
//             search.toLowerCase()
//           )
//     );

//   return (
//     <main className="publications-page">

//       <section className="publications-hero">

//         <div className="publications-hero-content">

//           <span>
//             RESEARCH • KNOWLEDGE • DISCOVERY
//           </span>

//           <h1>
//             Research & Publications
//           </h1>

//           <p>
//             Explore research, papers,
//             reports and publications
//             from Prosper Foundation.
//           </p>

//         </div>

//       </section>

//       <section className="publications-container">

//         <div className="publications-toolbar">

//           <div className="publication-search">

//             <FaSearch />

//             <input
//               placeholder="Search publications..."
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
//           <div className="publication-loading">
//             Loading publications...
//           </div>
//         ) : (
//           <div className="publications-list">

//             {filtered.map(
//               (publication) => (
//                 <article
//                   className="publication-card"
//                   key={
//                     publication._id
//                   }
//                 >

//                   <div className="publication-icon">
//                     <FaBookOpen />
//                   </div>

//                   <div className="publication-content">

//                     <div className="publication-type">
//                       {publication.type ||
//                         "Research Publication"}
//                     </div>

//                     <h2>
//                       {publication.title}
//                     </h2>

//                     {publication.authors && (
//                       <p className="publication-authors">
//                         {Array.isArray(
//                           publication.authors
//                         )
//                           ? publication.authors.join(
//                               ", "
//                             )
//                           : publication.authors}
//                       </p>
//                     )}

//                     <p className="publication-abstract">
//                       {publication.abstract ||
//                         publication.description}
//                     </p>

//                     <div className="publication-meta">

//                       {publication.year && (
//                         <span>
//                           {publication.year}
//                         </span>
//                       )}

//                       {publication.journal && (
//                         <span>
//                           {publication.journal}
//                         </span>
//                       )}

//                     </div>

//                     <div className="publication-actions">

//                       <Link
//                         to={`/publications/${
//                           publication.slug ||
//                           publication._id
//                         }`}
//                       >
//                         View Publication
//                         <FaExternalLinkAlt />
//                       </Link>

//                       {publication.pdfUrl && (
//                         <a
//                           href={
//                             publication.pdfUrl
//                           }
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           Download PDF
//                           <FaDownload />
//                         </a>
//                       )}

//                     </div>

//                   </div>

//                 </article>
//               )
//             )}

//           </div>
//         )}

//         {!loading &&
//           filtered.length ===
//             0 && (
//             <div className="publication-empty">
//               <FaBookOpen />
//               <h3>
//                 No publications found
//               </h3>
//             </div>
//           )}

//       </section>

//     </main>
//   );
// };

// export default Publications;



import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  ArrowRight,
  Calendar,
  User,
  Sparkles,
  RefreshCw,
  Filter,
} from "lucide-react";

import { getPublications } from "../api/contentApi";
import "./Publications.css";

const API_TYPES = [
  { value: "", label: "All Publications" },
  { value: "publication", label: "Research Publications" },
  { value: "article", label: "Articles" },
  { value: "book", label: "Books" },
];

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPublications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPublications({
        search: search.trim(),
        type,
      });

      setPublications(response?.data || []);
    } catch (err) {
      console.error("Publications error:", err);
      setError(
        err?.message ||
          "Unable to load publications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadPublications();
    }, 350);

    return () => clearTimeout(timer);
  }, [search, type]);

  const featured = useMemo(
    () =>
      publications.filter(
        (item) =>
          item.isFeatured ||
          item.featured ||
          item.type === "publication"
      ).slice(0, 3),
    [publications]
  );

  return (
    <main className="publications-page">
      <section className="publications-hero">
        <div className="publications-hero-glow glow-one" />
        <div className="publications-hero-glow glow-two" />

        <div className="publications-container publications-hero-content">
          <span className="publications-eyebrow">
            <Sparkles size={15} />
            Knowledge • Research • Wisdom
          </span>

          <h1>
            Explore Our{" "}
            <span>Publications</span>
          </h1>

          <p>
            Discover research, articles, books and thoughtful
            perspectives exploring psychology, spirituality,
            astrology and human transformation.
          </p>

          <div className="publications-hero-stats">
            <div>
              <strong>{publications.length}</strong>
              <span>Available Works</span>
            </div>

            <div>
              <strong>Research</strong>
              <span>Evidence & Insight</span>
            </div>

            <div>
              <strong>Wisdom</strong>
              <span>For Meaningful Growth</span>
            </div>
          </div>
        </div>
      </section>

      <section className="publications-toolbar-section">
        <div className="publications-container">
          <div className="publications-toolbar">
            <div className="publication-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search publications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="publication-filter">
              <Filter size={17} />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {API_TYPES.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && !search && !type && (
        <section className="publications-featured">
          <div className="publications-container">
            <div className="section-heading-publications">
              <div>
                <span>Featured Reading</span>
                <h2>Ideas Worth Exploring</h2>
              </div>
            </div>

            <div className="featured-publication-grid">
              {featured.map((item) => (
                <Link
                  to={`/publications/${item.slug || item._id}`}
                  className="featured-publication-card"
                  key={item._id}
                >
                  <div className="featured-image">
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                      />
                    ) : (
                      <div className="publication-image-placeholder">
                        <BookOpen size={42} />
                      </div>
                    )}
                  </div>

                  <div className="featured-publication-body">
                    <span className="publication-type">
                      {item.type || "Publication"}
                    </span>

                    <h3>{item.title}</h3>

                    <p>
                      {item.excerpt ||
                        "Explore this publication from Prosper Foundation."}
                    </p>

                    <span className="read-publication">
                      Read more <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="publications-list-section">
        <div className="publications-container">
          <div className="section-heading-publications">
            <div>
              <span>Our Collection</span>
              <h2>Latest Publications</h2>
            </div>
          </div>

          {loading ? (
            <div className="publications-state">
              <RefreshCw className="spin" size={30} />
              <p>Loading publications...</p>
            </div>
          ) : error ? (
            <div className="publications-state error">
              <p>{error}</p>
              <button onClick={loadPublications}>
                Try Again
              </button>
            </div>
          ) : publications.length === 0 ? (
            <div className="publications-state">
              <BookOpen size={45} />
              <h3>No publications found</h3>
              <p>
                Try another search or check back later for
                new publications.
              </p>
            </div>
          ) : (
            <div className="publication-grid">
              {publications.map((item) => (
                <article
                  className="publication-card"
                  key={item._id}
                >
                  <Link
                    to={`/publications/${item.slug || item._id}`}
                    className="publication-card-image"
                  >
                    {item.coverImage ? (
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="publication-image-placeholder">
                        <BookOpen size={38} />
                      </div>
                    )}

                    <span>
                      {item.type || "Publication"}
                    </span>
                  </Link>

                  <div className="publication-card-content">
                    <div className="publication-meta">
                      <span>
                        <Calendar size={14} />
                        {item.publishedAt
                          ? new Date(
                              item.publishedAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "Recently added"}
                      </span>

                      <span>
                        <User size={14} />
                        {item.author ||
                          "Prosper Foundation"}
                      </span>
                    </div>

                    <h3>{item.title}</h3>

                    <p>
                      {item.excerpt ||
                        "Explore this publication and discover new perspectives."}
                    </p>

                    <Link
                      className="publication-read-link"
                      to={`/publications/${item.slug || item._id}`}
                    >
                      Explore publication
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}