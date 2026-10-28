import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaCheckCircle,
  FaDownload,
  FaFilePdf,
  FaGlobe,
  FaShareAlt,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

import {
  getEbookBySlug,
} from "../api/ebookApi";

import "./EbookDetail.css";


const EbookDetail = () => {
  const { slug } = useParams();

  const navigate = useNavigate();

  const [ebook, setEbook] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [readerOpen, setReaderOpen] =
    useState(false);

  const [shareMessage, setShareMessage] =
    useState("");


  /*
  =========================================================
  LOAD EBOOK
  =========================================================
  */

  useEffect(() => {
    let mounted = true;

    const loadEbook = async () => {
      try {
        setLoading(true);
        setError("");

        if (!slug) {
          throw new Error(
            "Invalid ebook URL."
          );
        }

        const response =
          await getEbookBySlug(slug);

        if (!mounted) return;

        const data =
          response?.data || null;

        if (!data) {
          throw new Error(
            "Ebook not found."
          );
        }

        setEbook(data);

      } catch (err) {
        if (!mounted) return;

        console.error(
          "Failed to load ebook:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load this ebook."
        );

        setEbook(null);

      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadEbook();

    return () => {
      mounted = false;
    };

  }, [slug]);


  /*
  =========================================================
  HELPERS
  =========================================================
  */

  const getCover = () => {
    return (
      ebook?.cover ||
      ebook?.coverImage ||
      ebook?.thumbnail ||
      ""
    );
  };


  const getFileUrl = () => {
    return (
      ebook?.fileUrl ||
      ebook?.pdfUrl ||
      ebook?.downloadLink ||
      ""
    );
  };


  const isFree =
    Number(
      ebook?.price ?? 0
    ) <= 0;


  const fileFormat =
    ebook?.fileFormat ||
    ebook?.format ||
    "PDF";


  /*
  =========================================================
  SHARE
  =========================================================
  */

  const handleShare = async () => {
    if (!ebook) return;

    const url =
      window.location.href;

    try {

      if (
        navigator.share
      ) {

        await navigator.share({
          title:
            ebook.title,

          text:
            ebook.excerpt ||
            ebook.description ||
            "Explore this ebook.",

          url,
        });

      } else {

        await navigator.clipboard.writeText(
          url
        );

        setShareMessage(
          "Link copied"
        );

        setTimeout(() => {
          setShareMessage("");
        }, 2200);

      }

    } catch (err) {

      console.log(
        "Share cancelled"
      );

    }
  };


  /*
  =========================================================
  READ ONLINE
  =========================================================
  */

  const handleReadOnline = () => {

    const fileUrl =
      getFileUrl();

    if (!fileUrl) {

      setError(
        "The ebook file is currently unavailable."
      );

      return;
    }

    setReaderOpen(true);
  };


  /*
  =========================================================
  DOWNLOAD
  =========================================================
  */

  const handleDownload = () => {

    const fileUrl =
      getFileUrl();

    if (!fileUrl) {

      setError(
        "The ebook file is currently unavailable."
      );

      return;
    }

    const link =
      document.createElement(
        "a"
      );

    link.href =
      fileUrl;

    link.target =
      "_blank";

    link.rel =
      "noopener noreferrer";

    link.click();
  };


  /*
  =========================================================
  CLOSE READER
  =========================================================
  */

  const closeReader = () => {
    setReaderOpen(false);
  };


  /*
  =========================================================
  LOADING
  =========================================================
  */

  if (loading) {

    return (

      <div className="ebook-detail-loading">

        <div className="detail-loading-card">

          <div className="detail-spinner" />

          <h3>
            Preparing your reading experience
          </h3>

          <p>
            Please wait while we load the ebook.
          </p>

        </div>

      </div>

    );
  }


  /*
  =========================================================
  ERROR
  =========================================================
  */

  if (error || !ebook) {

    return (

      <div className="ebook-detail-error-page">

        <div className="ebook-error-icon">
          <FaBookOpen />
        </div>

        <span>
          DIGITAL LIBRARY
        </span>

        <h1>
          Ebook unavailable
        </h1>

        <p>
          {error ||
            "The ebook you are looking for could not be found."}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/ebooks")
          }
        >
          <FaArrowLeft />
          Back to Library
        </button>

      </div>

    );
  }


  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (

    <div className="ebook-detail-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="ebook-detail-hero">

        <div className="detail-hero-pattern" />

        <div className="ebook-detail-container">

          <Link
            to="/ebooks"
            className="detail-back-link"
          >
            <FaArrowLeft />
            Back to Library
          </Link>


          <div className="detail-hero-grid">

            <div className="detail-hero-copy">

              <span className="detail-eyebrow">
                PROSPER FOUNDATION
                <span />
                DIGITAL EDITION
              </span>


              <div className="detail-category">
                {ebook.category ||
                  "Knowledge"}
              </div>


              <h1>
                {ebook.title}
              </h1>


              <p className="detail-author">
                Written by{" "}
                <strong>
                  {ebook.author ||
                    "Prosper Foundation"}
                </strong>
              </p>


              {ebook.excerpt && (

                <p className="detail-hero-excerpt">
                  {ebook.excerpt}
                </p>

              )}


              <div className="detail-hero-actions">

                <button
                  type="button"
                  className="primary-read-button"
                  onClick={
                    handleReadOnline
                  }
                >
                  <FaBookOpen />
                  Read Online
                  <FaArrowRight />
                </button>


                <button
                  type="button"
                  className="secondary-share-button"
                  onClick={
                    handleShare
                  }
                >
                  <FaShareAlt />
                  Share
                </button>

              </div>


              {shareMessage && (
                <span className="share-success">
                  <FaCheckCircle />
                  {shareMessage}
                </span>
              )}

            </div>


            {/* HERO COVER */}

            <div className="detail-hero-cover-wrapper">

              <div className="detail-cover-shadow" />

              <div className="detail-hero-cover">

                {getCover() ? (

                  <img
                    src={getCover()}
                    alt={ebook.title}
                  />

                ) : (

                  <div className="detail-cover-placeholder">

                    <FaBookOpen />

                    <span>
                      Prosper Foundation
                    </span>

                  </div>

                )}


                {isFree && (
                  <div className="detail-free-badge">
                    FREE
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          QUICK INFORMATION
      ================================================= */}

      <section className="detail-info-section">

        <div className="ebook-detail-container">

          <div className="detail-info-card">

            <div className="detail-info-item">

              <div className="detail-info-icon">
                <FaBookOpen />
              </div>

              <div>
                <span>
                  Pages
                </span>

                <strong>
                  {ebook.pages ||
                    "—"}
                </strong>
              </div>

            </div>


            <div className="detail-info-item">

              <div className="detail-info-icon">
                <FaGlobe />
              </div>

              <div>
                <span>
                  Language
                </span>

                <strong>
                  {ebook.language ||
                    "English"}
                </strong>
              </div>

            </div>


            <div className="detail-info-item">

              <div className="detail-info-icon">
                <FaFilePdf />
              </div>

              <div>
                <span>
                  Format
                </span>

                <strong>
                  {fileFormat}
                </strong>
              </div>

            </div>


            <div className="detail-info-item">

              <div className="detail-info-icon">
                <FaFileAlt />
              </div>

              <div>
                <span>
                  Access
                </span>

                <strong
                  className={
                    isFree
                      ? "free-access"
                      : ""
                  }
                >
                  {isFree
                    ? "Free"
                    : `₹${ebook.price}`}
                </strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <main className="ebook-detail-main">

        <div className="ebook-detail-container">

          <div className="detail-content-grid">

            {/* LEFT CONTENT */}

            <article className="detail-content">

              <span className="content-kicker">
                ABOUT THIS BOOK
              </span>

              <h2>
                Discover the ideas
                inside
              </h2>


              <div className="content-divider">
                <span />
              </div>


              <div className="detail-description">

                {ebook.description
                  ?.split(/\n+/)
                  .filter(
                    (paragraph) =>
                      paragraph.trim()
                  )
                  .map(
                    (
                      paragraph,
                      index
                    ) => (

                      <p
                        key={index}
                      >
                        {paragraph}
                      </p>

                    )
                  )}

                {!ebook.description &&
                  ebook.excerpt && (

                    <p>
                      {ebook.excerpt}
                    </p>

                  )}

              </div>


              {/* TOPICS */}

              {Array.isArray(
                ebook.tags
              ) &&
                ebook.tags.length >
                  0 && (

                  <section className="detail-topics">

                    <h3>
                      Topics covered
                    </h3>

                    <div className="topic-list">

                      {ebook.tags.map(
                        (
                          tag,
                          index
                        ) => (

                          <span
                            key={index}
                          >
                            #{tag}
                          </span>

                        )
                      )}

                    </div>

                  </section>

                )}

            </article>


            {/* RIGHT SIDEBAR */}

            <aside className="detail-reading-card">

              <div className="reading-card-icon">
                <FaBookOpen />
              </div>


              <span className="reading-kicker">
                YOUR READING EXPERIENCE
              </span>


              <h3>
                Ready to explore
                this book?
              </h3>


              <p>
                Open the complete digital
                edition and read it directly
                from your browser.
              </p>


              <button
                type="button"
                className="reading-primary-button"
                onClick={
                  handleReadOnline
                }
              >
                <FaBookOpen />
                Read Ebook
              </button>


              {getFileUrl() && (

                <button
                  type="button"
                  className="reading-download-button"
                  onClick={
                    handleDownload
                  }
                >
                  <FaDownload />
                  Download PDF
                </button>

              )}


              <div className="reading-features">

                <div>
                  <FaCheckCircle />
                  <span>
                    Instant browser reading
                  </span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>
                    Complete digital edition
                  </span>
                </div>

                <div>
                  <FaCheckCircle />
                  <span>
                    {ebook.pages ||
                      "Full"}{" "}
                    pages of content
                  </span>
                </div>

              </div>

            </aside>

          </div>

        </div>

      </main>


      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <section className="detail-bottom-section">

        <div className="ebook-detail-container">

          <div className="detail-bottom-inner">

            <div>

              <span>
                PROSPER FOUNDATION
              </span>

              <h2>
                Continue exploring
                our library.
              </h2>

            </div>


            <Link
              to="/ebooks"
              className="browse-library-button"
            >
              Browse Library
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          PDF READER
      ================================================= */}

      {readerOpen && (

        <div
          className="ebook-reader-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Ebook reader"
        >

          <div className="ebook-reader">

            <header className="reader-header">

              <div className="reader-title">

                <div className="reader-pdf-icon">
                  <FaFilePdf />
                </div>

                <div>

                  <strong>
                    {ebook.title}
                  </strong>

                  <span>
                    {fileFormat} · Online Reader
                  </span>

                </div>

              </div>


              <div className="reader-actions">

                <button
                  type="button"
                  onClick={
                    handleDownload
                  }
                  title="Download ebook"
                  aria-label="Download ebook"
                >
                  <FaDownload />
                </button>


                <button
                  type="button"
                  onClick={
                    closeReader
                  }
                  title="Close reader"
                  aria-label="Close reader"
                >
                  <FaTimes />
                </button>

              </div>

            </header>


            <div className="reader-body">

              {getFileUrl() ? (

                <iframe
                  src={`${getFileUrl()}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={`Reading ${ebook.title}`}
                  className="ebook-pdf-reader"
                />

              ) : (

                <div className="reader-unavailable">

                  <FaFilePdf />

                  <h3>
                    PDF unavailable
                  </h3>

                  <p>
                    The ebook file is not
                    currently available.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
};


export default EbookDetail;