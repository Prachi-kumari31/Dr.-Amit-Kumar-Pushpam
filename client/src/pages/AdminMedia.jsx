import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaCloudUploadAlt,
  FaImages,
  FaVideo,
  FaTrash,
  FaStar,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import {
  getAdminMedia,
  uploadMedia,
  deleteMedia,
  updateMedia,
} from "../api/mediaApi";

import "./AdminMedia.css";

import AdminLayout from "../components/AdminLayout";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://dr-amit-kumar-pushpam-1.onrender.com/api";

const SERVER_URL =
  API_URL.replace(/\/api\/?$/, "");

const getMediaUrl = (url) => {
  if (!url) {
    return "";
  }

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  return `${SERVER_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function AdminMedia() {
  const fileInputRef =
    useRef(null);

  const [media, setMedia] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      category: "General",
      tags: "",
      isFeatured: false,
      status: "published",
    });

  const [search, setSearch] =
    useState("");

  const [type, setType] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadMedia = async () => {
    try {
      setLoading(true);

      const response =
        await getAdminMedia({
          limit: 100,
          ...(search
            ? { search }
            : {}),
          ...(type
            ? { type }
            : {}),
        });

      setMedia(
        Array.isArray(
          response?.data
        )
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch media:",
        error
      );

      setError(
        error?.response?.data
          ?.message ||
          "Failed to load media."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [type]);

  const handleFileChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  setError("");
  setSuccess("");

  /*
  |--------------------------------------------------------------------------
  | VALIDATE FILE
  |--------------------------------------------------------------------------
  */

  const isImage =
    file.type?.startsWith("image/");

  const isVideo =
    file.type?.startsWith("video/");

  if (!isImage && !isVideo) {
    setError(
      "Only image and video files are allowed."
    );

    event.target.value = "";
    return;
  }

  const maxSize = isVideo
    ? 100 * 1024 * 1024
    : 10 * 1024 * 1024;

  if (file.size > maxSize) {
    setError(
      isVideo
        ? "Video must be 100 MB or smaller."
        : "Image must be 10 MB or smaller."
    );

    event.target.value = "";
    return;
  }

  /*
  |--------------------------------------------------------------------------
  | PREVIEW
  |--------------------------------------------------------------------------
  */

  if (preview) {
    URL.revokeObjectURL(preview);
  }

  const objectUrl =
    URL.createObjectURL(file);

  setSelectedFile(file);
  setPreview(objectUrl);

  /*
  |--------------------------------------------------------------------------
  | AUTO TITLE
  |--------------------------------------------------------------------------
  */

  if (!form.title.trim()) {
    setForm((prev) => ({
      ...prev,
      title: file.name.replace(
        /\.[^/.]+$/,
        ""
      ),
    }));
  }
};
  const handleUpload = async (event) => {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!selectedFile) {
    setError(
      "Please select an image or video."
    );
    return;
  }

  if (!form.title.trim()) {
    setError(
      "Please enter a title."
    );
    return;
  }

  try {
    setUploading(true);

    console.log(
      "Uploading media:",
      {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        title: form.title,
        category: form.category,
        tags: form.tags,
      }
    );

    const response =
      await uploadMedia({
        file: selectedFile,

        title:
          form.title.trim(),

        description:
          form.description.trim(),

        category:
          form.category.trim() ||
          "General",

        tags:
          form.tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
            .filter(Boolean),

        isFeatured:
          Boolean(
            form.isFeatured
          ),

        status:
          form.status ===
          "draft"
            ? "draft"
            : "published",
      });

    console.log(
      "Upload response:",
      response
    );

    setSuccess(
      "Media uploaded successfully."
    );

    /*
    |--------------------------------------------------------------------------
    | Cleanup preview URL
    |--------------------------------------------------------------------------
    */

    if (preview) {
      URL.revokeObjectURL(
        preview
      );
    }

    setSelectedFile(null);
    setPreview("");

    setForm({
      title: "",
      description: "",
      category: "General",
      tags: "",
      isFeatured: false,
      status: "published",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }

    await loadMedia();
  } catch (error) {
    console.error(
      "Media upload failed:",
      error
    );

    console.error(
      "Server response:",
      error?.response?.data
    );

    setError(
      error?.response?.data
        ?.message ||
        error?.message ||
        "Failed to upload media."
    );
  } finally {
    setUploading(false);
  }
};

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this media?"
        );

      if (!confirmed) return;

      try {
        await deleteMedia(id);

        setMedia((prev) =>
          prev.filter(
            (item) =>
              item._id !== id
          )
        );

        setSuccess(
          "Media deleted successfully."
        );
      } catch (error) {
        console.error(
          "Delete media failed:",
          error
        );

        setError(
          error?.response?.data
            ?.message ||
          "Failed to delete media."
        );
      }
    };

  const toggleFeatured =
    async (item) => {
      try {
        const response =
          await updateMedia(
            item._id,
            {
              isFeatured:
                !item.isFeatured,
            }
          );

        const updated =
          response?.data;

        setMedia((prev) =>
          prev.map((mediaItem) =>
            mediaItem._id ===
            item._id
              ? {
                  ...mediaItem,
                  isFeatured:
                    updated?.isFeatured ??
                    !item.isFeatured,
                }
              : mediaItem
          )
        );
      } catch (error) {
        console.error(
          error
        );

        setError(
          error?.response?.data
            ?.message ||
          "Failed to update media."
        );
      }
    };

  return (
    
    <div className="admin-media-page">

      {/* HEADER */}

      <header className="admin-media-header">

        <div>
          <span>
            CONTENT MANAGEMENT
          </span>

          <h1>
            Media & Gallery
          </h1>

          <p>
            Manage images and videos
            displayed across the website.
          </p>
        </div>

        <button
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="admin-upload-top"
        >
          <FaCloudUploadAlt />
          Upload Media
        </button>

      </header>

      {/* ALERTS */}

      {error && (
        <div className="admin-media-alert error">
          {error}

          <button
            onClick={() =>
              setError("")
            }
          >
            <FaTimes />
          </button>
        </div>
      )}

      {success && (
        <div className="admin-media-alert success">
          {success}

          <button
            onClick={() =>
              setSuccess("")
            }
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* UPLOAD SECTION */}

      <section className="admin-upload-section">

        <div className="upload-preview">

          {!preview ? (
            <button
              type="button"
              className="upload-dropzone"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <FaCloudUploadAlt />

              <strong>
                Choose Image or Video
              </strong>

              <span>
                Images up to 10MB
                <br />
                Videos up to 100MB
              </span>
            </button>
          ) : selectedFile?.type?.startsWith(
              "image/"
            ) ? (
            <img
              src={preview}
              alt="Preview"
            />
          ) : (
            <video
              src={preview}
              controls
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept="image/*,video/*"
            onChange={
              handleFileChange
            }
          />

        </div>

        <form
          className="media-upload-form"
          onSubmit={
            handleUpload
          }
        >

          <h2>
            Add New Media
          </h2>

          <label>
            Title
            <input
              value={
                form.title
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              placeholder="Enter media title"
            />
          </label>

          <label>
            Description

            <textarea
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              placeholder="Short description..."
              rows="4"
            />
          </label>

          <div className="form-row">

            <label>
              Category

              <input
                value={
                  form.category
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                  })
                }
                placeholder="Events"
              />
            </label>

            <label>
              Tags

              <input
                value={
                  form.tags
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    tags:
                      e.target.value,
                  })
                }
                placeholder="event, foundation"
              />
            </label>

          </div>

          <div className="upload-options">

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={
                  form.isFeatured
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    isFeatured:
                      e.target.checked,
                  })
                }
              />

              <FaStar />

              Featured Media
            </label>

            <select
              value={
                form.status
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value,
                })
              }
            >
              <option value="published">
                Published
              </option>

              <option value="draft">
                Draft
              </option>
            </select>

          </div>

          <button
            type="submit"
            disabled={uploading}
            className="upload-submit"
          >
            <FaCloudUploadAlt />

            {uploading
              ? "Uploading..."
              : "Upload Media"}
          </button>

        </form>

      </section>

      {/* MEDIA MANAGEMENT */}

      <section className="admin-media-library">

        <div className="library-header">

          <div>
            <h2>
              Media Library
            </h2>

            <p>
              {media.length} media
              items
            </p>
          </div>

          <div className="library-filters">

            <div className="search-box">
              <FaSearch />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    loadMedia();
                  }
                }}
                placeholder="Search media..."
              />
            </div>

            <button
              className={
                type === ""
                  ? "active"
                  : ""
              }
              onClick={() =>
                setType("")
              }
            >
              All
            </button>

            <button
              className={
                type === "image"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setType(
                  "image"
                )
              }
            >
              <FaImages />
              Images
            </button>

            <button
              className={
                type === "video"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setType(
                  "video"
                )
              }
            >
              <FaVideo />
              Videos
            </button>

          </div>

        </div>

        {loading ? (
          <div className="admin-media-loading">
            Loading media...
          </div>
        ) : (
          <div className="admin-media-grid">

            {media.map((item) => (
              <article
                className="admin-media-card"
                key={
                  item._id
                }
              >

                <div className="admin-media-preview">

                  {item.type ===
                  "image" ? (
                    <img
                      src={getMediaUrl(
                        item.url
                      )}
                      alt={
                        item.title
                      }
                    />
                  ) : (
                    <video
                      src={getMediaUrl(
                        item.url
                      )}
                      muted
                      controls
                    />
                  )}

                  {item.isFeatured && (
                    <span className="featured-badge">
                      <FaStar />
                      Featured
                    </span>
                  )}

                </div>

                <div className="admin-media-info">

                  <span>
                    {item.type}
                    {" • "}
                    {
                      item.category
                    }
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {
                      item.description
                    }
                  </p>

                  <div className="admin-media-actions">

                    <button
                      onClick={() =>
                        toggleFeatured(
                          item
                        )
                      }
                      className={
                        item.isFeatured
                          ? "featured"
                          : ""
                      }
                    >
                      <FaStar />
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        handleDelete(
                          item._id
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}