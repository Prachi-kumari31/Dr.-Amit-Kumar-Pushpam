import React, {
  useEffect,
  useState,
} from "react";

import {
  FaPlay,
  FaTimes,
  FaImages,
  FaVideo,
  FaFilter,
} from "react-icons/fa";

import {
  getMedia,
  getMediaCategories,
} from "../api/mediaApi";

import "./MediaGallery.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://dr-amit-kumar-pushpam-1.onrender.com/api";

const SERVER_URL =
  API_URL.replace(
    "/api",
    ""
  );

const getMediaUrl = (url) => {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${SERVER_URL}${url}`;
};

export default function MediaGallery() {
  const [media, setMedia] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [activeType, setActiveType] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [selected, setSelected] =
    useState(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);

      const response =
        await getMedia({
          limit: 50,
          ...(activeType
            ? {
                type: activeType,
              }
            : {}),
          ...(activeCategory
            ? {
                category:
                  activeCategory,
              }
            : {}),
        });

      const data =
        Array.isArray(
          response?.data
        )
          ? response.data
          : [];

      setMedia(data);
    } catch (error) {
      console.error(
        "Failed to load gallery:",
        error
      );

      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [
    activeType,
    activeCategory,
  ]);

  useEffect(() => {
    const loadCategories =
      async () => {
        try {
          const data =
            await getMediaCategories();

          setCategories(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(
            "Failed to load categories:",
            error
          );
        }
      };

    loadCategories();
  }, []);

  return (
    <div className="media-gallery-page">

      {/* HERO */}

      <section className="media-gallery-hero">

        <div className="media-hero-decoration">
          <FaImages />
        </div>

        <div className="media-hero-content">

          <span className="media-eyebrow">
            Dr. Amit Kumar Pushpam
          </span>

          <h1>
            Moments That
            <span> Inspire</span>
          </h1>

          <p>
            Explore our collection of
            meaningful moments, events,
            stories and visual memories.
          </p>

        </div>

      </section>

      {/* FILTERS */}

      <section className="media-filter-section">

        <div className="media-filter-inner">

          <div className="filter-heading">
            <FaFilter />
            <span>
              Explore Gallery
            </span>
          </div>

          <div className="media-filter-buttons">

            <button
              className={
                activeType === ""
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveType("")
              }
            >
              All
            </button>

            <button
              className={
                activeType === "image"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveType(
                  "image"
                )
              }
            >
              <FaImages />
              Images
            </button>

            <button
              className={
                activeType === "video"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveType(
                  "video"
                )
              }
            >
              <FaVideo />
              Videos
            </button>

          </div>

          {categories.length >
            0 && (
            <select
              value={
                activeCategory
              }
              onChange={(e) =>
                setActiveCategory(
                  e.target.value
                )
              }
            >
              <option value="">
                All Categories
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          )}

        </div>

      </section>

      {/* GALLERY */}

      <main className="media-gallery-main">

        {loading ? (
          <div className="media-loading">
            <div className="media-spinner" />
            <p>
              Loading gallery...
            </p>
          </div>
        ) : media.length === 0 ? (
          <div className="media-empty">
            <FaImages />
            <h3>
              No media found
            </h3>
            <p>
              There is no media available
              for this filter.
            </p>
          </div>
        ) : (
          <div className="media-grid">

            {media.map((item) => (
              <article
                key={item._id}
                className={
                  item.type === "video"
                    ? "media-card video-card"
                    : "media-card"
                }
                onClick={() =>
                  setSelected(item)
                }
              >

                <div className="media-card-image">

                  {item.type ===
                  "image" ? (
                    <img
                      src={getMediaUrl(
                        item.url
                      )}
                      alt={
                        item.title
                      }
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={getMediaUrl(
                        item.url
                      )}
                      muted
                      preload="metadata"
                    />
                  )}

                  <div className="media-card-overlay">

                    {item.type ===
                      "video" && (
                      <span className="video-play">
                        <FaPlay />
                      </span>
                    )}

                    <span className="view-media">
                      View
                    </span>

                  </div>

                </div>

                <div className="media-card-content">

                  <span className="media-category">
                    {item.category ||
                      "General"}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  {item.description && (
                    <p>
                      {
                        item.description
                      }
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </main>

      {/* LIGHTBOX */}

      {selected && (
        <div
          className="media-lightbox"
          onClick={() =>
            setSelected(null)
          }
        >

          <button
            className="lightbox-close"
            onClick={() =>
              setSelected(null)
            }
          >
            <FaTimes />
          </button>

          <div
            className="lightbox-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {selected.type ===
            "image" ? (
              <img
                src={getMediaUrl(
                  selected.url
                )}
                alt={
                  selected.title
                }
              />
            ) : (
              <video
                src={getMediaUrl(
                  selected.url
                )}
                controls
                autoPlay
              />
            )}

            <div className="lightbox-info">

              <span>
                {selected.category}
              </span>

              <h2>
                {selected.title}
              </h2>

              {selected.description && (
                <p>
                  {
                    selected.description
                  }
                </p>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}