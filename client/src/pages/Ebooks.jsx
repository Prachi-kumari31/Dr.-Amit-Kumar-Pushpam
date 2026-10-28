import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaFilter,
  FaBookOpen,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
  FaFilePdf,
} from "react-icons/fa";

import { getAllEbooks } from "../api/ebookApi";

import "./Ebooks.css";

const CATEGORIES = [
  "All",
  "Astrology",
  "Psychology",
  "Spiritual",
  "Paranormal",
  "Self-Help",
];

const ITEMS_PER_PAGE = 8;

const Ebooks = () => {
  const [ebooks, setEbooks] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("-createdAt");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  =========================================================
  FETCH EBOOKS
  =========================================================
  */

  useEffect(() => {
    let mounted = true;

    const fetchEbooks = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          sort: sortBy,
        };

        if (selectedCategory) {
          params.category = selectedCategory;
        }

        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }

        const response =
          await getAllEbooks(params);

        if (!mounted) return;

        const data = Array.isArray(
          response?.data
        )
          ? response.data
          : [];

        setEbooks(data);

        setTotalPages(
          Number(
            response?.pagination?.pages
          ) || 1
        );
      } catch (err) {
        if (!mounted) return;

        console.error(
          "Failed to load ebooks:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Unable to load ebooks. Please try again."
        );

        setEbooks([]);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchEbooks();

    return () => {
      mounted = false;
    };
  }, [
    selectedCategory,
    searchTerm,
    sortBy,
    currentPage,
  ]);

  /*
  =========================================================
  HELPERS
  =========================================================
  */

  const getCover = (ebook) => {
    if (!ebook) return "";

    return (
      ebook.cover ||
      ebook.coverImage ||
      ebook.thumbnail ||
      ""
    );
  };

  const getFileFormat = (ebook) => {
    if (!ebook) return "PDF";

    return (
      ebook.fileFormat ||
      ebook.format ||
      "PDF"
    );
  };

  const getPriceLabel = (ebook) => {
    const price = Number(
      ebook?.price ?? 0
    );

    return price <= 0
      ? "FREE"
      : `₹${price}`;
  };

  /*
  =========================================================
  CATEGORY
  =========================================================
  */

  const handleCategoryChange = (
    value
  ) => {
    setCurrentPage(1);
    setSelectedCategory(
      value === "All" ? "" : value
    );
  };

  /*
  =========================================================
  SEARCH
  =========================================================
  */

  const handleSearchChange = (
    event
  ) => {
    setCurrentPage(1);
    setSearchTerm(
      event.target.value
    );
  };

  /*
  =========================================================
  PAGE CHANGE
  =========================================================
  */

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  =========================================================
  PAGE NUMBERS
  =========================================================
  */

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div className="ebooks-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="ebooks-hero">

        <div className="ebooks-hero-glow ebooks-glow-one" />
        <div className="ebooks-hero-glow ebooks-glow-two" />

        <div className="ebooks-container ebooks-hero-content">

          <div className="ebooks-hero-text">

            <span className="ebooks-eyebrow">
              {/* PROSPER FOUNDATION */}
              <span className="eyebrow-dot" />
              DIGITAL LIBRARY
            </span>

            <h1>
              Knowledge that
              <span> inspires.</span>
            </h1>

            <p>
              Explore our thoughtfully curated
              collection of ebooks covering
              astrology, psychology, spirituality,
              personal growth and more.
            </p>

            <div className="ebooks-hero-stats">

              <div className="hero-stat">
                <strong>
                  {ebooks.length}
                </strong>

                <span>
                  Books available
                </span>
              </div>

              <div className="hero-stat-divider" />

              <div className="hero-stat">
                <strong>
                  {CATEGORIES.length - 1}
                </strong>

                <span>
                  Knowledge areas
                </span>
              </div>

              <div className="hero-stat-divider" />

              <div className="hero-stat">
                <strong>
                  100%
                </strong>

                <span>
                  Digital access
                </span>
              </div>

            </div>

          </div>

          <div className="ebooks-hero-visual">

            <div className="hero-book-decoration hero-book-back">
              <FaBookOpen />
            </div>

            <div className="hero-book-decoration hero-book-main">
              <FaBookOpen />
              <span>READ</span>
            </div>

            <div className="hero-floating-card">
              <FaBookOpen />

              <div>
                <strong>
                  Read. Reflect.
                </strong>

                <span>
                  Grow with knowledge.
                </span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <section className="ebooks-toolbar-section">

        <div className="ebooks-container">

          <div className="ebooks-toolbar">

            <div className="ebooks-search">

              <FaSearch />

              <input
                type="search"
                value={searchTerm}
                onChange={
                  handleSearchChange
                }
                placeholder="Search by title, author or topic..."
                aria-label="Search ebooks"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() =>
                    setSearchTerm("")
                  }
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>


            <div className="ebooks-filter">

              <div className="ebook-filter-control">

                <FaFilter />

                <select
                  value={
                    selectedCategory ||
                    "All"
                  }
                  onChange={(event) =>
                    handleCategoryChange(
                      event.target.value
                    )
                  }
                  aria-label="Filter by category"
                >

                  {CATEGORIES.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div className="ebook-filter-control sort-control">

                <select
                  value={sortBy}
                  onChange={(event) => {
                    setCurrentPage(1);

                    setSortBy(
                      event.target.value
                    );
                  }}
                  aria-label="Sort ebooks"
                >

                  <option value="-createdAt">
                    Newest
                  </option>

                  <option value="title">
                    Title A–Z
                  </option>

                  <option value="price">
                    Price: Low to High
                  </option>

                  <option value="-price">
                    Price: High to Low
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          COLLECTION
      ================================================= */}

      <main className="ebooks-main">

        <div className="ebooks-container">

          <div className="ebooks-section-header">

            <div>

              <span className="section-kicker">
                EXPLORE THE COLLECTION
              </span>

              <h2>
                Featured Knowledge
              </h2>

            </div>

            <div className="collection-count">
              <strong>
                {ebooks.length}
              </strong>

              <span>
                books
              </span>
            </div>

          </div>


          {/* ERROR */}

          {error && (
            <div className="ebooks-error">

              <FaBookOpen />

              <div>
                <strong>
                  Something went wrong
                </strong>

                <p>
                  {error}
                </p>
              </div>

            </div>
          )}


          {/* LOADING */}

          {loading ? (

            <div className="ebooks-grid">

              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  className="ebook-skeleton-card"
                  key={index}
                >

                  <div className="skeleton-cover" />

                  <div className="skeleton-content">

                    <span />

                    <span />

                    <span />

                    <span />

                  </div>

                </div>
              ))}

            </div>

          ) : ebooks.length === 0 ? (

            <div className="ebooks-empty">

              <div className="empty-icon">
                <FaBookOpen />
              </div>

              <h3>
                No ebooks found
              </h3>

              <p>
                Try another search term
                or choose a different
                category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setCurrentPage(1);
                }}
              >
                View all books
              </button>

            </div>

          ) : (

            <div className="ebooks-grid">

              {ebooks.map((ebook) => {

                const cover =
                  getCover(ebook);

                const isFree =
                  Number(
                    ebook.price ?? 0
                  ) <= 0;

                const fileFormat =
                  getFileFormat(
                    ebook
                  );

                return (

                  <article
                    className="ebook-card"
                    key={ebook._id}
                  >

                    {/* COVER */}

                    <Link
                      to={`/ebook/${encodeURIComponent(
                        ebook.slug
                      )}`}
                      className="ebook-cover"
                      aria-label={`Read ${ebook.title}`}
                    >

                      {cover ? (

                        <img
                          src={cover}
                          alt={ebook.title}
                          loading="lazy"
                        />

                      ) : (

                        <div className="ebook-cover-placeholder">

                          <FaBookOpen />

                          <span>
                            Prosper
                            Foundation
                          </span>

                        </div>

                      )}


                      <div className="cover-overlay">

                        <div className="read-overlay-button">

                          <FaBookOpen />

                          <span>
                            Read Ebook
                          </span>

                        </div>

                      </div>


                      {isFree && (
                        <span className="free-badge">
                          FREE
                        </span>
                      )}


                      {ebook.isFeatured && (
                        <span className="featured-badge">
                          Featured
                        </span>
                      )}

                    </Link>


                    {/* CONTENT */}

                    <div className="ebook-card-content">

                      <div className="ebook-card-top">

                        <span className="ebook-category">
                          {ebook.category ||
                            "Knowledge"}
                        </span>

                        {isFree && (
                          <span className="free-label">
                            Free Access
                          </span>
                        )}

                      </div>


                      <h3>

                        <Link
                          to={`/ebook/${encodeURIComponent(
                            ebook.slug
                          )}`}
                        >
                          {ebook.title}
                        </Link>

                      </h3>


                      <p className="ebook-author">
                        By{" "}
                        <strong>
                          {ebook.author ||
                            "Prosper Foundation"}
                        </strong>
                      </p>


                      <p className="ebook-description">

                        {ebook.excerpt ||
                          ebook.description ||
                          "Explore meaningful ideas, insights and knowledge through this digital publication."}

                      </p>


                      {/* META */}

                      <div className="ebook-meta">

                        {ebook.pages && (
                          <span>
                            <FaBookOpen />
                            {ebook.pages} pages
                          </span>
                        )}

                        {ebook.language && (
                          <span>
                            <FaGlobe />
                            {ebook.language}
                          </span>
                        )}

                        <span>
                          <FaFilePdf />
                          {fileFormat}
                        </span>

                      </div>


                      {/* FOOTER */}

                      <div className="ebook-card-footer">

                        <div className="ebook-access">

                          <strong
                            className={
                              isFree
                                ? "free-price"
                                : ""
                            }
                          >
                            {getPriceLabel(
                              ebook
                            )}
                          </strong>

                        </div>


                        <Link
                          to={`/ebook/${encodeURIComponent(
                            ebook.slug
                          )}`}
                          className="read-ebook-button"
                        >

                          <span>
                            Read
                          </span>

                          <FaArrowRight />

                        </Link>

                      </div>

                    </div>

                  </article>

                );
              })}

            </div>

          )}


          {/* =================================================
              PAGINATION
          ================================================= */}

          {!loading &&
            totalPages > 1 && (

              <nav
                className="ebooks-pagination"
                aria-label="Ebook pagination"
              >

                <button
                  type="button"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    goToPage(
                      currentPage - 1
                    )
                  }
                  aria-label="Previous page"
                >
                  <FaChevronLeft />
                </button>


                <div className="pagination-pages">

                  {pageNumbers.map(
                    (page) => (

                      <button
                        type="button"
                        key={page}
                        className={
                          currentPage ===
                          page
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          goToPage(page)
                        }
                      >
                        {page}
                      </button>

                    )
                  )}

                </div>


                <button
                  type="button"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    goToPage(
                      currentPage + 1
                    )
                  }
                  aria-label="Next page"
                >
                  <FaChevronRight />
                </button>

              </nav>

            )}

        </div>

      </main>

    </div>
  );
};

export default Ebooks;