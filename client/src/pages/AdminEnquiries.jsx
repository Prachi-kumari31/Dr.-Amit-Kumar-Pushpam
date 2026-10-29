import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaEnvelope,
  FaSearch,
  FaCheck,
  FaClock,
  FaSyncAlt,
  FaArrowRight,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import "./AdminEnquiries.css";

const API_URL = "https://dr-amit-kumar-pushpam-1.onrender.com/api";

const STATUS = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

// Normalize old/inconsistent status values from the database
const normalizeStatus = (status) => {
  if (!status) return STATUS.NEW;

  const value = String(status).trim().toLowerCase();

  if (
    value === "new" ||
    value === "new enquiry" ||
    value === "new enquiries"
  ) {
    return STATUS.NEW;
  }

  if (
    value === "in progress" ||
    value === "in-progress" ||
    value === "in_progress" ||
    value === "progress"
  ) {
    return STATUS.IN_PROGRESS;
  }

  if (
    value === "resolved" ||
    value === "resolve" ||
    value === "completed"
  ) {
    return STATUS.RESOLVED;
  }

  return STATUS.NEW;
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH ENQUIRIES
  // --------------------------------------------------

  const fetchEnquiries = useCallback(async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(`${API_URL}/contact`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to load enquiries");
      }

      const formattedEnquiries = (data.enquiries || []).map((item) => ({
        ...item,
        status: normalizeStatus(item.status),
      }));

      setEnquiries(formattedEnquiries);
    } catch (err) {
      console.error("Unable to fetch enquiries:", err);
      setError(
        "Unable to load enquiries. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // --------------------------------------------------
  // AUTO REFRESH
  // This makes newly submitted messages appear
  // automatically without manually refreshing.
  // --------------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEnquiries();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchEnquiries]);

  // --------------------------------------------------
  // UPDATE STATUS
  // --------------------------------------------------

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const response = await fetch(`${API_URL}/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Unable to update status");
      }

      const updatedEnquiry = {
        ...data.enquiry,
        status: normalizeStatus(data.enquiry.status),
      };

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id === id ? updatedEnquiry : item
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
      alert("Unable to update enquiry status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------------------------
  // SEARCH + FILTER
  // --------------------------------------------------

  const filteredEnquiries = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return enquiries.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const email = item.email?.toLowerCase() || "";
      const subject = item.subject?.toLowerCase() || "";
      const message = item.message?.toLowerCase() || "";
      const phone = item.phone?.toLowerCase() || "";

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        email.includes(searchValue) ||
        subject.includes(searchValue) ||
        message.includes(searchValue) ||
        phone.includes(searchValue);

      const itemStatus = normalizeStatus(item.status);

      const matchesFilter =
        filter === "All" || itemStatus === filter;

      return matchesSearch && matchesFilter;
    });
  }, [enquiries, search, filter]);

  // --------------------------------------------------
  // COUNTS
  // --------------------------------------------------

  const counts = useMemo(() => {
    return {
      new: enquiries.filter(
        (item) => normalizeStatus(item.status) === STATUS.NEW
      ).length,

      progress: enquiries.filter(
        (item) =>
          normalizeStatus(item.status) === STATUS.IN_PROGRESS
      ).length,

      resolved: enquiries.filter(
        (item) =>
          normalizeStatus(item.status) === STATUS.RESOLVED
      ).length,

      total: enquiries.length,
    };
  }, [enquiries]);

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // --------------------------------------------------
  // STATUS CLASS
  // --------------------------------------------------

  const getStatusClass = (status) => {
    const normalized = normalizeStatus(status);

    if (normalized === STATUS.NEW) {
      return "status-new";
    }

    if (normalized === STATUS.IN_PROGRESS) {
      return "status-progress";
    }

    return "status-resolved";
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
      <main className="admin-enquiries">
        <div className="admin-enquiries-container">

          {/* HEADER */}
          <header className="enquiries-header">
            <div className="header-content">
              {/* <div className="header-label">
                PROSPER FOUNDATION
              </div> */}

              <h1>Contact Enquiries</h1>

              <p>
                Manage messages, follow up with visitors and keep track
                of every enquiry in one place.
              </p>
            </div>

            <button
              className={`refresh-button ${
                refreshing ? "refreshing" : ""
              }`}
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
            >
              <FaSyncAlt />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </header>

          {/* ERROR */}
          {error && (
            <div className="admin-error">
              <FaEnvelope />
              <span>{error}</span>
              <button onClick={() => fetchEnquiries(true)}>
                Try Again
              </button>
            </div>
          )}

          {/* STAT CARDS */}
          <section className="enquiry-stats">

            <div className="stat-card stat-new">
              <div className="stat-icon">
                <FaEnvelope />
              </div>

              <div className="stat-content">
                <span>NEW ENQUIRIES</span>
                <strong>{counts.new}</strong>
                <small>Awaiting attention</small>
              </div>
            </div>

            <div className="stat-card stat-progress">
              <div className="stat-icon">
                <FaClock />
              </div>

              <div className="stat-content">
                <span>IN PROGRESS</span>
                <strong>{counts.progress}</strong>
                <small>Currently being handled</small>
              </div>
            </div>

            <div className="stat-card stat-resolved">
              <div className="stat-icon">
                <FaCheck />
              </div>

              <div className="stat-content">
                <span>RESOLVED</span>
                <strong>{counts.resolved}</strong>
                <small>Successfully completed</small>
              </div>
            </div>

            <div className="stat-card stat-total">
              <div className="stat-icon">
                <FaEnvelope />
              </div>

              <div className="stat-content">
                <span>TOTAL MESSAGES</span>
                <strong>{counts.total}</strong>
                <small>All enquiries</small>
              </div>
            </div>

          </section>

          {/* TOOLBAR */}
          <section className="messages-section">

            <div className="messages-heading">
              <div>
                <h2>All Messages</h2>
                <span>
                  {filteredEnquiries.length}{" "}
                  {filteredEnquiries.length === 1
                    ? "message"
                    : "messages"}
                </span>
              </div>

              <div className="message-tools">

                <div className="search-box">
                  <FaSearch />

                  <input
                    type="text"
                    placeholder="Search by name, email, subject..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                >
                  <option value="All">All Messages</option>
                  <option value="New">New</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Resolved">
                    Resolved
                  </option>
                </select>

              </div>
            </div>

            {/* LOADING */}
            {loading ? (
              <div className="enquiry-state">
                <div className="loading-spinner"></div>
                <h3>Loading enquiries...</h3>
                <p>Please wait while we fetch your messages.</p>
              </div>
            ) : filteredEnquiries.length === 0 ? (
              <div className="enquiry-state">
                <div className="empty-icon">
                  <FaEnvelope />
                </div>

                <h3>No enquiries found</h3>

                <p>
                  {search || filter !== "All"
                    ? "Try changing your search or filter."
                    : "New messages submitted from your website will appear here."}
                </p>
              </div>
            ) : (
              <div className="enquiries-list">

                {filteredEnquiries.map((item) => {
                  const currentStatus =
                    normalizeStatus(item.status);

                  return (
                    <article
                      className="enquiry-card"
                      key={item._id}
                    >

                      {/* CARD HEADER */}
                      <div className="enquiry-card-header">

                        <div className="person-details">

                          <div className="person-avatar">
                            {item.name
                              ?.charAt(0)
                              .toUpperCase() || "U"}
                          </div>

                          <div className="person-info">
                            <h3>{item.name}</h3>

                            <a
                              href={`mailto:${item.email}`}
                              className="email-link"
                            >
                              <FaEnvelope />
                              {item.email}
                            </a>

                            {item.phone && (
                              <a
                                href={`tel:${item.phone}`}
                                className="phone-link"
                              >
                                <FaPhone />
                                {item.phone}
                              </a>
                            )}
                          </div>

                        </div>

                        <span
                          className={`enquiry-status ${getStatusClass(
                            currentStatus
                          )}`}
                        >
                          <span className="status-dot"></span>
                          {currentStatus}
                        </span>

                      </div>

                      {/* MESSAGE */}
                      <div className="enquiry-message">

                        <span className="subject-label">
                          SUBJECT
                        </span>

                        <h4>
                          {item.subject || "No subject"}
                        </h4>

                        <div className="message-text">
                          {item.message}
                        </div>

                      </div>

                      {/* FOOTER */}
                      <div className="enquiry-card-footer">

                        <div className="received-time">
                          Received{" "}
                          <strong>
                            {formatDate(item.createdAt)}
                          </strong>
                        </div>

                        <div className="enquiry-actions">

                          {/* NEW → IN PROGRESS */}
                          {currentStatus === STATUS.NEW && (
                            <button
                              className="action-progress"
                              disabled={updatingId === item._id}
                              onClick={() =>
                                updateStatus(
                                  item._id,
                                  STATUS.IN_PROGRESS
                                )
                              }
                            >
                              <FaClock />

                              {updatingId === item._id
                                ? "Updating..."
                                : "Mark In Progress"}

                              <FaArrowRight />
                            </button>
                          )}

                          {/* IN PROGRESS → RESOLVED */}
                          {currentStatus === STATUS.IN_PROGRESS && (
                            <button
                              className="action-resolve"
                              disabled={updatingId === item._id}
                              onClick={() =>
                                updateStatus(
                                  item._id,
                                  STATUS.RESOLVED
                                )
                              }
                            >
                              <FaCheck />

                              {updatingId === item._id
                                ? "Updating..."
                                : "Mark Resolved"}

                              <FaArrowRight />
                            </button>
                          )}

                          {/* RESOLVED */}
                          {currentStatus === STATUS.RESOLVED && (
                            <div className="resolved-label">
                              <FaCheck />
                              Enquiry Resolved
                            </div>
                          )}

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

          </section>

        </div>
      </main>
  );
};

export default AdminEnquiries;