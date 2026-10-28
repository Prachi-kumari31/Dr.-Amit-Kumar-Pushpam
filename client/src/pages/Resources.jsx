import React, { useState } from "react";
import { FaDownload, FaPlay, FaBook, FaFileAlt } from "react-icons/fa";
import "./Resources.css";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const resources = [
    {
      id: 1,
      title: "Vedic Astrology Complete Guide",
      category: "PDF",
      icon: FaFileAlt,
      description: "Comprehensive guide to understanding Vedic astrology principles",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Meditation Techniques for Beginners",
      category: "Video",
      icon: FaPlay,
      description: "Step-by-step video guide to meditation practices",
      duration: "15 min",
    },
    {
      id: 3,
      title: "Personality Assessment Tools",
      category: "Tool",
      icon: FaBook,
      description: "Interactive tools for self-assessment and personality analysis",
      access: "Online",
    },
    {
      id: 4,
      title: "Spiritual Reading List",
      category: "List",
      icon: FaBook,
      description: "Curated list of books on spirituality and personal growth",
      items: "50+ books",
    },
    {
      id: 5,
      title: "Chakra Balancing Guide",
      category: "PDF",
      icon: FaFileAlt,
      description: "Learn about chakras and techniques for balancing them",
      size: "1.8 MB",
    },
    {
      id: 6,
      title: "Breathing Exercises Tutorial",
      category: "Video",
      icon: FaPlay,
      description: "Video tutorials on various breathing techniques",
      duration: "12 min",
    },
    {
      id: 7,
      title: "Life Path Calculator",
      category: "Tool",
      icon: FaBook,
      description: "Calculate your numerological life path",
      access: "Online",
    },
    {
      id: 8,
      title: "Mental Wellness Workbook",
      category: "PDF",
      icon: FaFileAlt,
      description: "Interactive workbook for mental health and wellness",
      size: "3.2 MB",
    },
  ];

  const categories = ["All", "PDF", "Video", "Tool", "List"];

  const filteredResources = resources.filter(
    (resource) => selectedCategory === "All" || resource.category === selectedCategory
  );

  return (
    <div className="resources">
      {/* Hero Section */}
      <section className="resources-hero">
        <div className="container">
          <h1>Resources</h1>
          <p>Free tools and materials for your personal growth</p>
        </div>
      </section>

      {/* Resources Content */}
      <section className="resources-content">
        <div className="container">
          {/* Category Filter */}
          <div className="resources-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <div className="resource-icon">
                    <resource.icon />
                  </div>
                  <span className="resource-category">{resource.category}</span>
                </div>

                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                <div className="resource-info">
                  <span>
                    {resource.size || resource.duration || resource.items || resource.access}
                  </span>
                </div>

                <button className="btn btn-primary download-btn">
                  <FaDownload /> Download / Access
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="resources-cta">
        <div className="container">
          <h2>Need More Resources?</h2>
          <p>Contact us for customized materials and exclusive content</p>
          <button className="btn btn-primary">Get in Touch</button>
        </div>
      </section>
    </div>
  );
};

export default Resources;