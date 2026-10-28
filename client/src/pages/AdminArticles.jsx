import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaUndo,
  FaSearch,
  FaFileAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

import {
  getAdminArticles,
  publishArticle,
  unpublishArticle,
  deleteArticle,
} from "../api/articleApi";
import AdminLayout from "../components/AdminLayout";

import "./AdminArticles.css";

export default function AdminArticles() {
  const navigate =
    useNavigate();

  const [articles, setArticles] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [error, setError] =
    useState("");

  const loadArticles = async () => {
    try {
      setLoading(true);

      const response =
        await getAdminArticles({
          search,
          status,
          page: 1,
          limit: 100,
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
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    loadArticles();
  };

  const handlePublish = async (
    id
  ) => {
    if (
      !window.confirm(
        "Publish this article?"
      )
    ) {
      return;
    }

    try {
      await publishArticle(id);
      loadArticles();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Unable to publish article."
      );
    }
  };

  const handleUnpublish = async (
    id
  ) => {
    if (
      !window.confirm(
        "Move this article back to draft?"
      )
    ) {
      return;
    }

    try {
      await unpublishArticle(
        id
      );

      loadArticles();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Unable to unpublish article."
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this article permanently?"
      )
    ) {
      return;
    }

    try {
      await deleteArticle(id);
      loadArticles();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Unable to delete article."
      );
    }
  };

  return (
    // < AdminLayout>
    <div className="admin-articles-page">

      <header className="admin-articles-header">

        <div>
          <span>
            CONTENT MANAGEMENT
          </span>

          <h1>
            Articles
          </h1>

          <p>
            Create, edit and manage
            your published articles.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/articles/new"
            )
          }
        >
          <FaPlus />
          New Article
        </button>

      </header>

      {/* CONTROLS */}

      <section className="admin-article-controls">

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

          <button>
            Search
          </button>
        </form>

        <div className="admin-status-tabs">

          <button
            className={
              !status
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus("")
            }
          >
            All
          </button>

          <button
            className={
              status === "published"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus(
                "published"
              )
            }
          >
            Published
          </button>

          <button
            className={
              status === "draft"
                ? "active"
                : ""
            }
            onClick={() =>
              setStatus("draft")
            }
          >
            Drafts
          </button>

        </div>

      </section>

      {error && (
        <div className="admin-article-error">
          {error}
        </div>
      )}

      {/* TABLE */}

      <section className="admin-articles-table-wrap">

        {loading ? (
          <div className="admin-articles-loading">
            Loading articles...
          </div>
        ) : articles.length ===
          0 ? (
          <div className="admin-articles-empty">
            <FaFileAlt />

            <h3>
              No articles found
            </h3>

            <p>
              Create your first
              article.
            </p>

            <Link to="/admin/articles/new">
              Create Article
            </Link>
          </div>
        ) : (
          <div className="admin-articles-table">

            <div className="admin-table-head">
              <span>ARTICLE</span>
              <span>STATUS</span>
              <span>VIEWS</span>
              <span>UPDATED</span>
              <span>ACTIONS</span>
            </div>

            {articles.map(
              (article) => (
                <div
                  className="admin-table-row"
                  key={
                    article._id
                  }
                >

                  <div className="admin-article-info">

                    {article.coverImage ? (
                      <img
                        src={
                          article.coverImage
                        }
                        alt=""
                      />
                    ) : (
                      <div className="admin-article-placeholder">
                        <FaFileAlt />
                      </div>
                    )}

                    <div>
                      <h3>
                        {
                          article.title
                        }
                      </h3>

                      <p>
                        {
                          article.category ||
                          "Uncategorized"
                        }
                      </p>
                    </div>

                  </div>

                  <div>
                    <span
                      className={`admin-status ${article.status}`}
                    >
                      {article.status ===
                      "published" ? (
                        <>
                          <FaGlobe />
                          Published
                        </>
                      ) : (
                        <>
                          <FaClock />
                          Draft
                        </>
                      )}
                    </span>
                  </div>

                  <div className="admin-number">
                    <FaEye />
                    {article.views ||
                      0}
                  </div>

                  <div className="admin-date">
                    {new Date(
                      article.updatedAt ||
                        article.createdAt
                    ).toLocaleDateString(
                      "en-IN"
                    )}
                  </div>

                  <div className="admin-actions">

                    <button
                      title="Edit"
                      onClick={() =>
                        navigate(
                          `/admin/articles/edit/${article._id}`
                        )
                      }
                    >
                      <FaEdit />
                    </button>

                    {article.status ===
                    "published" ? (
                      <button
                        title="Unpublish"
                        onClick={() =>
                          handleUnpublish(
                            article._id
                          )
                        }
                      >
                        <FaUndo />
                      </button>
                    ) : (
                      <button
                        title="Publish"
                        className="publish"
                        onClick={() =>
                          handlePublish(
                            article._id
                          )
                        }
                      >
                        <FaCheck />
                      </button>
                    )}

                    <button
                      title="Delete"
                      className="delete"
                      onClick={() =>
                        handleDelete(
                          article._id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </section>

    </div>
    
  );
}