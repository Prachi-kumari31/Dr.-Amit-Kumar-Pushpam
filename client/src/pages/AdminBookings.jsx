import React, { useEffect, useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaSyncAlt,
  FaVideo,
  FaPhone,
  FaEnvelope,
  FaUser,
  FaRupeeSign,
  FaEye,
  FaTrash,
  FaEdit,
  FaLink,
  FaComments,
  FaTimes,
} from "react-icons/fa";

import AdminLayout from "../components/AdminLayout";
import "./AdminBookings.css";

const API_URL = "http://localhost:5000/api";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [scheduleData, setScheduleData] = useState({
    confirmedDate: "",
    confirmedTime: "",
    meetingPlatform: "Google Meet",
    meetingLink: "",
    adminNotes: "",
  });

  /* --------------------------------
     FETCH BOOKINGS
  -------------------------------- */
const getAdminToken = () => {
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken")
  );
};

const getAuthHeaders = () => {
  const token = getAdminToken();

  if (!token) {
    throw new Error(
      "Admin session expired. Please login again."
    );
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const fetchBookings = async (showRefresh = false) => {
  try {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const response = await fetch(
      `${API_URL}/bookings`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();

    console.log(
      "BOOKINGS:",
      response.status,
      data
    );

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Unable to fetch bookings (${response.status})`
      );
    }

    if (!data.success) {
      throw new Error(
        data.message ||
          "Unable to load bookings"
      );
    }

    const bookings = Array.isArray(data.data)
      ? data.data
      : [];

    setBookings(bookings);

  } catch (error) {

    console.error(
      "Fetch bookings error:",
      error
    );

    setBookings([]);

    alert(error.message);

  } finally {

    setLoading(false);
    setRefreshing(false);

  }
};
  // useEffect(() => {
  //   fetchBookings();
  // }, []);

  /* --------------------------------
     FILTER BOOKINGS
  -------------------------------- */

 const filteredBookings = useMemo(() => {

  return bookings.filter((booking) => {

    const name =
      booking.name || "";

    const email =
      booking.email || "";

    const phone =
      booking.phone || "";

    const service =
      booking.serviceType || "";

    const searchText =
      `${name} ${email} ${phone} ${service}`
        .toLowerCase();

    const matchesSearch =
      searchText.includes(
        search.toLowerCase()
      );

    const matchesFilter =
      filter === "all" ||
      booking.status?.toLowerCase() === filter;

    return (
      matchesSearch &&
      matchesFilter
    );
  });

}, [bookings, search, filter]);
  /* --------------------------------
     STATISTICS
  -------------------------------- */

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  /* --------------------------------
     OPEN DETAILS
  -------------------------------- */

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  /* --------------------------------
     OPEN SCHEDULE MODAL
  -------------------------------- */

  const openSchedule = (booking) => {
    setSelectedBooking(booking);

    setScheduleData({
      confirmedDate: booking.confirmedDate
        ? booking.confirmedDate.substring(0, 10)
        : booking.preferredDate
        ? booking.preferredDate.substring(0, 10)
        : "",

      confirmedTime:
        booking.confirmedTime ||
        booking.preferredTime ||
        "",

      meetingPlatform:
        booking.meetingPlatform ||
        "Google Meet",

      meetingLink:
        booking.meetingLink ||
        "",

      adminNotes:
        booking.adminNotes ||
        "",
    });

    setShowSchedule(true);
  };

  /* --------------------------------
     UPDATE BOOKING
  -------------------------------- */

  const updateBooking = async (id, payload) => {
  try {
    setUpdating(true);

    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken") ||
      localStorage.getItem("accessToken");

    if (!token) {
      throw new Error(
        "Admin session expired. Please login again."
      );
    }

    const response = await fetch(
      `${API_URL}/bookings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to update booking"
      );
    }

    const updatedBooking =
      data.data || data.booking;

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === id
          ? updatedBooking
          : booking
      )
    );

    setSelectedBooking(updatedBooking);

    return true;
  } catch (error) {
    console.error(
      "Update booking error:",
      error
    );

    alert(error.message);

    return false;
  } finally {
    setUpdating(false);
  }
};

  /* --------------------------------
     CHANGE STATUS
  -------------------------------- */

