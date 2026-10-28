import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaMinus,
  FaUndo,
  FaRedo,
  FaSave,
  FaEye,
  FaCheck,
  FaCloud,
  FaBookOpen,
} from "react-icons/fa";

import {
  getAdminArticle,
  createArticle,
  updateArticle,
} from "../api/articleApi";

import "./AdminArticleEditor.css";

const defaultForm = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: [],
  status: "draft",
  isFeatured: false,
  allowComments: true,
  authorName: "Prosper Foundation",
  seoTitle: "",
  seoDescription: "",
};

const exec = (
  command,
  value = null
) => {
  document.execCommand(
    command,
    false,
    value
  );
};

export default function AdminArticleEditor() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const editorRef =
    useRef(null);

  const coverInputRef =
    useRef(null);

  const [form, setForm] =
    useState(defaultForm);

  const [tagsInput, setTagsInput] =
    useState("");

  const [loading, setLoading] =
    useState(Boolean(id));

  const [saving, setSaving] =
    useState(false);

  const [preview, setPreview] =
    useState(false);

  const [wordCount, setWordCount] =
    useState(0);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const updateWordCount = (
    html
  ) => {
    const text =
      html
        ?.replace(
          /<[^>]*>/g,
          " "
        )
        .replace(
          /&nbsp;/g,
          " "
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim() || "";

    setWordCount(
      text
        ? text.split(" ").length
        : 0
    );
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const response =
          await getAdminArticle(
            id
          );

        const article =
          response?.data;

        setForm({
          ...defaultForm,
          ...article,
          tags:
            article.tags || [],
        });

        setTagsInput(
          (
            article.tags || []
          ).join(", ")
        );

        setTimeout(() => {
          if (
            editorRef.current
          ) {
            editorRef.current.innerHTML =
              article.content ||
              "";

            updateWordCount(
              article.content ||
                ""
            );
          }
        }, 50);
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Unable to load article."
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleInput = () => {
    const content =
      editorRef.current
        ?.innerHTML || "";

    setForm((prev) => ({
      ...prev,
      content,
    }));

    updateWordCount(
      content
    );
  };

  const applyFont = (
    value
  ) => {
    editorRef.current?.focus();

    exec(
      "fontName",
      value
    );

    handleInput();
  };

  const applySize = (
    value
  ) => {
    editorRef.current?.focus();

    exec(
      "fontSize",
      value
    );

    handleInput();
  };

  const applyBlock = (
    value
  ) => {
    editorRef.current?.focus();

    exec(
      "formatBlock",
      value
    );

    handleInput();
  };

  const createLink = () => {
    const url =
      window.prompt(
        "Enter URL"
      );

    if (!url) return;

    editorRef.current?.focus();

    exec(
      "createLink",
      url
    );

    handleInput();
  };

  const insertImage = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      editorRef.current?.focus();

      exec(
        "insertImage",
        reader.result
      );

      handleInput();
    };

    reader.readAsDataURL(
      file
    );

    event.target.value = "";
  };

  const chooseCover = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid cover image."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        coverImage:
          reader.result,
      }));
    };

    reader.readAsDataURL(
      file
    );

    event.target.value = "";
  };

  const payload = (
    status
  ) => {
    const tags =
      tagsInput
        .split(",")
        .map(
          (tag) =>
            tag.trim()
        )
        .filter(Boolean);

    return {
      title:
        form.title.trim(),

      excerpt:
        form.excerpt.trim(),

      content:
        editorRef.current
          ?.innerHTML ||
        form.content,

      coverImage:
        form.coverImage,

      category:
        form.category,

      tags,

      status,

      isFeatured:
        form.isFeatured,

      allowComments:
        form.allowComments,

      authorName:
        form.authorName,

      seoTitle:
        form.seoTitle,

      seoDescription:
        form.seoDescription,
    };
  };

  const save = async (
    status = "draft"
  ) => {
    if (
      !form.title.trim()
    ) {
      setError(
        "Please enter an article title."
      );
      return;
    }

    if (
      !(
        editorRef.current
          ?.innerHTML ||
        ""
      ).trim()
    ) {
      setError(
        "Please write some article content."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const data =
        payload(status);

      let response;

      if (id) {
        response =
          await updateArticle(
            id,
            data
          );
      } else {
        response =
          await createArticle(
            data
          );
      }

      const saved =
        response?.data;

      setForm((prev) => ({
        ...prev,
        ...saved,
      }));

      setMessage(
        status ===
          "published"
          ? "Article published successfully."
          : "Article saved as draft."
      );

      if (!id && saved?._id) {
        navigate(
          `/admin/articles/edit/${saved._id}`,
          {
            replace: true,
          }
        );
      }
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to save article."
      );
    } finally {
      setSaving(false);
    }
  };

  const toolbar = (
    icon,
    title,
    action
  ) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) =>
        e.preventDefault()
      }
      onClick={action}
    >
      {icon}
    </button>
  );

  if (loading) {
    return (
      <div className="admin-editor-loading">
        Loading article editor...
      </div>
    );
  }

  return (
    <div className="admin-article-editor">

      {/* TOPBAR */}

      <header className="article-editor-topbar">

        <button
          className="article-editor-back"
          onClick={() =>
            navigate(
              "/admin/articles"
            )
          }
        >
          <FaArrowLeft />
          Articles
        </button>

        <div>
          <span>
            EDITORIAL STUDIO
          </span>

          <h1>
            Article Editor
          </h1>
        </div>

        <div className="article-editor-actions">

          <button
            className="preview"
            onClick={() =>
              setPreview(
                (prev) => !prev
              )
            }
            disabled={saving}
          >
            <FaEye />
            {preview
              ? "Edit"
              : "Preview"}
          </button>

          <button
            className="draft"
            onClick={() =>
              save("draft")
            }
            disabled={saving}
          >
            <FaSave />
            Save Draft
          </button>

          <button
            className="publish"
            onClick={() =>
              save("published")
            }
            disabled={saving}
          >
            <FaCheck />
            Publish
          </button>

        </div>

      </header>

      {error && (
        <div className="article-editor-message error">
          {error}
        </div>
      )}

      {message && (
        <div className="article-editor-message success">
          {message}
        </div>
      )}

      {preview ? (
        <main className="article-editor-preview">

          {form.coverImage && (
            <img
              src={
                form.coverImage
              }
              alt=""
            />
          )}

          <div className="preview-article-content">

            {form.category && (
              <span>
                {
                  form.category
                }
              </span>
            )}

            <h1>
              {form.title ||
                "Untitled Article"}
            </h1>

            <p className="preview-excerpt">
              {
                form.excerpt
              }
            </p>

            <div
              dangerouslySetInnerHTML={{
                __html:
                  form.content ||
                  "<p>No content yet.</p>",
              }}
            />

          </div>

        </main>
      ) : (
        <main className="article-editor-layout">

          {/* MAIN */}

          <section className="article-editor-main">

            <div className="article-editor-paper">

              <input
                className="article-editor-title"
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                placeholder="Article title..."
              />

              <textarea
                className="article-editor-excerpt"
                name="excerpt"
                value={
                  form.excerpt
                }
                onChange={
                  handleChange
                }
                placeholder="Write a short article excerpt..."
              />

              {/* TOOLBAR */}

              <div className="article-editor-toolbar">

                <select
                  defaultValue="p"
                  onChange={(e) =>
                    applyBlock(
                      e.target.value
                    )
                  }
                >
                  <option value="p">
                    Paragraph
                  </option>
                  <option value="h1">
                    Heading 1
                  </option>
                  <option value="h2">
                    Heading 2
                  </option>
                  <option value="h3">
                    Heading 3
                  </option>
                  <option value="blockquote">
                    Quote
                  </option>
                </select>

                <select
                  defaultValue="Georgia"
                  onChange={(e) =>
                    applyFont(
                      e.target.value
                    )
                  }
                >
                  <option value="Arial">
                    Arial
                  </option>
                  <option value="Georgia">
                    Georgia
                  </option>
                  <option value="Times New Roman">
                    Times New Roman
                  </option>
                  <option value="Verdana">
                    Verdana
                  </option>
                  <option value="Trebuchet MS">
                    Trebuchet MS
                  </option>
                  <option value="Courier New">
                    Courier New
                  </option>
                </select>

                <select
                  defaultValue="3"
                  onChange={(e) =>
                    applySize(
                      e.target.value
                    )
                  }
                >
                  <option value="2">
                    Small
                  </option>
                  <option value="3">
                    Normal
                  </option>
                  <option value="4">
                    Large
                  </option>
                  <option value="5">
                    XL
                  </option>
                  <option value="6">
                    XXL
                  </option>
                </select>

                <div className="toolbar-separator" />

                {toolbar(
                  <FaBold />,
                  "Bold",
                  () => {
                    exec("bold");
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaItalic />,
                  "Italic",
                  () => {
                    exec("italic");
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaUnderline />,
                  "Underline",
                  () => {
                    exec("underline");
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaStrikethrough />,
                  "Strike",
                  () => {
                    exec(
                      "strikeThrough"
                    );
                    handleInput();
                  }
                )}

                <div className="toolbar-separator" />

                {toolbar(
                  <FaAlignLeft />,
                  "Left",
                  () => {
                    exec(
                      "justifyLeft"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaAlignCenter />,
                  "Center",
                  () => {
                    exec(
                      "justifyCenter"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaAlignRight />,
                  "Right",
                  () => {
                    exec(
                      "justifyRight"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaAlignJustify />,
                  "Justify",
                  () => {
                    exec(
                      "justifyFull"
                    );
                    handleInput();
                  }
                )}

                <div className="toolbar-separator" />

                {toolbar(
                  <FaListUl />,
                  "Bullet list",
                  () => {
                    exec(
                      "insertUnorderedList"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaListOl />,
                  "Numbered list",
                  () => {
                    exec(
                      "insertOrderedList"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaQuoteLeft />,
                  "Quote",
                  () =>
                    applyBlock(
                      "blockquote"
                    )
                )}

                {toolbar(
                  <FaLink />,
                  "Link",
                  createLink
                )}

                {toolbar(
                  <FaImage />,
                  "Image",
                  () =>
                    document
                      .getElementById(
                        "article-inline-image"
                      )
                      ?.click()
                )}

                {toolbar(
                  <FaMinus />,
                  "Divider",
                  () => {
                    exec(
                      "insertHTML",
                      "<hr>"
                    );
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaUndo />,
                  "Undo",
                  () => {
                    exec("undo");
                    handleInput();
                  }
                )}

                {toolbar(
                  <FaRedo />,
                  "Redo",
                  () => {
                    exec("redo");
                    handleInput();
                  }
                )}

              </div>

              <input
                id="article-inline-image"
                type="file"
                accept="image/*"
                hidden
                onChange={
                  insertImage
                }
              />

              <div
                ref={
                  editorRef
                }
                className="article-rich-editor"
                contentEditable
                suppressContentEditableWarning
                onInput={
                  handleInput
                }
                data-placeholder="Start writing your article..."
              />

              <div className="article-editor-footer">
                <span>
                  {wordCount} words
                </span>

                <span>
                  {Math.max(
                    1,
                    Math.ceil(
                      wordCount /
                        200
                    )
                  )}{" "}
                  min read
                </span>

              </div>

            </div>

          </section>

          {/* SIDEBAR */}

          <aside className="article-editor-sidebar">

            <div className="article-sidebar-card">

              <div className="article-sidebar-title">
                <FaBookOpen />
                Publication
              </div>

              <label>
                Status

                <select
                  name="status"
                  value={
                    form.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>
                </select>
              </label>

              <label className="article-check">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={
                    form.isFeatured
                  }
                  onChange={
                    handleChange
                  }
                />
                Feature article
              </label>

              <label className="article-check">
                <input
                  type="checkbox"
                  name="allowComments"
                  checked={
                    form.allowComments
                  }
                  onChange={
                    handleChange
                  }
                />
                Allow comments
              </label>

            </div>

            {/* COVER */}

            <div className="article-sidebar-card">

              <div className="article-sidebar-title">
                <FaImage />
                Cover Image
              </div>

              <input
                value={
                  form.coverImage
                }
                onChange={(e) =>
                  setForm(
                    (prev) => ({
                      ...prev,
                      coverImage:
                        e.target
                          .value,
                    })
                  )
                }
                placeholder="Image URL..."
              />

              <input
                ref={
                  coverInputRef
                }
                type="file"
                accept="image/*"
                hidden
                onChange={
                  chooseCover
                }
              />

              <button
                type="button"
                className="choose-image"
                onClick={() =>
                  coverInputRef.current?.click()
                }
              >
                <FaImage />
                Choose from device
              </button>

              {form.coverImage && (
                <img
                  className="admin-cover-preview"
                  src={
                    form.coverImage
                  }
                  alt=""
                />
              )}

            </div>

            {/* ORGANIZATION */}

            <div className="article-sidebar-card">

              <div className="article-sidebar-title">
                Organization
              </div>

              <label>
                Category

                <input
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Psychology"
                />
              </label>

              <label>
                Tags

                <input
                  value={
                    tagsInput
                  }
                  onChange={(e) =>
                    setTagsInput(
                      e.target.value
                    )
                  }
                  placeholder="life, psychology, wellness"
                />
              </label>

              <label>
                Author

                <input
                  name="authorName"
                  value={
                    form.authorName
                  }
                  onChange={
                    handleChange
                  }
                />
              </label>

            </div>

            {/* SEO */}

            <div className="article-sidebar-card">

              <div className="article-sidebar-title">
                SEO
              </div>

              <label>
                SEO title

                <input
                  name="seoTitle"
                  value={
                    form.seoTitle
                  }
                  onChange={
                    handleChange
                  }
                />
              </label>

              <label>
                SEO description

                <textarea
                  name="seoDescription"
                  value={
                    form.seoDescription
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                />
              </label>

            </div>

          </aside>

        </main>
      )}

    </div>
  );
}