import React, { useState } from "react";
import { FaFileAlt, FaDownload, FaUser, FaQuoteLeft } from "react-icons/fa";
import "./Research.css";

const Research = () => {
  const papers = [
    {
      id: 1,
      title: "The Integration of Vedic Astrology and Psychology",
      authors: "Dr. Amit Kumar Pushpam, Dr. Priya Singh",
      year: 2023,
      journal: "Journal of Holistic Studies",
      description:
        "An exploration of how ancient astrological principles can be integrated with modern psychological practices to facilitate personal development.",
      abstract:
        "This research paper examines the intersection of Vedic astrology and contemporary psychology, presenting a framework for integrating both approaches in therapeutic contexts.",
      keywords: ["Astrology", "Psychology", "Integration", "Holistic"],
      citations: 24,
      downloads: 156,
    },
    {
      id: 2,
      title: "Spiritual Practices and Mental Health: A Comprehensive Review",
      authors: "Dr. Amit Kumar Pushpam, Dr. Rajesh Kumar",
      year: 2022,
      journal: "International Journal of Wellness Research",
      description:
        "A comprehensive review of the relationship between spiritual practices and mental health outcomes.",
      abstract:
        "This study analyzes peer-reviewed research on meditation, mindfulness, and other spiritual practices, revealing significant correlations with improved mental health outcomes.",
      keywords: ["Spirituality", "Mental Health", "Meditation", "Wellness"],
      citations: 38,
      downloads: 213,
    },
    {
      id: 3,
      title: "Paranormal Phenomena: Scientific Analysis and Case Studies",
      authors: "Dr. Amit Kumar Pushpam",
      year: 2021,
      journal: "Research Quarterly on Unusual Phenomena",
      description:
        "Scientific analysis of paranormal phenomena with documented case studies and explanations.",
      abstract:
        "This paper presents a scientific framework for understanding and analyzing reported paranormal occurrences, including case studies and methodological approaches.",
      keywords: ["Paranormal", "Scientific Analysis", "Case Studies", "Occult"],
      citations: 15,
      downloads: 98,
    },
  ];

  const [selectedPaper, setSelectedPaper] = useState(null);

  return (
    <div className="research">
      {/* Hero Section */}
      <section className="research-hero">
        <div className="container">
          <h1>Research & Publications</h1>
          <p>Peer-reviewed studies and publications by our experts</p>
        </div>
      </section>

      {/* Research Content */}
      <section className="research-content">
        <div className="container">
          <div className="papers-list">
            {papers.map((paper, index) => (
              <div key={paper.id} className="paper-card">
                <div className="paper-header">
                  <div className="paper-number">#{index + 1}</div>
                  <div className="paper-icon">
                    <FaFileAlt />
                  </div>
                  <div className="paper-meta">
                    <span className="paper-year">{paper.year}</span>
                    <span className="paper-journal">{paper.journal}</span>
                  </div>
                </div>

                <h3 className="paper-title">{paper.title}</h3>

                <div className="paper-authors">
                  <FaUser className="author-icon" />
                  <p>{paper.authors}</p>
                </div>

                <p className="paper-description">{paper.description}</p>

                <div className="paper-stats">
                  <span className="stat">
                    <strong>{paper.citations}</strong> Citations
                  </span>
                  <span className="stat">
                    <strong>{paper.downloads}</strong> Downloads
                  </span>
                </div>

                <button
                  className="read-btn"
                  onClick={() => setSelectedPaper(selectedPaper?.id === paper.id ? null : paper)}
                >
                  {selectedPaper?.id === paper.id ? "Hide Details" : "View Details"}
                </button>

                {selectedPaper?.id === paper.id && (
                  <div className="paper-details">
                    <div className="abstract-section">
                      <h4>Abstract</h4>
                      <p>{paper.abstract}</p>
                    </div>

                    <div className="keywords-section">
                      <h4>Keywords</h4>
                      <div className="keywords">
                        {paper.keywords.map((keyword, idx) => (
                          <span key={idx} className="keyword">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="btn btn-primary download-paper">
                      <FaDownload /> Download PDF
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="research-cta">
        <div className="container">
          <div className="cta-content">
            <FaQuoteLeft className="quote-icon" />
            <h2>"Knowledge is the foundation of transformation"</h2>
            <p>- Dr. Amit Kumar Pushpam</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Research;