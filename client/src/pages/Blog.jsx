
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Search,
  Clock3,
  Eye,
  CalendarDays,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import { getBlogs } from "../api/contentApi";

import "./Blog.css";

const CATEGORIES = [
  "All",
  "Astrology",
  "Psychology",
  "Spiritual",
  "Paranormal",
  "Research",
];

const getImage = (blog) => {
  return blog?.image || blog?.coverImage || "";
};

const getAuthorName = (blog) => {
  return (
    blog?.author?.name ||
    blog?.author?.fullName ||
    blog?.author?.username ||
    "Prosper Foundation"
  );
};

const formatDate = (date) => {
  if (!date) return "Recently";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Recently";
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getSlug = (blog) => {
  if (blog?.slug) return blog.slug;

  return (blog?.title || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const stripHtml = (html = "") => {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const truncate = (text = "", length = 145) => {
  const clean = stripHtml(text);

  if (clean.length <= length) {
    return clean;
  }

  return `${clean.substring(0, length).trim()}…`;
};

export default function Blog() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [blogs, setBlogs] = useState([]);

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [page, setPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1,
    currentPage: 1,
    limit: 9,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: 9,
      };

      if (category !== "All") {
        params.category = category;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      console.log(
        "Fetching public blogs:",
        params
      );

      const response = await getBlogs(params);

      console.log(
        "PUBLIC BLOG RESPONSE:",
        response
      );

      const blogData = Array.isArray(
        response?.data
      )
        ? response.data
        : [];

      setBlogs(blogData);

      setPagination(
        response?.pagination || {
          total: blogData.length,
          pages: 1,
          currentPage: page,
          limit: 9,
        }
      );
    } catch (err) {
      console.error(
        "PUBLIC BLOG FETCH ERROR:",
        err
      );

      setBlogs([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  }, [page, category, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (category !== "All") {
      params.category = category;
    }

    if (page > 1) {
      params.page = page;
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    search,
    category,
    page,
    setSearchParams,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <main className="blog-page">

      {/* HERO */}
      <section className="blog-hero">

        <div className="blog-hero-glow" />

        <div className="blog-container">

          <div className="blog-hero-content">

            <span className="blog-eyebrow">
              {/* PROSPER FOUNDATION JOURNAL */}
              BLOGS
            </span>

            <h1>
              Ideas that inspire
              <span> reflection.</span>
            </h1>

            <p>
              Explore thoughtful perspectives on
              psychology, spirituality, astrology,
              consciousness and personal growth.
            </p>

          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="blog-content-section">

        <div className="blog-container">

          {/* TOOLBAR */}
          <div className="blog-toolbar">

            <form
              className="blog-search"
              onSubmit={handleSearch}
            >

              <Search size={18} />

              <input
                type="search"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(
                    e.target.value
                  )
                }
              />

              {searchInput && (
                <button
                  type="button"
                  className="blog-search-clear"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setPage(1);
                  }}
                >
                  ×
                </button>
              )}

            </form>

            <div className="blog-results">
              {pagination.total}{" "}
              {pagination.total === 1
                ? "article"
                : "articles"}
            </div>

          </div>

          {/* CATEGORIES */}
          <div className="blog-category-bar">

            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategory(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          {/* ERROR */}
          {error && !loading && (
            <div className="blog-error">

              <div>
                <h3>
                  We couldn't load the journal
                </h3>

                <p>{error}</p>
              </div>

              <button
                type="button"
                onClick={fetchBlogs}
              >
                <RefreshCw size={16} />
                Try again
              </button>

            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="blog-grid">

              {Array.from({
                length: 6,
              }).map((_, index) => (
                <article
                  className="blog-skeleton-card"
                  key={index}
                >
                  <div className="blog-skeleton-image" />

                  <div className="blog-skeleton-body">
                    <div className="skeleton-line small" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line medium" />
                    <div className="skeleton-line text" />
                    <div className="skeleton-line text short" />
                  </div>
                </article>
              ))}

            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            blogs.length === 0 && (
              <div className="blog-empty">

                <div className="blog-empty-icon">
                  <Search size={25} />
                </div>

                <span>
                  JOURNAL
                </span>

                <h2>
                  No articles found
                </h2>

                <p>
                  Try another search term or
                  choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setCategory("All");
                    setPage(1);
                  }}
                >
                  View all articles
                </button>

              </div>
            )}

          {/* BLOGS */}
          {!loading &&
            !error &&
            blogs.length > 0 && (
              <div className="blog-grid">

                {blogs.map((blog) => {

                  const image =
                    getImage(blog);

                  const slug =
                    getSlug(blog);

                  return (
                    <article
                      className="blog-card"
                      key={blog._id}
                    >

                      {/* IMAGE */}
                      <Link
                        to={`/blogs/${slug}`}
                        className="blog-card-image"
                      >

                        {image ? (
                          <img
                            src={image}
                            alt={blog.title}
                            loading="lazy"
                          />
                        ) : (
                          <div className="blog-image-placeholder">
                            <span>
                              PROSPER
                            </span>
                          </div>
                        )}

                        <div className="blog-card-image-overlay">
                          Read article
                          <ArrowRight size={15} />
                        </div>

                        <span className="blog-card-category">
                          {blog.category}
                        </span>

                      </Link>

                      {/* BODY */}
                      <div className="blog-card-body">

                        <div className="blog-card-meta">

                          <span>
                            <CalendarDays size={14} />
                            {formatDate(
                              blog.publishedAt ||
                                blog.createdAt
                            )}
                          </span>

                          <span>
                            <Clock3 size={14} />
                            {blog.readTime ||
                              5}{" "}
                            min
                          </span>

                        </div>

                        <h2>

                          <Link
                            to={`/blogs/${slug}`}
                          >
                            {blog.title}
                          </Link>

                        </h2>

                        <p>
                          {blog.excerpt ||
                            truncate(
                              blog.content
                            )}
                        </p>

                        <div className="blog-card-footer">

                          <span className="blog-author">
                            {getAuthorName(
                              blog
                            )}
                          </span>

                          <span className="blog-views">
                            <Eye size={14} />
                            {(
                              blog.views || 0
                            ).toLocaleString()}
                          </span>

                          <Link
                            to={`/blogs/${slug}`}
                            className="blog-read-more"
                          >
                            Explore
                            <ArrowRight
                              size={15}
                            />
                          </Link>

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

          {/* PAGINATION */}
          {!loading &&
            pagination.pages > 1 && (
              <div className="blog-pagination">

                {Array.from({
                  length:
                    pagination.pages,
                }).map((_, index) => {

                  const pageNumber =
                    index + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      className={
                        page === pageNumber
                          ? "active"
                          : ""
                      }
                      onClick={() => {
                        setPage(
                          pageNumber
                        );

                        window.scrollTo({
                          top: 400,
                          behavior:
                            "smooth",
                        });
                      }}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

              </div>
            )}

        </div>
      </section>

    </main>
  );
}