// import React, {
//   useEffect,
//   useState,
// } from "react";

// import ContentCard from "../components/ContentCard";
// import LoadingState from "../components/LoadingState";

// import { apiFetch } from "../utils/api";

// import "../styles/ContentPages.css";

// const Stories = () => {
//   const [stories, setStories] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   useEffect(() => {
//     const loadStories =
//       async () => {
//         try {
//           const response =
//             await apiFetch(
//               "/stories"
//             );

//           setStories(
//             response?.data || []
//           );
//         } catch (err) {
//           setError(
//             err.message ||
//               "Unable to load stories."
//           );
//         } finally {
//           setLoading(false);
//         }
//       };

//     loadStories();
//   }, []);

//   return (
//     <main className="content-page">

//       <section className="content-hero stories-hero">

//         <div className="content-hero-overlay" />

//         <div className="content-hero-content">

//           <span className="content-eyebrow">
//             STORIES • HUMAN EXPERIENCE
//           </span>

//           <h1>
//             Stories That Inspire
//           </h1>

//           <p>
//             Explore meaningful stories,
//             experiences and reflections
//             that encourage awareness
//             and personal growth.
//           </p>

//         </div>

//       </section>

//       <section className="content-section">

//         {loading ? (
//           <LoadingState
//             text="Loading stories..."
//           />
//         ) : error ? (
//           <div className="content-error">
//             {error}
//           </div>
//         ) : (
//           <div className="content-grid">

//             {stories.map(
//               (story) => (
//                 <ContentCard
//                   key={story._id}
//                   item={story}
//                   type="stories"
//                 />
//               )
//             )}

//           </div>
//         )}

//       </section>

//     </main>
//   );
// };

// export default Stories;


import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaBookOpen,
  FaArrowRight,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaEye,
  FaHeart,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { getStories } from "../api/storyApi";

import "./Stories.css";

export default function Stories() {
  const [stories, setStories] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState({
      total: 0,
      pages: 1,
    });

  const loadStories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getStories({
        page,
        limit: 9,
      });

      setStories(response?.data || []);

      setPagination({
        total: response?.total || 0,
        pages: response?.pages || 1,
      });
    } catch (err) {
      console.error(
        "Failed to load stories:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load stories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, [page]);

  const filteredStories =
  useMemo(() => {

    const safeStories =
      Array.isArray(stories)
        ? stories
        : [];

    return safeStories.filter(
      (story) => {

        const title =
          String(
            story?.title || ""
          ).toLowerCase();

        const excerpt =
          String(
            story?.excerpt || ""
          ).toLowerCase();

        const searchValue =
          search
            .trim()
            .toLowerCase();

        return (
          !searchValue ||
          title.includes(
            searchValue
          ) ||
          excerpt.includes(
            searchValue
          )
        );
      }
    );

  }, [
    stories,
    search,
  ]);

  useEffect(() => {
  let mounted = true;

 const fetchStories = async () => {
  try {
    setLoading(true);
    setError("");

    const data =
      await getStories({
        page: 1,
        limit: 50,
      });

    setStories(
      Array.isArray(data)
        ? data
        : []
    );

  } catch (error) {

    console.error(
      "Fetch stories error:",
      error
    );

    setStories([]);

    setError(
      error?.response?.data?.message ||
      error?.message ||
      "Unable to load stories."
    );

  } finally {
    setLoading(false);
  }
};

  fetchStories();

  return () => {
    mounted = false;
  };
}, []);
  return (
    <div className="stories-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="stories-hero">

        <div className="stories-hero-overlay" />

        <div className="stories-hero-content">

          <span className="stories-eyebrow">
              LITERARY SPACE
          </span>

          <h1>
            Stories that
            <span> stay with you.</span>
          </h1>

          <p>
            Explore thoughtful stories about
            life, emotions, relationships,
            spirituality and the human
            experience.
          </p>

          <div className="stories-hero-actions">

            <a
              href="#stories-library"
              className="stories-primary-btn"
            >
              Explore Stories
              <FaArrowRight />
            </a>

            <Link
              to="/poems"
              className="stories-secondary-btn"
            >
              Read Poems
            </Link>

          </div>

        </div>

      </section>

      {/* =================================================
          INTRO
      ================================================= */}

      <section className="stories-intro">

        <div className="stories-intro-icon">
          <FaBookOpen />
        </div>

        <div>
          <span className="section-label">
            THE STORY COLLECTION
          </span>

          <h2>
            Words that give
            <em> meaning to moments.</em>
          </h2>

          <p>
            Every story carries a perspective,
            a question, a memory or a lesson.
            Take your time, explore the
            collection and discover something
            that speaks to you.
          </p>
        </div>

      </section>

      {/* =================================================
          LIBRARY
      ================================================= */}

      <section
        className="stories-library"
        id="stories-library"
      >

        <div className="stories-section-header">

          <div>
            <span className="section-label">
              LATEST STORIES
            </span>

            <h2>
              From our editorial desk
            </h2>
          </div>

          <div className="stories-search">

            <FaSearch />

            <input
              type="text"
              placeholder="Search stories..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {error && (
          <div className="stories-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="stories-loading">

            <div className="story-spinner" />

            <p>
              Loading stories...
            </p>

          </div>
        ) : filteredStories.length ===
          0 ? (
          <div className="stories-empty">

            <FaBookOpen />

            <h3>
              No stories found
            </h3>

            <p>
              Try another search or check
              back soon for new stories.
            </p>

          </div>
        ) : (
          <div className="stories-grid">

            {filteredStories.map(
              (story) => (
                <article
                  className="story-card"
                  key={story._id}
                >

                  <div className="story-card-image">

                    {story.coverImage ? (
                      <img
                        src={
                          story.coverImage
                        }
                        alt={story.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="story-image-placeholder">
                        <FaBookOpen />
                      </div>
                    )}

                    <span>
                      {story.category ||
                        "Story"}
                    </span>

                  </div>

                  <div className="story-card-body">

                    <div className="story-card-meta">

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

                    <h3>
                      {story.title}
                    </h3>

                    <p>
                      {story.excerpt ||
                        "Discover this thoughtful story from the Prosper Foundation collection."}
                    </p>

                    <div className="story-card-footer">

                      <span className="story-author">
                        {story.author?.name ||
                          "Prosper Foundation"}
                      </span>

                      <Link
                        to={`/stories/${story.slug}`}
                        className="story-read-btn"
                      >
                        Read
                        <FaArrowRight />
                      </Link>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        )}

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          pagination.pages > 1 && (
            <div className="stories-pagination">

              <button
                disabled={page <= 1}
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.max(
                        1,
                        current - 1
                      )
                  )
                }
              >
                <FaChevronLeft />
              </button>

              <span>
                Page {page} of{" "}
                {pagination.pages}
              </span>

              <button
                disabled={
                  page >=
                  pagination.pages
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.min(
                        pagination.pages,
                        current + 1
                      )
                  )
                }
              >
                <FaChevronRight />
              </button>

            </div>
          )}

      </section>

      {/* =================================================
          CTA
      ================================================= */}

      <section className="stories-cta">

        <div>

          <span className="section-label">
            KEEP EXPLORING
          </span>

          <h2>
            Looking for something
            more lyrical?
          </h2>

          <p>
            Step into our poetry collection
            and discover emotions expressed
            through rhythm and words.
          </p>

          <Link
            to="/poems"
            className="stories-primary-btn"
          >
            Explore Poems
            <FaArrowRight />
          </Link>

        </div>

      </section>

    </div>
  );
}