import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTestimonials.css";

const API_URL = "http://localhost:5000/api";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const getToken = () => localStorage.getItem("adminToken");

  // ==============================
  // FETCH TESTIMONIALS
  // ==============================
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("Admin authentication token not found. Please login again.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/testimonials/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("ADMIN TESTIMONIALS:", response.data);

      if (response.data?.success) {
        // Your backend returns: { success, count, testimonials }
        setTestimonials(response.data.testimonials || []);
      } else {
        setError(
          response.data?.message || "Failed to load testimonials"
        );
      }
    } catch (error) {
      console.error("Fetch testimonials error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load testimonials"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ==============================
  // APPROVE
  // ==============================
  const approveTestimonial = async (id) => {
    try {
      const token = getToken();

      await axios.put(
        `${API_URL}/testimonials/admin/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Testimonial approved successfully!");

      await fetchTestimonials();
    } catch (error) {
      console.error("Approve testimonial error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to approve testimonial"
      );
    }
  };

  // ==============================
  // REJECT
  // ==============================
  const rejectTestimonial = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this testimonial?"
    );

    if (!confirmReject) return;

    try {
      const token = getToken();

      await axios.put(
        `${API_URL}/testimonials/admin/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Testimonial rejected.");

      await fetchTestimonials();
    } catch (error) {
      console.error("Reject testimonial error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to reject testimonial"
      );
    }
  };

  // ==============================
  // DELETE
  // ==============================
  const deleteTestimonial = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this testimonial?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      await axios.delete(
        `${API_URL}/testimonials/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      alert("Testimonial deleted successfully.");

      await fetchTestimonials();
    } catch (error) {
      console.error("Delete testimonial error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete testimonial"
      );
    }
  };

  // ==============================
  // FILTER
  // ==============================
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filter === "all") return true;
    return testimonial.status === filter;
  });

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="admin-testimonials-page">
        <div className="testimonial-loading">
          <div className="loading-spinner"></div>
          <h3>Loading Testimonials...</h3>
          <p>Please wait while we fetch the testimonials.</p>
        </div>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================
  return (
    <div className="admin-testimonials-page">

      {/* HEADER */}
      <div className="testimonial-page-header">
        <div>
          <span className="testimonial-eyebrow">
            ADMIN MANAGEMENT
          </span>

          <h1>Testimonials</h1>

          <p>
            Review, approve and manage testimonials submitted
            by visitors.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchTestimonials}
        >
          ↻ Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="testimonial-error">
          <span>⚠️</span>
          <div>
            <strong>Something went wrong</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* STATISTICS */}
      <div className="testimonial-stats">

        <div className="stat-card">
          <div className="stat-icon total-icon">💬</div>
          <div>
            <span>Total</span>
            <strong>{testimonials.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">⏳</div>
          <div>
            <span>Pending</span>
            <strong>
              {
                testimonials.filter(
                  (item) => item.status === "pending"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon approved-icon">✓</div>
          <div>
            <span>Approved</span>
            <strong>
              {
                testimonials.filter(
                  (item) => item.status === "approved"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon rejected-icon">✕</div>
          <div>
            <span>Rejected</span>
            <strong>
              {
                testimonials.filter(
                  (item) => item.status === "rejected"
                ).length
              }
            </strong>
          </div>
        </div>

      </div>

      {/* FILTER */}
      <div className="testimonial-toolbar">

        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "approved" ? "active" : ""}
            onClick={() => setFilter("approved")}
          >
            Approved
          </button>

          <button
            className={filter === "rejected" ? "active" : ""}
            onClick={() => setFilter("rejected")}
          >
            Rejected
          </button>
        </div>

        <span className="result-count">
          Showing {filteredTestimonials.length} testimonial
          {filteredTestimonials.length !== 1 ? "s" : ""}
        </span>

      </div>

      {/* EMPTY STATE */}
      {filteredTestimonials.length === 0 ? (
        <div className="testimonial-empty">

          <div className="empty-icon">💬</div>

          <h2>No Testimonials Found</h2>

          <p>
            {filter === "all"
              ? "No testimonials have been submitted yet."
              : `There are no ${filter} testimonials.`}
          </p>

        </div>
      ) : (

        /* TESTIMONIAL CARDS */
        <div className="testimonial-grid">

          {filteredTestimonials.map((testimonial) => (

            <div
              className={`testimonial-card ${testimonial.status}`}
              key={testimonial._id}
            >

              {/* CARD TOP */}
              <div className="testimonial-card-top">

                <div className="testimonial-avatar">
                  {testimonial.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <div className="testimonial-user">

                  <h3>{testimonial.name}</h3>

                  <p>{testimonial.email}</p>

                </div>

                <span
                  className={`status-badge ${testimonial.status}`}
                >
                  {testimonial.status === "approved" && "✓ "}
                  {testimonial.status === "pending" && "⏳ "}
                  {testimonial.status === "rejected" && "✕ "}
                  {testimonial.status}
                </span>

              </div>

              {/* SERVICE */}
              <div className="testimonial-service">

                <span>Service</span>

                <strong>
                  {testimonial.service || "Not specified"}
                </strong>

              </div>

              {/* RATING */}
              <div className="testimonial-rating">

                <span>Rating</span>

                <div className="stars">

                  {Array.from({ length: 5 }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index <
                          Number(testimonial.rating || 0)
                            ? "star filled"
                            : "star"
                        }
                      >
                        ★
                      </span>
                    )
                  )}

                  <small>
                    {testimonial.rating || 0}/5
                  </small>

                </div>

              </div>

              {/* MESSAGE */}
              <div className="testimonial-message">

                <span className="quote-mark">“</span>

                <p>
                  {testimonial.message}
                </p>

                <span className="quote-end">”</span>

              </div>

              {/* DATE */}
              <div className="testimonial-date">

                Submitted{" "}
                {testimonial.createdAt
                  ? new Date(
                      testimonial.createdAt
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}

              </div>

              {/* ACTIONS */}
              <div className="testimonial-actions">

                {testimonial.status !== "approved" && (
                  <button
                    className="approve-btn"
                    onClick={() =>
                      approveTestimonial(
                        testimonial._id
                      )
                    }
                  >
                    ✓ Approve
                  </button>
                )}

                {testimonial.status !== "rejected" && (
                  <button
                    className="reject-btn"
                    onClick={() =>
                      rejectTestimonial(
                        testimonial._id
                      )
                    }
                  >
                    ✕ Reject
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTestimonial(
                      testimonial._id
                    )
                  }
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default AdminTestimonials;