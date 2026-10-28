// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaSave,
//   FaEye,
//   FaImage,
//   FaTrash,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaListUl,
//   FaListOl,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
// } from "react-icons/fa";
// import AdminLayout from "../components/AdminLayout";
// import { apiFetch } from "../utils/api";
// import "./AdminPoemEditor.css";

// const AdminPoemEditor = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const isEditing = Boolean(id);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     excerpt: "",
//     content: "",
//     coverImage: "",
//     category: "",
//     tags: "",
//     status: "draft",
//   });

//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(isEditing);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // --------------------------------------------------
//   // FETCH POEM
//   // --------------------------------------------------

//   useEffect(() => {
//     if (!isEditing) return;

//     const fetchPoem = async () => {
//       try {
//         setFetching(true);
//         setError("");

//         const response = await apiFetch(`/poems/${id}`);

//         const poem = response?.data || response;

//         setFormData({
//           title: poem.title || "",
//           author: poem.author || "",
//           excerpt: poem.excerpt || "",
//           content: poem.content || "",
//           coverImage: poem.coverImage || "",
//           category: poem.category || "",
//           tags: Array.isArray(poem.tags)
//             ? poem.tags.join(", ")
//             : poem.tags || "",
//           status: poem.status || "draft",
//         });
//       } catch (err) {
//         console.error("Fetch poem error:", err);
//         setError(err.message || "Unable to load poem.");
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchPoem();
//   }, [id, isEditing]);

//   // --------------------------------------------------
//   // INPUT HANDLER
//   // --------------------------------------------------

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // --------------------------------------------------
//   // IMAGE FROM DEVICE
//   // --------------------------------------------------

//   const handleImageUpload = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setFormData((prev) => ({
//         ...prev,
//         coverImage: reader.result,
//       }));
//     };

//     reader.readAsDataURL(file);
//   };

//   // --------------------------------------------------
//   // REMOVE IMAGE
//   // --------------------------------------------------

//   const removeImage = () => {
//     setFormData((prev) => ({
//       ...prev,
//       coverImage: "",
//     }));
//   };

//   // --------------------------------------------------
//   // EDITOR COMMAND
//   // --------------------------------------------------

//   const execCommand = (command, value = null) => {
//     document.execCommand(command, false, value);
//   };

//   // --------------------------------------------------
//   // SAVE
//   // --------------------------------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title.trim()) {
//       setError("Please enter poem title.");
//       return;
//     }

//     if (!formData.content.trim()) {
//       setError("Please write the poem content.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setMessage("");

//       const payload = {
//         ...formData,
//         tags: formData.tags
//           .split(",")
//           .map((tag) => tag.trim())
//           .filter(Boolean),
//       };

//       if (isEditing) {
//         await apiFetch(`/poems/${id}`, {
//           method: "PUT",
//           body: JSON.stringify(payload),
//         });

//         setMessage("Poem updated successfully.");
//       } else {
//         await apiFetch("/poems", {
//           method: "POST",
//           body: JSON.stringify(payload),
//         });

//         setMessage("Poem created successfully.");

//         setTimeout(() => {
//           navigate("/admin/poems");
//         }, 1000);
//       }
//     } catch (err) {
//       console.error("Save poem error:", err);

//       setError(
//         err.message || "Unable to save poem."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --------------------------------------------------
//   // LOADING
//   // --------------------------------------------------

//   if (fetching) {
//     return (
//       <AdminLayout>
//         <div className="poem-editor-loading">
//           Loading poem...
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="poem-editor-page">

//         {/* HEADER */}

//         <div className="editor-header">

//           <button
//             type="button"
//             className="back-button"
//             onClick={() => navigate("/admin/poems")}
//           >
//             <FaArrowLeft />
//             Back to Poems
//           </button>

//           <div className="editor-title">
//             <span>POEM MANAGEMENT</span>

//             <h1>
//               {isEditing
//                 ? "Edit Poem"
//                 : "Create New Poem"}
//             </h1>

