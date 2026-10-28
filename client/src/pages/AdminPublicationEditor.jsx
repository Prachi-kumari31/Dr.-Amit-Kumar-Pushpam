import React, {
  useEffect,
  useState,
} from "react";

import {
  FaSave,
  FaArrowLeft,
  FaEye,
} from "react-icons/fa";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./AdminPublicationEditor.css";
import AdminLayout from "../components/AdminLayout";
import { apiFetch } from "../utils/api";

const AdminPublicationEditor =
  () => {
    const navigate =
      useNavigate();

    const { id } =
      useParams();

    const [
      searchParams,
    ] = useSearchParams();

    const queryType =
      searchParams.get("type") ||
      "blog";

    const editing =
      Boolean(id);

    const [form, setForm] =
      useState({
        title: "",
        type: queryType,
        author:
          "Prosper Foundation",
        category: "",
        excerpt: "",
        content: "",
        coverImage: "",
        tags: "",
        seoTitle: "",
        seoDescription: "",
      });

    const [loading, setLoading] =
      useState(false);

    useEffect(() => {
      if (!editing) return;

      const load = async () => {
        try {
          const response =
            await apiFetch(
              `/publications/admin/all`
            );

          const item =
            response.data.find(
              (x) =>
                x._id === id
            );

          if (!item) {
            return;
          }

          setForm({
            title:
              item.title || "",
            type:
              item.type || "blog",
            author:
              item.author || "",
            category:
              item.category || "",
            excerpt:
              item.excerpt || "",
            content:
              item.content || "",
            coverImage:
              item.coverImage ||
              "",
            tags:
              Array.isArray(
                item.tags
              )
                ? item.tags.join(
                    ", "
                  )
                : "",
            seoTitle:
              item.seoTitle ||
              "",
            seoDescription:
              item.seoDescription ||
              "",
          });
        } catch (error) {
          alert(error.message);
        }
      };

      load();
    }, [id]);

    const change = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    const submit = async (
      e
    ) => {
      e.preventDefault();

      if (
        !form.title.trim() ||
        !form.content.trim()
      ) {
        alert(
          "Title and content are required."
        );
        return;
      }

      try {
        setLoading(true);

        const payload = {
          ...form,
          tags: form.tags
            .split(",")
            .map(
              (tag) =>
                tag.trim()
            )
            .filter(Boolean),
        };

        if (editing) {
          await apiFetch(
            `/publications/${id}`,
            {
              method: "PUT",
              body:
                JSON.stringify(
                  payload
                ),
            }
          );
        } else {
          await apiFetch(
            "/publications",
            {
              method: "POST",
              body:
                JSON.stringify(
                  payload
                ),
            }
          );
        }

        navigate(
          `/admin/publications?type=${form.type}`
        );
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className="publication-editor">

          <button
            className="back-button"
            onClick={() =>
              navigate(
                `/admin/publications?type=${form.type}`
              )
            }
          >
            <FaArrowLeft />
            Back
          </button>

          <div className="editor-header">

            <div>
              <span>
                CONTENT STUDIO
              </span>

              <h1>
                {editing
                  ? "Edit Content"
                  : "Create Content"}
              </h1>

              <p>
                Prepare your content
                before publishing it
                to your readers.
              </p>
            </div>

          </div>

          <form
            className="publication-form"
            onSubmit={submit}
          >

            <div className="form-section">

              <h2>
                Basic Information
              </h2>

              <div className="editor-grid">

                <label>
                  Content Type

                  <select
                    name="type"
                    value={form.type}
                    onChange={change}
                  >
                    <option value="blog">
                      Blog
                    </option>

                    <option value="story">
                      Story
                    </option>

                    <option value="poem">
                      Poem
                    </option>

                    <option value="book">
                      Book
                    </option>

                    <option value="article">
                      Article
                    </option>

                    <option value="publication">
                      Publication
                    </option>
                  </select>
                </label>

                <label>
                  Author

                  <input
                    name="author"
                    value={
                      form.author
                    }
                    onChange={change}
                  />
                </label>

              </div>

              <label>
                Title *

                <input
                  name="title"
                  value={form.title}
                  onChange={change}
                  placeholder="Enter title..."
                />
              </label>

              <label>
                Category

                <input
                  name="category"
                  value={
                    form.category
                  }
                  onChange={change}
                  placeholder="Category..."
                />
              </label>

              <label>
                Cover Image URL

                <input
                  name="coverImage"
                  value={
                    form.coverImage
                  }
                  onChange={change}
                  placeholder="https://..."
                />
              </label>

              <label>
                Short Description

                <textarea
                  name="excerpt"
                  rows="4"
                  value={
                    form.excerpt
                  }
                  onChange={change}
                />
              </label>

            </div>

            <div className="form-section">

              <h2>
                Main Content
              </h2>

              <label>
                Content *

                <textarea
                  className="main-editor"
                  name="content"
                  value={
                    form.content
                  }
                  onChange={change}
                  placeholder="Write your content here..."
                />
              </label>

            </div>

            <div className="form-section">

              <h2>
                Discoverability
              </h2>

              <label>
                Tags

                <input
                  name="tags"
                  value={form.tags}
                  onChange={change}
                  placeholder="spirituality, psychology, education"
                />
              </label>

              <label>
                SEO Title

                <input
                  name="seoTitle"
                  value={
                    form.seoTitle
                  }
                  onChange={change}
                />
              </label>

              <label>
                SEO Description

                <textarea
                  name="seoDescription"
                  value={
                    form.seoDescription
                  }
                  onChange={change}
                />
              </label>

            </div>

            <div className="editor-actions">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/publications?type=${form.type}`
                  )
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
              >
                <FaSave />

                {loading
                  ? "Saving..."
                  : editing
                  ? "Update Content"
                  : "Save Draft"}
              </button>

            </div>

          </form>

        </div>
    );
  };

export default AdminPublicationEditor;