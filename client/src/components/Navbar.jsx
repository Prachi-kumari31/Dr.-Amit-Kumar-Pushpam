import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaPenNib,
  FaFeatherAlt,
  FaBookOpen,
  FaFileAlt,
} from "react-icons/fa";
import logo from "../assets/images/prosper_logo1.png";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [publicationsOpen, setPublicationsOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setPublicationsOpen(false);
  };

  const services = [
    {
      name: "Counselling",
      path: "/services/counselling",
      icon: "✦",
    },
    {
      name: "Astrological Consultancy",
      path: "/services/astrological-consultancy",
      icon: "☼",
    },
    {
      name: "Paranormal Investigator",
      path: "/services/paranormal-investigator",
      icon: "◈",
    },
    {
      name: "Psychological Assessment",
      path: "/services/psychological-assessment",
      icon: "◉",
    },
    {
      name: "Moral Value and Education",
      path: "/services/moral-value-and-education",
      icon: "❖",
    },
    {
      name: "Spiritual Guidance",
      path: "/services/spiritual-guidance",
      icon: "✧",
    },
  ];

  const BooksPublcations = [
    {
      name: "Blogs",
      // description: "Insights, ideas & perspectives",
      path: "/blogs",
      icon: <FaPenNib />,
    },
    {
      name: "Stories",
      // description: "Stories of wisdom & transformation",
      path: "/stories",
      icon: <FaFeatherAlt />,
    },
    {
      name: "Poems",
      // description: "Poetry, reflection & expression",
      path: "/poems",
      icon: <FaFeatherAlt />,
    },
    {
      name: "Books",
      // description: "Explore published books & ebooks",
      path: "/ebooks",
      icon: <FaBookOpen />,
    },
    {
      name: "Articles",
      // description: "Research, articles & knowledge",
      path: "/articles",
      icon: <FaFileAlt />,
    },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* ================= LOGO ================= */}
        <Link to="/" className="logo" onClick={closeMenus}>
          <div className="logo-img-container">
            <img
              src={logo}
              alt="Prosper Foundation Logo"
            />
          </div>

          <div className="logo-text">
            <div className="logo-title-row">
              <h2>Dr. Amit Kumar Pushpam</h2>
            </div>

            {/* <p>Dr Amit Kumar Pushpam</p> */}
          </div>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <div
          className={`nav-links ${
            menuOpen ? "active" : "inactive"
          }`}
        >
          <Link to="/" onClick={closeMenus}>
            Home
          </Link>

          {/* <Link to="/about" onClick={closeMenus}>
            About
          </Link> */}

          {/* ================= SERVICES DROPDOWN ================= */}
          <div
            className={`services-dropdown ${
              servicesOpen ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="services-dropdown-btn"
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setPublicationsOpen(false);
              }}
              aria-expanded={servicesOpen}
            >
              <span>Services</span>

              <span
                className={`dropdown-arrow ${
                  servicesOpen ? "rotate" : ""
                }`}
              >
                ▾
              </span>
            </button>

            <div className="services-menu">
              <div className="services-menu-header">
                <span>Our Services</span>
                <small>
                  Explore our areas of guidance
                </small>
              </div>

              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="service-dropdown-item"
                  onClick={closeMenus}
                >
                  <span className="service-icon">
                    {service.icon}
                  </span>

                  <span className="service-item-content">
                    <span className="service-item-name">
                      {service.name}
                    </span>
                  </span>

                  <span className="service-arrow">
                    →
                  </span>
                </Link>
              ))}

              <Link
                to="/services"
                className="view-all-services"
                onClick={closeMenus}
              >
                View All Services
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ================= BOOKS & PUBLICATIONS DROPDOWN ================= */}
          <div
            className={`services-dropdown publications-dropdown ${
              publicationsOpen ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="services-dropdown-btn"
              onClick={() => {
                setPublicationsOpen(!publicationsOpen);
                setServicesOpen(false);
              }}
              aria-expanded={publicationsOpen}
            >
              <span>Books & Publications</span>

              <span
                className={`dropdown-arrow ${
                  publicationsOpen ? "rotate" : ""
                }`}
              >
                ▾
              </span>
            </button>

            <div className="services-menu publications-menu">
              <div className="services-menu-header">
                <span>Books & Publications</span>

                <small>
                  Explore our literary collection
                </small>
              </div>

              {BooksPublcations.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="service-dropdown-item"
                  onClick={closeMenus}
                >
                  <span className="service-icon">
                    {item.icon}
                  </span>

                  <span className="service-item-content">
                    <span className="service-item-name">
                      {item.name}
                    </span>

                    <span className="service-item-description">
                      {item.description}
                    </span>
                  </span>

                  <span className="service-arrow">
                    →
                  </span>
                </Link>
              ))}

              <Link
                to="/ebooks"
                className="view-all-services"
                onClick={closeMenus}
              >
                Explore Books
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ================= MEDIA & GALLERY ================= */}
          <Link
            to="/gallery"
            onClick={closeMenus}
          >
            Media & Gallery
          </Link>

          {/* ================= CONTACT ================= */}
          <Link
            to="/contact"
            onClick={closeMenus}
          >
            Contact Us
          </Link>

          {/* ================= ADMIN LOGIN ================= */}
          {/* <Link
            to="/admin/login"
            className="admin-login"
            onClick={closeMenus}
          >
            Admin Login
          </Link> */}

          {/* ================= BOOK SESSION ================= */}
          <Link
            to="/book-session"
            className="book-btn"
            onClick={closeMenus}
          >
            Book Session
          </Link>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <button
          className="menu-btn"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setServicesOpen(false);
            setPublicationsOpen(false);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;