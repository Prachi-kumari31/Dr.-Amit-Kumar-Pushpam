import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaComments,
  FaBook,
  FaCalendar,
  FaBookOpen,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFeatherAlt,
  FaStar,
  FaImage
} from "react-icons/fa";

import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    // {
    //   name: "Dashboard",
    //   path: "/admin",
    //   icon: FaHome,
    // },
    {
      name: "Blogs",
      path: "/admin/blogs",
      icon: FaFileAlt,
    },
    {name: "Gallery", path: "/admin/media", icon: FaImage},
    {
      name: "Comments",
      path: "/admin/comments",
      icon: FaComments,
    },
    {
      name: "eBooks",
      path: "/admin/ebooks",
      icon: FaBook,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: FaCalendar,
    },
   
    {
      name: "Enquiries",
      path: "/admin/enquiries",
      icon: FaUsers,
    },
    {
      name: "Stories",
      path: "/admin/stories",
      icon: FaBookOpen,
    },
    {
      name: "Articles",
      path: "/admin/articles",
      icon: FaFeatherAlt,
    },
    { 
      name:"Publications",
      path:"/admin/publications",
        icon: FaBook,
    },

    // ⭐ NEW: TESTIMONIALS
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: FaStar,
    },
  ];

const handleLogout = () => {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("adminToken");

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/admin/login", { replace: true });
};

  const isActive = (path) => {
    // Dashboard should only be active on /admin
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    // Other menu items
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-layout">

      {/* =========================================
          SIDEBAR
      ========================================= */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : "closed"
        }`}
      >

        {/* Sidebar Header */}
        <div className="sidebar-header">

          <Link
            to="/admin"
            className="sidebar-logo"
          >
            <span className="logo-icon">
              ✨
            </span>

            <span className="logo-text">
              Prosper Admin
            </span>
          </Link>

          <button
            className="toggle-btn mobile-only"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>

        </div>

        {/* =========================================
            NAVIGATION
        ========================================= */}
        <nav className="sidebar-nav">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${
                  isActive(item.path)
                    ? "active"
                    : ""
                }`}
              >

                <Icon className="nav-icon" />

                <span className="nav-text">
                  {item.name}
                </span>

              </Link>
            );
          })}

        </nav>

        {/* =========================================
            SIDEBAR FOOTER
        ========================================= */}
        <div className="sidebar-footer">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <div className="admin-main">

        {/* =========================================
            HEADER
        ========================================= */}
  

        {/* =========================================
            PAGE CONTENT
        ========================================= */}
        <main className="admin-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;