// import React, {
//   useEffect,
//   useState,
// } from "react";


// import ContentCard from "../components/ContentCard";
// import ContentFilters from "../components/ContentFilters";
// import ContentHero from "../components/ContentHero";
// import LoadingSpinner from "../components/LoadingState";
// import EmptyState from "../components/EmptyState";

// import contentApi from "../api/contentApi";

// const ContentListing = ({
//   type,
//   title,
//   subtitle,
// }) => {
//   const [items, setItems] = useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [search, setSearch] =
//     useState("");

//   const [category, setCategory] =
//     useState("");

//   const [page, setPage] =
//     useState(1);

//   const [pagination, setPagination] =
//     useState({
//       pages: 1,
//       currentPage: 1,
//     });

//   const fetchContent = async () => {
//     try {
//       setLoading(true);

//       const response =
//         await contentApi.getAll({
//           type,
//           search,
//           category,
//           page,
//           limit: 9,
//         });

//       setItems(
//         response.data || []
//       );

//       if (response.pagination) {
//         setPagination(
//           response.pagination
//         );
//       }

//     } catch (error) {
//       console.error(
//         "Content loading error:",
//         error
//       );

//       setItems([]);

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchContent();
//   }, [
//     type,
//     search,
//     category,
//     page,
//   ]);

//   useEffect(() => {
//     setPage(1);
//   }, [
//     search,
//     category,
//   ]);

//   return (
//     <div className="content-page">

//       <ContentHero
//         title={title}
//         subtitle={subtitle}
//         type={type}
//       />

//       <section className="content-section">

//         <div className="container">

//           <ContentFilters
//             search={search}
//             setSearch={setSearch}
//             category={category}
//             setCategory={setCategory}
//             categories={[
//               "Astrology",
//               "Psychology",
//               "Spiritual",
//               "Paranormal",
//               "Research",
//             ]}
//           />

//           {loading ? (
//             <LoadingSpinner />
//           ) : items.length === 0 ? (
//             <EmptyState
//               title={`No ${type}s found`}
//               message={`There are currently no published ${type}s matching your search.`}
//             />
//           ) : (
//             <>
//               <div className="content-grid">

//                 {items.map((item) => (
//                   <ContentCard
//                     key={item._id}
//                     item={item}
//                   />
//                 ))}

//               </div>

//               {pagination.pages > 1 && (
//                 <div className="content-pagination">

//                   <button
//                     disabled={page === 1}
//                     onClick={() =>
//                       setPage(
//                         (prev) =>
//                           Math.max(
//                             1,
//                             prev - 1
//                           )
//                       )
//                     }
//                   >
//                     Previous
//                   </button>

//                   {Array.from(
//                     {
//                       length:
//                         pagination.pages,
//                     },
//                     (_, index) =>
//                       index + 1
//                   ).map((number) => (
//                     <button
//                       key={number}
//                       className={
//                         page === number
//                           ? "active"
//                           : ""
//                       }
//                       onClick={() =>
//                         setPage(number)
//                       }
//                     >
//                       {number}
//                     </button>
//                   ))}

//                   <button
//                     disabled={
//                       page ===
//                       pagination.pages
//                     }
//                     onClick={() =>
//                       setPage(
//                         (prev) =>
//                           Math.min(
//                             pagination.pages,
//                             prev + 1
//                           )
//                       )
//                     }
//                   >
//                     Next
//                   </button>

//                 </div>
//               )}

//             </>
//           )}

//         </div>

//       </section>
//     </div>
//   );
// };

// export default ContentListing;


import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Calendar,
  Eye,
  BookOpen,
} from "lucide-react";

import { getContent } from "../api/contentApi";
import "./ContentListing.css";

export default function ContentListing() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const type = searchParams.get("type") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  const [content, setContent] = useState([]);
  const [pagination, setPagination] =
    useState(null);
  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getContent({
          type,
          search: search.trim(),
          page,
          limit: 12,
        });

        setContent(response?.data || []);
        setPagination(response?.pagination || null);
      } catch (err) {
        setError(
          err?.message ||
            "Unable to load content."
        );
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(
      loadContent,
      300
    );

    return () => clearTimeout(timer);
  }, [type, search, page]);

  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);

    const params = {};

    if (type) params.type = type;
    if (value) params.search = value;

    setSearchParams(params);
  };

  const changePage = (nextPage) => {
    setPage(nextPage);

    const params = {};

    if (type) params.type = type;
    if (search) params.search = search;
    params.page = nextPage;

    setSearchParams(params);
  };

  const heading =
    type === "article"
      ? "Articles"
      : type === "blog"
      ? "Blogs"
      : type === "book"
      ? "Books"
      : type === "story"
      ? "Stories"
      : type === "poem"
      ? "Poems"
      : "Explore Our Content";

  return (
    <main className="content-listing-page">
      <section className="content-listing-hero">
        <div className="content-listing-container">
          <span className="content-listing-label">
            Prosper Foundation
          </span>

          <h1>{heading}</h1>

          <p>
            Explore ideas, experiences, research and
            resources created to encourage awareness,
            reflection and holistic growth.
          </p>
        </div>
      </section>

      <section className="content-listing-section">
        <div className="content-listing-container">
          <div className="content-listing-search">
            <Search size={19} />

            <input
              value={search}
              onChange={(e) =>
                changeSearch(e.target.value)
              }
              placeholder={`Search ${heading.toLowerCase()}...`}
            />
          </div>

          {loading ? (
            <div className="content-listing-state">
              <div className="listing-spinner" />
              <p>Loading content...</p>
            </div>
          ) : error ? (
            <div className="content-listing-state">
              <h3>Unable to load content</h3>
              <p>{error}</p>
            </div>
          ) : content.length === 0 ? (
            <div className="content-listing-state">
              <BookOpen size={45} />
              <h3>No content found</h3>
              <p>
                Try another search or check back later.
              </p>
            </div>
          ) : (
            <>
              <div className="content-listing-grid">
                {content.map((item) => (
                  <article
                    className="listing-content-card"
                    key={item._id}
                  >
                    <Link
                      to={`/content/${item.slug}`}
                      className="listing-content-image"
                    >
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="listing-placeholder">
                          <BookOpen size={40} />
                        </div>
                      )}
                    </Link>

                    <div className="listing-content-body">
                      <span className="listing-content-type">
                        {item.type}
                      </span>

                      <h2>{item.title}</h2>

                      <p>
                        {item.excerpt ||
                          "Explore this published resource."}
                      </p>

                      <div className="listing-meta">
                        <span>
                          <Calendar size={13} />
                          {item.publishedAt
                            ? new Date(
                                item.publishedAt
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "Recently published"}
                        </span>

                        <span>
                          <Eye size={13} />
                          {item.views || 0}
                        </span>
                      </div>

                      <Link
                        to={`/content/${item.slug}`}
                        className="listing-read"
                      >
                        Explore
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {pagination &&
                pagination.pages > 1 && (
                  <div className="listing-pagination">
                    {Array.from(
                      {
                        length: pagination.pages,
                      },
                      (_, index) => index + 1
                    ).map((number) => (
                      <button
                        key={number}
                        className={
                          number === page
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          changePage(number)
                        }
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}