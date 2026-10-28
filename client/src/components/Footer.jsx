import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-col">
              <h4>Dr. Amit Kumar Pushpam</h4>
              <p>
                Transforming lives through occult psychology, astrological
                guidance, and spiritual wisdom.
              </p>
              <div className="social-links">
                <a href="https://www.facebook.com/share/1RjyJaBsjf/" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/dramitpushpam?mdxt=MWV3NnlsMWEzNnl6OQ==" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/dr-amit-kumar-pushpam-9bbb2822a?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@amitkumarpushpam8756" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/blogs">Books & Publications</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href="#Counselling"> Counselling</a>
                </li>
                <li>
                  <a href="#astrology">Astrological Counselling</a>
                </li>
                <li>
                  <a href="#paranormal">Paranormal Investigator</a>
                </li>
                <li>
                  <a href="#psychological">Psychological Assessment</a>
                </li>
                <li>
                  <a href="#education">Moral Value & Education</a>
                </li>
                <li>
                  <a href="#spiritual">Spiritual Guidance</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span> Vaishali, Bihar, India</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href="tel:+91XXXXXXXXXX">+91 8809113638</a>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:info@prosperfoundation.com">
                  pushpamamit@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <p>
              &copy; 2026 Dr. Amit Kumar Pushpam. All rights reserved. | Designed
              with for your transformation
            </p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#sitemap">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;