//             <p>
//               Write and publish beautiful poems
//               for your readers.
//             </p>
//           </div>

//           <div className="editor-header-actions">

//             <button
//               type="button"
//               className="preview-button"
//               onClick={() =>
//                 window.open(
//                   `/poems/preview/${id || ""}`,
//                   "_blank"
//                 )
//               }
//             >
//               <FaEye />
//               Preview
//             </button>

//             <button
//               type="submit"
//               form="poem-editor-form"
//               className="save-button"
//               disabled={loading}
//             >
//               <FaSave />

//               {loading
//                 ? "Saving..."
//                 : "Save Poem"}
//             </button>

//           </div>

//         </div>

//         {/* MESSAGES */}

//         {error && (
//           <div className="editor-message error">
//             {error}
//           </div>
//         )}

//         {message && (
//           <div className="editor-message success">
//             {message}
//           </div>
//         )}

//         {/* FORM */}

//         <form
//           id="poem-editor-form"
//           onSubmit={handleSubmit}
//           className="poem-editor-layout"
//         >

//           {/* MAIN EDITOR */}

//           <div className="editor-main">

//             <div className="editor-card">

//               <div className="form-group">

//                 <label>
//                   Poem Title *
//                 </label>

//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   placeholder="Enter poem title..."
//                 />

//               </div>

//               <div className="form-row">

//                 <div className="form-group">

//                   <label>
//                     Author
//                   </label>

//                   <input
//                     type="text"
//                     name="author"
//                     value={formData.author}
//                     onChange={handleChange}
//                     placeholder="Poet / Author name"
//                   />

//                 </div>

//                 <div className="form-group">

//                   <label>
//                     Category
//                   </label>

//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     placeholder="Love, Life, Spiritual..."
//                   />

//                 </div>

//               </div>

//               {/* EXCERPT */}

//               <div className="form-group">

//                 <label>
//                   Short Description
//                 </label>

//                 <textarea
//                   name="excerpt"
//                   value={formData.excerpt}
//                   onChange={handleChange}
//                   rows="3"
//                   placeholder="Write a short description..."
//                 />

//               </div>

//               {/* TOOLBAR */}

//               <div className="content-section">

//                 <label>
//                   Poem Content *
//                 </label>

//                 <div className="editor-toolbar">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("bold")
//                     }
//                     title="Bold"
//                   >
//                     <FaBold />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("italic")
//                     }
//                     title="Italic"
//                   >
//                     <FaItalic />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("underline")
//                     }
//                     title="Underline"
//                   >
//                     <FaUnderline />
//                   </button>

//                   <span className="toolbar-divider"></span>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("insertUnorderedList")
//                     }
//                   >
//                     <FaListUl />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("insertOrderedList")
//                     }
//                   >
//                     <FaListOl />
//                   </button>

//                   <span className="toolbar-divider"></span>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("justifyLeft")
//                     }
//                   >
//                     <FaAlignLeft />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("justifyCenter")
//                     }
//                   >
//                     <FaAlignCenter />
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       execCommand("justifyRight")
//                     }
//                   >
//                     <FaAlignRight />
//                   </button>

//                 </div>

//                 <textarea
//                   name="content"
//                   value={formData.content}
//                   onChange={handleChange}
//                   className="poem-content-editor"
//                   placeholder="Write your poem here...

// You can write each verse on a separate line.

// Example:

// The morning sun begins to rise,
// Painting dreams across the skies.

// A gentle breeze begins to flow,
// Carrying whispers soft and low."
//                   rows="18"
//                 />

//               </div>

//             </div>

//           </div>

//           {/* SIDEBAR */}

//           <aside className="editor-sidebar">

//             {/* PUBLISH */}

//             <div className="sidebar-card">

//               <h3>
//                 Publish Settings
//               </h3>

//               <div className="form-group">

//                 <label>
//                   Status
//                 </label>

