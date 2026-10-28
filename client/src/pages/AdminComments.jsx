import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaCheck,
  FaTimes,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSyncAlt,
  FaCommentAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaComments,
  FaExclamationTriangle,
} from "react-icons/fa";

import AdminLayout from "../components/AdminLayout";
import { apiFetch } from "../utils/api";

import "./AdminComments.css";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("all");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(null);

  const [error, setError] = useState("");

  /*
  |--------------------------------------------------------------------------
  | FETCH COMMENTS
  |--------------------------------------------------------------------------
  */

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiFetch(
        "/comments/admin/all"
      );

      const data = Array.isArray(response?.data)
        ? response.data
        : [];

      const formattedComments = data.map(
        (comment) => ({
          id: comment._id,

          author:
            comment.author?.name ||
            comment.author?.username ||
            comment.name ||
            "Guest User",

          email:
            comment.author?.email || "",

          blog:
            comment.contentInfo?.title ||
            "Unknown Blog",

          contentType:
            comment.contentType || "Blog",

          comment:
            comment.text || "",

          status:
            comment.status || "pending",

          date: comment.createdAt
            ? new Date(
                comment.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : "",

          time: comment.createdAt
            ? new Date(
                comment.createdAt
              ).toLocaleTimeString(
                "en-IN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )
            : "",
        })
      );

      setComments(formattedComments);
    } catch (err) {
      console.error(
        "Fetch comments error:",
        err
      );

      setError(
        err?.message ||
          "Unable to load comments."
      );

      setComments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  /*
  |--------------------------------------------------------------------------
  | APPROVE
  |--------------------------------------------------------------------------
  */

  const handleApprove = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      await apiFetch(
        `/comments/admin/${id}/approve`,
        {
          method: "PUT",
        }
      );

      await fetchComments();
    } catch (err) {
      console.error(
        "Approve comment error:",
        err
      );

      setError(
        err?.message ||
          "Unable to approve comment."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REJECT
  |--------------------------------------------------------------------------
  */

  const handleReject = async (id) => {
    try {
      setActionLoading(id);
      setError("");

      await apiFetch(
        `/comments/admin/${id}/reject`,
        {
          method: "PUT",
        }
      );

      await fetchComments();
    } catch (err) {
      console.error(
        "Reject comment error:",
        err
      );

      setError(
        err?.message ||
          "Unable to reject comment."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(id);
      setError("");

      await apiFetch(
        `/comments/admin/${id}`,
        {
          method: "DELETE",
        }
      );

      await fetchComments();
    } catch (err) {
      console.error(
        "Delete comment error:",
        err
      );

      setError(
        err?.message ||
          "Unable to delete comment."
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FILTER COMMENTS
  |--------------------------------------------------------------------------
  */

  const filteredComments = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return comments.filter(
      (comment) => {
        const matchesSearch =
          !search ||
          comment.author
            .toLowerCase()
            .includes(search) ||
          comment.blog
            .toLowerCase()
            .includes(search) ||
          comment.comment
            .toLowerCase()
            .includes(search);

        const matchesFilter =
          filterStatus === "all" ||
          comment.status ===
            filterStatus;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );
  }, [
    comments,
    searchTerm,
    filterStatus,
  ]);

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const totalCount = comments.length;

  const pendingCount =
    comments.filter(
      (comment) =>
        comment.status === "pending"
    ).length;

  const approvedCount =
    comments.filter(
      (comment) =>
        comment.status === "approved"
    ).length;

  const rejectedCount =
    comments.filter(
      (comment) =>
        comment.status === "rejected"
    ).length;

  /*
  |--------------------------------------------------------------------------
  | STATUS ICON
  |--------------------------------------------------------------------------
  */

  const getStatusIcon = (status) => {
    if (status === "approved") {
      return <FaCheckCircle />;
    }

    if (status === "rejected") {
      return <FaTimesCircle />;
    }

    return <FaClock />;
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
      <div className="admin-comments">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="comments-page-header">
          <div className="comments-heading">
            <div className="comments-eyebrow">
              COMMUNITY MANAGEMENT
            </div>

            <h2>
              Manage Comments
            </h2>

            <p>
              Review, moderate and manage
              comments submitted by your
              community.
            </p>
          </div>

          <button
            type="button"
            className="comments-refresh-btn"
            onClick={fetchComments}
            disabled={loading}
          >
            <FaSyncAlt
              className={
                loading
                  ? "refresh-spin"
                  : ""
              }
            />

            {loading
              ? "Refreshing..."
              : "Refresh"}
          </button>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="comments-error">
            <FaExclamationTriangle />

            <span>
              <strong>
                Something went wrong:
              </strong>{" "}
              {error}
            </span>

            <button
              type="button"
              onClick={fetchComments}
            >
              Try Again
            </button>
          </div>
        )}

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="comments-stats">
          <div className="comment-stat-card">
            <div className="comment-stat-icon total">
              <FaComments />
            </div>

            <div>
              <span>Total Comments</span>
              <strong>
                {totalCount}
              </strong>
            </div>
          </div>

          <div className="comment-stat-card">
            <div className="comment-stat-icon pending">
              <FaClock />
            </div>

            <div>
              <span>Pending Review</span>
              <strong>
                {pendingCount}
              </strong>
            </div>
          </div>

          <div className="comment-stat-card">
            <div className="comment-stat-icon approved">
              <FaCheckCircle />
            </div>

            <div>
              <span>Approved</span>
              <strong>
                {approvedCount}
              </strong>
            </div>
          </div>

          <div className="comment-stat-card">
            <div className="comment-stat-icon rejected">
              <FaTimesCircle />
            </div>

            <div>
              <span>Rejected</span>
              <strong>
                {rejectedCount}
              </strong>
            </div>
          </div>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="comments-filters">
          <div className="comments-search">
            <FaSearch />

            <input
              type="text"
              placeholder="Search by name, blog or comment..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />
          </div>

          <div className="comments-filter-select">
            <FaFilter />

            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value
                )
              }
            >
              <option value="all">
                All Comments
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>

          <div className="comments-result-count">
            Showing{" "}
            <strong>
              {filteredComments.length}
            </strong>{" "}
            of{" "}
            <strong>
              {comments.length}
            </strong>
          </div>
        </div>

        {/* =====================================================
            COMMENTS
        ===================================================== */}

        <div className="comments-container">
          {loading ? (
            <div className="comments-loading">
              <div className="loading-spinner" />

              <h3>
                Loading comments...
              </h3>

              <p>
                Please wait while we fetch
                community comments.
              </p>
            </div>
          ) : filteredComments.length >
            0 ? (
            filteredComments.map(
              (comment) => (
                <div
                  key={comment.id}
                  className={`comment-card ${comment.status}`}
                >
                  {/* CARD HEADER */}

                  <div className="comment-card-top">
                    <div className="comment-author-info">
                      <div className="author-avatar">
                        {comment.author
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="author-details">
                        <h3>
                          {comment.author}
                        </h3>

                        {comment.email && (
                          <p className="author-email">
                            {comment.email}
                          </p>
                        )}

                        <p className="blog-reference">
                          On{" "}
                          <strong>
                            {comment.blog}
                          </strong>
                        </p>

                        <p className="comment-date">
                          {comment.date}
                          {comment.time &&
                            ` • ${comment.time}`}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`status-badge ${comment.status}`}
                    >
                      {getStatusIcon(
                        comment.status
                      )}

                      {comment.status
                        .charAt(0)
                        .toUpperCase() +
                        comment.status.slice(
                          1
                        )}
                    </span>
                  </div>

                  {/* COMMENT BODY */}

                  <div className="comment-body">
                    <span className="comment-quote-mark">
                      “
                    </span>

                    <FaCommentAlt />

                    <p>
                      {comment.comment}
                    </p>
                  </div>

                  {/* ACTIONS */}

                  <div className="comment-actions">
                    {comment.status ===
                      "pending" && (
                      <>
                        <button
                          type="button"
                          className="action-btn approve"
                          disabled={
                            actionLoading ===
                            comment.id
                          }
                          onClick={() =>
                            handleApprove(
                              comment.id
                            )
                          }
                        >
                          <FaCheck />

                          {actionLoading ===
                          comment.id
                            ? "Processing..."
                            : "Approve"}
                        </button>

                        <button
                          type="button"
                          className="action-btn reject"
                          disabled={
                            actionLoading ===
                            comment.id
                          }
                          onClick={() =>
                            handleReject(
                              comment.id
                            )
                          }
                        >
                          <FaTimes />

                          {actionLoading ===
                          comment.id
                            ? "Processing..."
                            : "Reject"}
                        </button>
                      </>
                    )}

                    {comment.status ===
                      "approved" && (
                      <span className="approved-message">
                        <FaCheckCircle />
                        This comment is
                        approved
                      </span>
                    )}

                    {comment.status ===
                      "rejected" && (
                      <span className="rejected-message">
                        <FaTimesCircle />
                        This comment is
                        rejected
                      </span>
                    )}

                    <button
                      type="button"
                      className="action-btn delete"
                      disabled={
                        actionLoading ===
                        comment.id
                      }
                      onClick={() =>
                        handleDelete(
                          comment.id
                        )
                      }
                    >
                      <FaTrash />

                      {actionLoading ===
                      comment.id
                        ? "Processing..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <FaCommentAlt />
              </div>

              <h3>
                No comments found
              </h3>

              <p>
                {searchTerm ||
                filterStatus !== "all"
                  ? "Try changing your search or filter."
                  : "There are no comments to review yet."}
              </p>

              {(searchTerm ||
                filterStatus !==
                  "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus(
                      "all"
                    );
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default AdminComments;