const changeStatus = async (id, status) => {
  try {
    setUpdating(true);

    const response = await fetch(
      `${API_URL}/bookings/${id}/status`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to update status"
      );
    }

    const updatedBooking = data.data;

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === id
          ? updatedBooking
          : booking
      )
    );

    if (
      selectedBooking?._id === id
    ) {
      setSelectedBooking(
        updatedBooking
      );
    }

  } catch (error) {

    console.error(
      "Status update error:",
      error
    );

    alert(error.message);

  } finally {

    setUpdating(false);

  }
};
  /* --------------------------------
     SCHEDULE MEETING
  -------------------------------- */
const handleSchedule = async (e) => {
  e.preventDefault();

  if (!selectedBooking) return;

  if (
    !scheduleData.confirmedDate ||
    !scheduleData.confirmedTime
  ) {
    alert(
      "Please select confirmed date and time."
    );
    return;
  }

  try {
    setUpdating(true);

    const response = await fetch(
      `${API_URL}/bookings/${selectedBooking._id}/confirm`,
      {
        method: "PATCH",
        headers: getAuthHeaders(),

        body: JSON.stringify({
          confirmedDate:
            scheduleData.confirmedDate,

          confirmedTime:
            scheduleData.confirmedTime,

          meetingPlatform:
            scheduleData.meetingPlatform,

          meetingLink:
            scheduleData.meetingLink,

          adminNotes:
            scheduleData.adminNotes,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to schedule booking"
      );
    }

    const updatedBooking = data.data;

    setBookings((prev) =>
      prev.map((booking) =>
        booking._id ===
        selectedBooking._id
          ? updatedBooking
          : booking
      )
    );

    setSelectedBooking(
      updatedBooking
    );

    setShowSchedule(false);

    alert(
      "Booking confirmed and appointment details sent to the client."
    );

  } catch (error) {

    console.error(
      "Schedule booking error:",
      error
    );

    alert(error.message);

  } finally {

    setUpdating(false);

  }
};
  /* --------------------------------
     DELETE BOOKING
  -------------------------------- */

  const deleteBooking = async (booking) => {

  const confirmed = window.confirm(
    `Delete booking from ${
      booking.name || "this user"
    }?\n\nThis will permanently remove the booking from the backend.`
  );

  if (!confirmed) return;

  try {

    const response = await fetch(
      `${API_URL}/bookings/${booking._id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Unable to delete booking"
      );
    }

    setBookings((prev) =>
      prev.filter(
        (item) =>
          item._id !== booking._id
      )
    );

    setShowDetails(false);

    alert(
      "Booking deleted successfully."
    );

  } catch (error) {

    console.error(
      "Delete booking error:",
      error
    );

    alert(error.message);
  }
};
  /* --------------------------------
     SERVICE NAME
  -------------------------------- */

  const formatService = (service) => {
    if (!service) return "Consultation";

    const services = {
      astrology: "Astrological Consultation",
      psychology: "Psychological Counselling",
      spiritual: "Spiritual Counselling",
      moral: "Moral Education & Guidance",
      testing: "Psychological Testing",
      paranormal: "Paranormal Consultancy",
    };

    return (
      services[service] ||
      service.charAt(0).toUpperCase() +
        service.slice(1)
    );
  };

  /* --------------------------------
     STATUS CLASS
  -------------------------------- */

  const getStatusClass = (status) => {
    return `booking-status booking-status-${status}`;
  };

  /* --------------------------------
     DATE FORMAT
  -------------------------------- */

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
      <main className="admin-bookings-page">

        <div className="admin-bookings-container">

          {/* ================= HEADER ================= */}

          <header className="booking-header">

            <div className="booking-header-content">

              <span className="booking-eyebrow">
                PROSPER FOUNDATION
              </span>

              <h1>
                Appointment
                <span> Management</span>
              </h1>

              <p>
                Review consultation requests, schedule
                appointments and manage meeting details.
              </p>

            </div>

            <button
              className="refresh-bookings-btn"
              onClick={() =>
                fetchBookings(true)
              }
              disabled={refreshing}
            >
              <FaSyncAlt
                className={
                  refreshing
                    ? "refresh-spin"
                    : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </header>

          {/* ================= STATS ================= */}

          <section className="booking-stats">

            <div className="booking-stat-card pending">

              <div className="stat-icon">
                <FaClock />
              </div>

              <div>
                <span>Pending</span>
                <strong>{pendingCount}</strong>
                <small>Awaiting review</small>
              </div>

            </div>


            <div className="booking-stat-card confirmed">

              <div className="stat-icon">
                <FaCalendarAlt />
              </div>

              <div>
                <span>Confirmed</span>
                <strong>{confirmedCount}</strong>
                <small>Scheduled sessions</small>
              </div>

            </div>


            <div className="booking-stat-card completed">

              <div className="stat-icon">
                <FaCheckCircle />
              </div>

              <div>
                <span>Completed</span>
                <strong>{completedCount}</strong>
                <small>Finished sessions</small>
              </div>

            </div>


            <div className="booking-stat-card cancelled">

              <div className="stat-icon">
                <FaTimesCircle />
              </div>

              <div>
                <span>Cancelled</span>
                <strong>{cancelledCount}</strong>
                <small>Cancelled requests</small>
              </div>

            </div>

          </section>

          {/* ================= TOOLBAR ================= */}

          <section className="booking-toolbar">

            <div className="booking-list-heading">

              <h2>
                Booking Requests
              </h2>

              <span>
                {filteredBookings.length} appointments
              </span>

            </div>


            <div className="booking-filters">

              <div className="booking-search">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search name, email or service..."
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

                <option value="all">
                  All bookings
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="confirmed">
                  Confirmed
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </section>

          {/* ================= BOOKING LIST ================= */}

          <section className="bookings-list">

            {loading ? (

              <div className="booking-empty">

                <div className="loading-circle"></div>

                <h3>
                  Loading bookings...
                </h3>

                <p>
                  Please wait while we retrieve
                  appointment requests.
                </p>

              </div>

            ) : filteredBookings.length === 0 ? (

              <div className="booking-empty">

                <FaCalendarAlt />

                <h3>
                  No bookings found
                </h3>

                <p>
                  New consultation requests
                  will appear here.
                </p>

              </div>

            ) : (

              filteredBookings.map(
                (booking) => {

                  const customerName =
                      booking.name || "Unknown User";

                  const customerEmail =
                      booking.email || "No email";

                  const customerPhone =
                      booking.phone || "";



                  return (
                    <article
                      className="booking-card"
                      key={booking._id}
                    >

                      {/* CARD TOP */}

                      <div className="booking-card-top">

                        <div className="booking-user">

  <div className="booking-avatar">
    {customerName
      .charAt(0)
      .toUpperCase()}
  </div>

  <div>

    <h3>
      {customerName}
    </h3>

    <a href={`mailto:${customerEmail}`}>
      <FaEnvelope />
      {customerEmail}
    </a>

    {customerPhone && (
      <span>
        <FaPhone />
        {customerPhone}
      </span>
    )}

  </div>

</div>

                        <span
                          className={getStatusClass(
                            booking.status
                          )}
                        >
                          {booking.status}
                        </span>

                      </div>


                      {/* CARD BODY */}

                      <div className="booking-card-body">

                        <div className="booking-service">

                          <span>
                            SERVICE
                          </span>

                          <h4>
                            {formatService(
                              booking.serviceType
                            )}
                          </h4>

                        </div>


                        <div className="booking-meta">

                          <div>
                            <FaCalendarAlt />

                            <div>
                              <small>
                                Preferred date
                              </small>

                              <strong>
                                {formatDate(
                                  booking.preferredDate
                                )}
                              </strong>
                            </div>
                          </div>


                          <div>
                            <FaClock />

                            <div>
                              <small>
                                Preferred time
                              </small>

                              <strong>
                                {booking.preferredTime ||
                                  "Not specified"}
                              </strong>
                            </div>
                          </div>


                          <div>
                            <FaClock />

                            <div>
                              <small>
                                Duration
                              </small>

                              <strong>
                                {
                                  booking.sessionDuration
                                }{" "}
                                minutes
                              </strong>
                            </div>
                          </div>


                          <div>
                            <FaRupeeSign />

                            <div>
                              <small>
                                Session fee
                              </small>

                              <strong>
                                ₹
                                {booking.price ||
                                  0}
                              </strong>
                            </div>
                          </div>

                        </div>

                      </div>


                      {/* CONFIRMED MEETING */}

                      {booking.status ===
                        "confirmed" &&
                        booking.meetingLink && (

                        <div className="meeting-preview">

                          <div className="meeting-preview-icon">
                            <FaVideo />
                          </div>

                          <div>

                            <span>
                              MEETING SCHEDULED
                            </span>

                            <strong>
                              {booking.meetingPlatform ||
                                "Online Meeting"}
                            </strong>

                            <p>
                              {formatDate(
                                booking.confirmedDate
                              )}{" "}
                              •{" "}
                              {
                                booking.confirmedTime
                              }
                            </p>

                          </div>

                          <a
                            href={
                              booking.meetingLink
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            Join Meeting
                          </a>

                        </div>
                      )}


                      {/* CARD FOOTER */}

                      <div className="booking-card-footer">

                        <small>
                          Requested{" "}
                          {formatDate(
                            booking.createdAt
                          )}
                        </small>


                        <div className="booking-actions">

                          <button
                            className="view-btn"
                            onClick={() =>
                              openDetails(
                                booking
                              )
                            }
                          >
                            <FaEye />
                            View
                          </button>


                          {booking.status ===
                            "pending" && (

                            <button
                              className="schedule-btn"
                              onClick={() =>
                                openSchedule(
                                  booking
                                )
                              }
                            >
                              <FaCalendarAlt />
                              Schedule
                            </button>

                          )}


                          {booking.status ===
                            "confirmed" && (

                            <button
                              className="schedule-btn"
                              onClick={() =>
                                openSchedule(
                                  booking
                                )
                              }
                            >
                              <FaEdit />
                              Edit Meeting
                            </button>

                          )}


                          {booking.status ===
                            "confirmed" && (

                            <button
                              className="complete-btn"
                              onClick={() =>
                                changeStatus(
                                  booking,
                                  "completed"
                                )
                              }
                            >
                              <FaCheckCircle />
                              Complete
                            </button>

                          )}


                          {booking.status !==
                            "cancelled" &&
                            booking.status !==
                              "completed" && (

                            <button
                              className="cancel-btn"
                              onClick={() =>
                                changeStatus(
                                  booking,
                                  "cancelled"
                                )
                              }
                            >
                              <FaTimesCircle />
                              Cancel
                            </button>

                          )}


                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteBooking(
                                booking
                              )
                            }
                          >
                            <FaTrash />
                          </button>

                        </div>

                      </div>

                    </article>
                  );
                }
              )

            )}

          </section>

        </div>


        {/* ================= DETAILS MODAL ================= */}

        {showDetails &&
          selectedBooking && (

          <div
            className="booking-modal-overlay"
            onClick={() =>
              setShowDetails(false)
            }
          >

            <div
              className="booking-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <span>
                    BOOKING DETAILS
                  </span>

                  <h2>
                     {selectedBooking.name}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setShowDetails(false)
                  }
                >
                  <FaTimes />
                </button>

              </div>


              <div className="modal-content">

                <div className="detail-section">

                  <h3>
                    <FaUser />
                    Client Information
                  </h3>

                  <div className="detail-grid">

                    <div>
                      <span>Name</span>
                      <strong>
                    {selectedBooking.name}
                      </strong>
                    </div>

                    <div>
                      <span>Email</span>
                      <strong>
                         {selectedBooking.email}
                      </strong>
                    </div>

                    <div>
                      <span>Phone</span>
                      <strong>
                        {selectedBooking.phone ||
                           "Not provided"}
                      </strong>
                    </div>

                  </div>

                </div>


                <div className="detail-section">

                  <h3>
                    <FaCalendarAlt />
                    Consultation
                  </h3>

                  <div className="detail-grid">

                    <div>
                      <span>Service</span>
                      <strong>
                        {formatService(
                          selectedBooking.serviceType
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Duration</span>
                      <strong>
                        {
                          selectedBooking.sessionDuration
                        }{" "}
                        minutes
                      </strong>
                    </div>

                    <div>
                      <span>Preferred Date</span>
                      <strong>
                        {formatDate(
                          selectedBooking.preferredDate
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Preferred Time</span>
                      <strong>
                        {
                          selectedBooking.preferredTime
                        }
                      </strong>
                    </div>

                    <div>
                      <span>Fee</span>
                      <strong>
                        ₹
                        {
                          selectedBooking.price
                        }
                      </strong>
                    </div>

                  </div>

                </div>


                {selectedBooking.notes && (

                  <div className="detail-message">

                    <h3>
                      <FaComments />
                      Client Notes
                    </h3>

                    <p>
                      {selectedBooking.notes}
                    </p>

                  </div>

                )}


                {selectedBooking.meetingLink && (

                  <div className="existing-meeting">

                    <FaVideo />

                    <div>

                      <span>
                        {selectedBooking.meetingPlatform ||
                          "Meeting"}
                      </span>

                      <strong>
                        {formatDate(
                          selectedBooking.confirmedDate
                        )}{" "}
                        •{" "}
                        {
                          selectedBooking.confirmedTime
                        }
                      </strong>

                    </div>

                    <a
                      href={
                        selectedBooking.meetingLink
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Link
                    </a>

                  </div>

                )}

              </div>


              <div className="modal-footer">

                <button
                  className="modal-delete-btn"
                  onClick={() =>
                    deleteBooking(
                      selectedBooking
                    )
                  }
                >
                  <FaTrash />
                  Delete Booking
                </button>


                {selectedBooking.status !==
                  "cancelled" && (
                  <button
                    className="modal-schedule-btn"
                    onClick={() => {
                      setShowDetails(false);
                      openSchedule(
                        selectedBooking
                      );
                    }}
                  >
                    <FaCalendarAlt />
                    Schedule Meeting
                  </button>
                )}

              </div>

            </div>

          </div>
        )}


        {/* ================= SCHEDULE MODAL ================= */}

        {showSchedule &&
          selectedBooking && (

          <div
            className="booking-modal-overlay"
            onClick={() =>
              setShowSchedule(false)
            }
          >

            <form
              className="booking-modal schedule-modal"
              onSubmit={handleSchedule}
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="modal-header">

                <div>

                  <span>
                    APPOINTMENT SETUP
                  </span>

                  <h2>
                    Schedule Meeting
                  </h2>

                  <p>
                    {selectedBooking.name}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowSchedule(false)
                  }
                >
                  <FaTimes />
                </button>

              </div>


              <div className="schedule-content">

                <div className="schedule-notice">

                  <FaEnvelope />

                  <p>
                    After confirmation, the backend
                    can send the appointment details
                    and meeting link to the client's
                    email.
                  </p>

                </div>


                <div className="schedule-grid">

                  <div className="schedule-field">

                    <label>
                      Confirmed Date
                    </label>

                    <input
                      type="date"
                      value={
                        scheduleData.confirmedDate
                      }
                      onChange={(e) =>
                        setScheduleData({
                          ...scheduleData,
                          confirmedDate:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>


                  <div className="schedule-field">

                    <label>
                      Confirmed Time
                    </label>

                    <input
                      type="time"
                      value={
                        scheduleData.confirmedTime
                      }
                      onChange={(e) =>
                        setScheduleData({
                          ...scheduleData,
                          confirmedTime:
                            e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                </div>


                <div className="schedule-field">

                  <label>
                    Meeting Platform
                  </label>

                  <select
                    value={
                      scheduleData.meetingPlatform
                    }
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        meetingPlatform:
                          e.target.value,
                      })
                    }
                  >

                    <option>
                      Google Meet
                    </option>

                    <option>
                      Zoom
                    </option>

                    <option>
                      Microsoft Teams
                    </option>

                    <option>
                      Phone Call
                    </option>

                    <option>
                      In Person
                    </option>

                    <option>
                      Other
                    </option>

                  </select>

                </div>


                <div className="schedule-field">

                  <label>
                    <FaLink />
                    Meeting Link
                  </label>

                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={
                      scheduleData.meetingLink
                    }
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        meetingLink:
                          e.target.value,
                      })
                    }
                  />

                  <small>
                    Add the Google Meet, Zoom or
                    other meeting URL.
                  </small>

                </div>


                <div className="schedule-field">

                  <label>
                    Admin Message / Notes
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Add instructions or a message for the client..."
                    value={
                      scheduleData.adminNotes
                    }
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        adminNotes:
                          e.target.value,
                      })
                    }
                  />

                </div>

              </div>


              <div className="schedule-footer">

                <button
                  type="button"
                  className="schedule-cancel"
                  onClick={() =>
                    setShowSchedule(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="schedule-confirm"
                  disabled={updating}
                >
                  <FaCheckCircle />

                  {updating
                    ? "Saving..."
                    : "Confirm & Schedule"}
                </button>

              </div>

            </form>

          </div>
        )}

      </main>
   
  );
};

export default AdminBooking;