//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                 >
//                   <option value="draft">
//                     Draft
//                   </option>

//                   <option value="published">
//                     Published
//                   </option>
//                 </select>

//               </div>

//               <button
//                 type="submit"
//                 className="sidebar-save"
//                 disabled={loading}
//               >
//                 <FaSave />

//                 {loading
//                   ? "Saving..."
//                   : formData.status ===
//                     "published"
//                   ? "Publish Poem"
//                   : "Save Draft"}
//               </button>

//             </div>

//             {/* COVER IMAGE */}

//             <div className="sidebar-card">

//               <h3>
//                 Cover Image
//               </h3>

//               {formData.coverImage ? (

//                 <div className="image-preview">

//                   <img
//                     src={formData.coverImage}
//                     alt="Poem cover"
//                   />

//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="remove-image"
//                   >
//                     <FaTrash />
//                   </button>

//                 </div>

//               ) : (

//                 <label className="image-upload">

//                   <FaImage />

//                   <span>
//                     Upload Cover Image
//                   </span>

//                   <small>
//                     JPG, PNG or WEBP
//                   </small>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                   />

//                 </label>

//               )}

//             </div>

//             {/* TAGS */}

//             <div className="sidebar-card">

//               <h3>
//                 Tags
//               </h3>

//               <input
//                 type="text"
//                 name="tags"
//                 value={formData.tags}
//                 onChange={handleChange}
//                 placeholder="love, life, nature"
//               />

//               <small className="field-help">
//                 Separate tags with commas.
//               </small>

//             </div>

//           </aside>

//         </form>

//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminPoemEditor;



import React, {
  useEffect,
  useState,
} from "react";

import api from "../api/api";

import "./AdminPoemEditor.css";

const headers = () => ({
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem(
        "adminToken"
      ) || ""
    }`,
  },
});

export default function AdminPoemEditor({
  poemId,
}) {
  const [form, setForm] =
    useState({
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      status: "draft",
    });

  const [loading, setLoading] =
    useState(Boolean(poemId));

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!poemId) return;

    const load = async () => {
      try {
        const response =
          await api.get(
            `/poems/${poemId}`,
            headers()
          );

        const poem =
          response.data?.data;

        if (poem) {
          setForm({
            title:
              poem.title || "",
            excerpt:
              poem.excerpt || "",
            content:
              poem.content || "",
            coverImage:
              poem.coverImage ||
              "",
            status:
              poem.status ||
              "draft",
          });
        }
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Unable to load poem"
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [poemId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      if (poemId) {
        await api.put(
          `/poems/${poemId}`,
          form,
          headers()
        );
      } else {
        await api.post(
          "/poems",
          form,
          headers()
        );
      }

      window.location.href =
        "/admin/poems";
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to save poem"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="poem-editor-loading">
        Loading poem...
      </div>
    );
  }

  return (
    <div className="poem-editor-page">
      <div className="poem-editor-heading">
        <span>POETRY STUDIO</span>

        <h1>
          {poemId
            ? "Edit Poem"
            : "Create Poem"}
        </h1>
      </div>

      {error && (
        <div className="poem-editor-error">
          {error}
        </div>
      )}

      <form
        className="poem-editor-form"
        onSubmit={submit}
      >
        <label>
          Title

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Excerpt

          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows="4"
          />
        </label>

        <label>
          Cover Image URL

          <input
            name="coverImage"
            value={
              form.coverImage
            }
            onChange={handleChange}
          />
        </label>

        <label>
          Poem

          <textarea
            className="poem-writing-area"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="18"
            required
          />
        </label>

        <label>
          Status

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="draft">
              Draft
            </option>

            <option value="published">
              Published
            </option>
          </select>
        </label>

        <button disabled={saving}>
          {saving
            ? "Saving..."
            : poemId
            ? "Update Poem"
            : "Create Poem"}
        </button>
      </form>
    </div>
  );
}