// import React, {
//   useEffect,
//   useState,
// } from "react";

// import ContentCard from "../components/ContentCard";
// import LoadingState from "../components/LoadingState";
// import { apiFetch } from "../utils/api";

// import "../styles/ContentPages.css";

// const Poems = () => {
//   const [poems, setPoems] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     const loadPoems =
//       async () => {
//         try {
//           const response =
//             await apiFetch(
//               "/poems"
//             );

//           setPoems(
//             response?.data || []
//           );
//         } catch (err) {
//           setError(
//             err.message ||
//               "Unable to load poems."
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//     loadPoems();
//   }, []);

//   return (
//     <main className="content-page">

//       <section className="content-hero poems-hero">

//         <div className="content-hero-overlay" />

//         <div className="content-hero-content">

//           <span className="content-eyebrow">
//             POETRY • EXPRESSION • EMOTION
//           </span>

//           <h1>
//             Poems & Reflections
//           </h1>

//           <p>
//             Words that explore emotion,
//             consciousness, spirituality
//             and the human experience.
//           </p>

//         </div>

//       </section>

//       <section className="content-section">

//         {loading ? (
//           <LoadingState
//             text="Loading poems..."
//           />
//         ) : error ? (
//           <div className="content-error">
//             {error}
//           </div>
//         ) : (
//           <div className="content-grid">

//             {poems.map(
//               (poem) => (
//                 <ContentCard
//                   key={poem._id}
//                   item={poem}
//                   type="poems"
//                 />
//               )
//             )}

//           </div>
//         )}

//       </section>

//     </main>
//   );
// };

// export default Poems;
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaFeatherAlt,
  FaArrowRight,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaEye,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { getPoems } from "../api/storyApi";

import "./Poems.css";

export default function Poems() {
  const [poems, setPoems] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState({
      pages: 1,
      total: 0,
    });

  const loadPoems = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPoems({
        page,
        limit: 9,
      });

      setPoems(response?.data || []);

      setPagination({
        pages: response?.pages || 1,
        total: response?.total || 0,
      });
    } catch (err) {
      console.error(
        "Failed to load poems:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load poems."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoems();
  }, [page]);

  const filteredPoems = useMemo(() => {
    const value =
      search.trim().toLowerCase();

    if (!value) return poems;

    return poems.filter((poem) => {
      return (
        poem.title
          ?.toLowerCase()
          .includes(value) ||
        poem.excerpt
          ?.toLowerCase()
          .includes(value) ||
        poem.category
          ?.toLowerCase()
          .includes(value) ||
        poem.tags?.some((tag) =>
          tag
            .toLowerCase()
            .includes(value)
        )
      );
    });
  }, [poems, search]);

  return (
    <div className="poems-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="poems-hero">

        <div className="poems-hero-content">

          <span className="poems-eyebrow">
            PROSPER FOUNDATION · POETRY
          </span>

          <div className="poems-feather">
            <FaFeatherAlt />
          </div>

          <h1>
            Where feelings
            <br />
            become <em>poetry.</em>
          </h1>

          <p>
            A collection of poems about
            love, longing, healing, hope,
            spirituality and everything
            that lives quietly within us.
          </p>

          <a
            href="#poem-library"
            className="poems-explore-btn"
          >
            Explore Poetry
            <FaArrowRight />
          </a>

        </div>

      </section>

      {/* =================================================
          QUOTE
      ================================================= */}

      <section className="poems-quote">

        <div className="poems-quote-mark">
          “
        </div>

        <blockquote>
          Sometimes the things we cannot
          say become the words we write.
        </blockquote>

        <span>
          — Prosper Foundation
        </span>

      </section>

      {/* =================================================
          LIBRARY
      ================================================= */}

      <section
        className="poem-library"
        id="poem-library"
      >

        <div className="poems-header">

          <div>
            <span className="section-label">
              POETRY COLLECTION
            </span>

            <h2>
              Read between the lines
            </h2>
          </div>

          <div className="poems-search">

            <FaSearch />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search poems..."
            />

          </div>

        </div>

        {error && (
          <div className="poems-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="poems-loading">
            <div className="poem-spinner" />
            <p>
              Opening the poetry collection...
            </p>
          </div>
        ) : filteredPoems.length ===
          0 ? (
          <div className="poems-empty">

            <FaFeatherAlt />

            <h3>
              No poems found
            </h3>

            <p>
              New poetry will appear here
              soon.
            </p>

          </div>
        ) : (
          <div className="poems-grid">

            {filteredPoems.map(
              (poem) => (
                <article
                  className="poem-card"
                  key={poem._id}
                >

                  <div className="poem-card-top">

                    <FaFeatherAlt />

                    <span>
                      {poem.category ||
                        "Poetry"}
                    </span>

                  </div>

                  <h3>
                    {poem.title}
                  </h3>

                  <div
                    className="poem-excerpt"
                    dangerouslySetInnerHTML={{
                      __html:
                        poem.excerpt ||
                        "A new piece from our poetry collection.",
                    }}
                  />

                  <div className="poem-line" />

                  <div className="poem-meta">

                    <span>
                      {poem.author?.name ||
                        "Prosper Foundation"}
                    </span>

                    <div>

                      <span>
                        <FaEye />
                        {poem.views ||
                          0}
                      </span>

                      <span>
                        <FaHeart />
                        {poem.likes ||
                          0}
                      </span>

                    </div>

                  </div>

                  <Link
                    to={`/poems/${poem.slug}`}
                    className="poem-read-btn"
                  >
                    Read poem
                    <FaArrowRight />
                  </Link>

                </article>
              )
            )}

          </div>
        )}

        {!loading &&
          pagination.pages > 1 && (
            <div className="poems-pagination">

              <button
                disabled={page <= 1}
                onClick={() =>
                  setPage(
                    (p) =>
                      Math.max(
                        1,
                        p - 1
                      )
                  )
                }
              >
                <FaChevronLeft />
              </button>

              <span>
                {page} /{" "}
                {pagination.pages}
              </span>

              <button
                disabled={
                  page >=
                  pagination.pages
                }
                onClick={() =>
                  setPage(
                    (p) =>
                      Math.min(
                        pagination.pages,
                        p + 1
                      )
                  )
                }
              >
                <FaChevronRight />
              </button>

            </div>
          )}

      </section>

    </div>
  );
}