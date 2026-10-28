import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaArrowRight,
  FaBookOpen,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaFeatherAlt,
} from "react-icons/fa";

import {
  getArticles,
} from "../api/articleApi";

import "./Articles.css";

export default function Articles() {
  const [articles, setArticles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getArticles({
          page: 1,
          limit: 20,
          search,
          category:
            activeCategory,
        });

      setArticles(
        response?.data || []
      );
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Unable to load articles."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadArticles();
  };

  return (
    <div className="articles-page">

      {/* HERO */}

      <section className="articles-hero">

        <div className="articles-hero-overlay" />

        <div className="articles-hero-content">

          <div className="articles-eyebrow">
            <FaFeatherAlt />
            INSIGHTS • IDEAS • PERSPECTIVES
          </div>

          <h1>
            Explore Our
            <span> Articles</span>
          </h1>

          <p>
            Thoughtful perspectives,
            meaningful ideas and
            insightful stories created
            to inspire reflection and
            positive change.
          </p>

          <div className="articles-search">

            <form
              onSubmit={
                handleSearch
              }
            >
              <FaSearch />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search articles..."
              />

              <button type="submit">
                Search
              </button>
            </form>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="articles-section">

        <div className="articles-container">

          <div className="articles-section-header">

            <div>
              <span className="section-label">
                OUR JOURNAL
              </span>

              <h2>
                Ideas worth
                <span> exploring</span>
              </h2>
            </div>

          </div>

          {/* FILTER */}

          <div className="article-filters">

            <button
              className={
                !activeCategory
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory("")
              }
            >
              All
            </button>

            <button
              className={
                activeCategory ===
                "Spirituality"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(
                  "Spirituality"
                )
              }
            >
              Spirituality
            </button>

            <button
              className={
                activeCategory ===
                "Psychology"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(
                  "Psychology"
                )
              }
            >
              Psychology
            </button>

            <button
              className={
                activeCategory ===
                "Life"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(
                  "Life"
                )
              }
            >
              Life
            </button>

            <button
              className={
                activeCategory ===
                "Wellness"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(
                  "Wellness"
                )
              }
            >
              Wellness
            </button>

          </div>

          {error && (
            <div className="articles-error">
              {error}
            </div>
          )}

          {loading ? (
            <div className="articles-loader">
              <div />
              <p>
                Loading articles...
              </p>
            </div>
          ) : articles.length ===
            0 ? (
            <div className="articles-empty">
              <FaBookOpen />

              <h3>
                No articles found
              </h3>

              <p>
                Try another search or
                category.
              </p>
            </div>
          ) : (
            <div className="articles-grid">

              {articles.map(
                (article) => (
                  <article
                    className="article-card"
                    key={
                      article._id
                    }
                  >

                    <Link
                      to={`/articles/${article.slug}`}
                      className="article-image-wrap"
                    >

                      {article.coverImage ? (
                        <img
                          src={
                            article.coverImage
                          }
                          alt={
                            article.title
                          }
                        />
                      ) : (
                        <div className="article-image-placeholder">
                          <FaBookOpen />
                        </div>
                      )}

                      {article.category && (
                        <span className="article-category">
                          {
                            article.category
                          }
                        </span>
                      )}

                    </Link>

                    <div className="article-card-body">

                      <div className="article-meta">

                        <span>
                          <FaCalendarAlt />
                          {new Date(
                            article.publishedAt ||
                              article.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>

                        <span>
                          <FaClock />
                          {Math.max(
                            1,
                            Math.ceil(
                              (
                                article.content
                                  ?.replace(
                                    /<[^>]*>/g,
                                    " "
                                  )
                                  .trim()
                                  .split(
                                    /\s+/
                                  ).length ||
                                0
                              ) / 200
                            )
                          )}{" "}
                          min
                        </span>

                      </div>

                      <h3>
                        {article.title}
                      </h3>

                      <p>
                        {article.excerpt ||
                          "Explore this thoughtful article from Prosper Foundation."}
                      </p>

                      <Link
                        to={`/articles/${article.slug}`}
                        className="article-read-more"
                      >
                        Read Article
                        <FaArrowRight />
                      </Link>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </div>

      </section>

    </div>
  );
}