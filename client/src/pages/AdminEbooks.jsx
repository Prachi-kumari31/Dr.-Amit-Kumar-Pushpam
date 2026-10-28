// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaPlus, FaSearch, FaFilter, FaStar } from "react-icons/fa";
// import AdminLayout from "../components/AdminLayout";
// import "./AdminEbooks.css";

// const AdminEbooks = () => {
//   const [ebooks, setEbooks] = useState([
//     {
//       id: 1,
//       title: "The Complete Guide to Vedic Astrology",
//       author: "Dr. Amit Kumar Pushpam",
//       price: 499,
//       category: "Astrology",
//       rating: 4.8,
//       sales: 1250,
//       status: "active",
//     },
//     {
//       id: 2,
//       title: "Spiritual Awakening",
//       author: "Dr. Priya Singh",
//       price: 349,
//       category: "Spiritual",
//       rating: 4.9,
//       sales: 890,
//       status: "active",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     price: "",
//     category: "Astrology",
//   });

//   const filteredEbooks = ebooks.filter((ebook) => {
//     const matchesSearch = ebook.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === "all" || ebook.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const handleCreateEbook = () => {
//     setEditingId(null);
//     setFormData({ title: "", author: "", price: "", category: "Astrology" });
//     setShowModal(true);
//   };

//   const handleEditEbook = (ebook) => {
//     setEditingId(ebook.id);
//     setFormData({
//       title: ebook.title,
//       author: ebook.author,
//       price: ebook.price,
//       category: ebook.category,
//     });
//     setShowModal(true);
//   };

//   const handleSaveEbook = () => {
//     if (editingId) {
//       setEbooks(
//         ebooks.map((ebook) =>
//           ebook.id === editingId ? { ...ebook, ...formData } : ebook
//         )
//       );
//     } else {
//       setEbooks([
//         ...ebooks,
//         {
//           id: Date.now(),
//           ...formData,
//           rating: 0,
//           sales: 0,
//           status: "active",
//         },
//       ]);
//     }
//     setShowModal(false);
//   };

//   const handleDeleteEbook = (id) => {
//     if (window.confirm("Are you sure you want to delete this eBook?")) {
//       setEbooks(ebooks.filter((ebook) => ebook.id !== id));
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="admin-ebooks">
//         {/* Header */}
//         <div className="page-header">
//           <div>
//             <h2>Manage eBooks</h2>
//             <p>Create, edit, and manage all eBooks</p>
//           </div>
//           <button className="btn-primary" onClick={handleCreateEbook}>
//             <FaPlus /> Add New eBook
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="search-box">
//             <FaSearch />
//             <input
//               type="text"
//               placeholder="Search eBooks..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="filter-group">
//             <FaFilter />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           <p className="result-count">{filteredEbooks.length} eBooks found</p>
//         </div>

//         {/* eBooks Grid */}
//         <div className="ebooks-grid">
//           {filteredEbooks.map((ebook) => (
//             <div key={ebook.id} className="ebook-admin-card">
//               <div className="ebook-cover-admin">📚</div>

//               <div className="ebook-info-admin">
//                 <h3>{ebook.title}</h3>
//                 <p className="author">{ebook.author}</p>

//                 <div className="ebook-stats">
//                   <span className="stat">
//                     <strong>₹{ebook.price}</strong>
//                   </span>
//                   <span className="stat">
//                     <FaStar className="star" /> {ebook.rating}
//                   </span>
//                   <span className="stat">{ebook.sales} sales</span>
//                 </div>

//                 <div className="ebook-category">
//                   <span className="category-tag">{ebook.category}</span>
//                   <span
//                     className={`status-badge ${ebook.status}`}
//                   >
//                     {ebook.status}
//                   </span>
//                 </div>
//               </div>

//               <div className="ebook-actions-admin">
//                 <button
//                   className="action-btn edit"
//                   onClick={() => handleEditEbook(ebook)}
//                 >
//                   <FaEdit /> Edit
//                 </button>
//                 <button
//                   className="action-btn delete"
//                   onClick={() => handleDeleteEbook(ebook.id)}
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="modal-overlay" onClick={() => setShowModal(false)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="modal-header">
//                 <h3>{editingId ? "Edit eBook" : "Add New eBook"}</h3>
//                 <button
//                   className="close-btn"
//                   onClick={() => setShowModal(false)}
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="modal-body">
//                 <div className="form-group">
//                   <label>Title *</label>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     placeholder="Enter eBook title"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Author *</label>
//                   <input
//                     type="text"
//                     value={formData.author}
//                     onChange={(e) =>
//                       setFormData({ ...formData, author: e.target.value })
//                     }
//                     placeholder="Enter author name"
//                   />
//                 </div>

//                 <div className="form-row">
//                   <div className="form-group">
//                     <label>Price (₹) *</label>
//                     <input
//                       type="number"
//                       value={formData.price}
//                       onChange={(e) =>
//                         setFormData({ ...formData, price: e.target.value })
//                       }
//                       placeholder="Enter price"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label>Category *</label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) =>
//                         setFormData({ ...formData, category: e.target.value })
//                       }
//                     >
//                       <option>Astrology</option>
//                       <option>Psychology</option>
//                       <option>Spiritual</option>
//                       <option>Paranormal</option>
//                       <option>Self-Help</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-footer">
//                 <button
//                   className="btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button className="btn-primary" onClick={handleSaveEbook}>
//                   {editingId ? "Update eBook" : "Add eBook"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminEbooks;

import React, {
  useEffect,
  useState,
} from "react";

import {
  getAllEbooks,
  createEbook,
  updateEbook,
  deleteEbook,
} from "../api/ebookApi";

import AdminLayout from "../components/AdminLayout";

import "./AdminEbooks.css";

const initialForm = {
  title: "",
  description: "",
  excerpt: "",
  author: "Dr. Amit Kumar Pushpam",
  category: "Astrology",
  pages: "",
  language: "English",
  price: 0,
  originalPrice: "",
  discount: 0,
  tags: "",
  isFeatured: false,
  isActive: true,
};

const AdminEbooks = () => {
  const [ebooks, setEbooks] =
    useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [coverFile, setCoverFile] =
    useState(null);

  const [ebookFile, setEbookFile] =
    useState(null);

  const [coverPreview, setCoverPreview] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | Load ebooks
  |--------------------------------------------------------------------------
  */

  const loadEbooks =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAllEbooks({
            limit: 50,
          });

        setEbooks(
          response?.data || []
        );
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Unable to load ebooks"
        );
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    loadEbooks();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | Input change
  |--------------------------------------------------------------------------
  */

  const handleChange =
    (e) => {
      const {
        name,
        value,
        checked,
        type,
      } = e.target;

      setForm((prev) => ({
        ...prev,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      }));
    };


  /*
  |--------------------------------------------------------------------------
  | Cover selection
  |--------------------------------------------------------------------------
  */

  const handleCoverChange =
    (e) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        ![
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(
          file.type
        )
      ) {
        setError(
          "Please select JPG, PNG or WebP image"
        );

        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        setError(
          "Cover image must be less than 5MB"
        );

        return;
      }

      setError("");

      setCoverFile(file);

      setCoverPreview(
        URL.createObjectURL(
          file
        )
      );
    };


  /*
  |--------------------------------------------------------------------------
  | PDF selection
  |--------------------------------------------------------------------------
  */

  const handleEbookFileChange =
    (e) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        file.type !==
        "application/pdf"
      ) {
        setError(
          "Please select a PDF file"
        );

        return;
      }

      if (
        file.size >
        50 * 1024 * 1024
      ) {
        setError(
          "PDF must be less than 50MB"
        );

        return;
      }

      setError("");

      setEbookFile(file);
    };


  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  const resetForm =
    () => {
      setForm(
        initialForm
      );

      setCoverFile(null);

      setEbookFile(null);

      setCoverPreview("");

      setEditingId(null);

      setError("");

      setSuccess("");
    };


  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");
      setSuccess("");

      /*
      |--------------------------------------------------------------------------
      | Required files
      |--------------------------------------------------------------------------
      */

      if (
        !editingId &&
        !coverFile
      ) {
        setError(
          "Please select a cover image"
        );

        return;
      }

      if (
        !editingId &&
        !ebookFile
      ) {
        setError(
          "Please select the ebook PDF"
        );

        return;
      }

      try {
        setSaving(true);

        const data =
          new FormData();

        data.append(
          "title",
          form.title
        );

        data.append(
          "description",
          form.description
        );

        data.append(
          "excerpt",
          form.excerpt
        );

        data.append(
          "author",
          form.author
        );

        data.append(
          "category",
          form.category
        );

        data.append(
          "pages",
          form.pages
        );

        data.append(
          "language",
          form.language
        );

        data.append(
          "price",
          form.price
        );

        data.append(
          "originalPrice",
          form.originalPrice
        );

        data.append(
          "discount",
          form.discount
        );

        data.append(
          "tags",
          form.tags
        );

        data.append(
          "isFeatured",
          form.isFeatured
        );

        data.append(
          "isActive",
          form.isActive
        );

        /*
        |--------------------------------------------------------------------------
        | Files
        |--------------------------------------------------------------------------
        */

        if (coverFile) {
          data.append(
            "cover",
            coverFile
          );
        }

        if (ebookFile) {
          data.append(
            "ebookFile",
            ebookFile
          );
        }

        let response;

        if (editingId) {
          response =
            await updateEbook(
              editingId,
              data
            );
        } else {
          response =
            await createEbook(
              data
            );
        }

        setSuccess(
          response?.message ||
            "Ebook saved successfully"
        );

        resetForm();

        await loadEbooks();
      } catch (err) {
        console.error(
          "Ebook save failed:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to save ebook"
        );
      } finally {
        setSaving(false);
      }
    };


  /*
  |--------------------------------------------------------------------------
  | Edit
  |--------------------------------------------------------------------------
  */

  const handleEdit =
    (ebook) => {
      setEditingId(
        ebook._id
      );

      setForm({
        title:
          ebook.title || "",

        description:
          ebook.description ||
          "",

        excerpt:
          ebook.excerpt || "",

        author:
          ebook.author ||
          "Dr. Amit Kumar Pushpam",

        category:
          ebook.category ||
          "Astrology",

        pages:
          ebook.pages || "",

        language:
          ebook.language ||
          "English",

        price:
          ebook.price ?? 0,

        originalPrice:
          ebook.originalPrice ??
          "",

        discount:
          ebook.discount ?? 0,

        tags:
          Array.isArray(
            ebook.tags
          )
            ? ebook.tags.join(
                ", "
              )
            : "",

        isFeatured:
          Boolean(
            ebook.isFeatured
          ),

        isActive:
          Boolean(
            ebook.isActive
          ),
      });

      setCoverPreview(
        ebook.cover || ""
      );

      setCoverFile(null);

      setEbookFile(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };


  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this ebook?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteEbook(id);

        setSuccess(
          "Ebook deleted successfully"
        );

        await loadEbooks();
      } catch (err) {
        setError(
          err?.response?.data
            ?.message ||
            "Unable to delete ebook"
        );
      }
    };


  return (
    <div className="admin-ebooks-page">

      <div className="admin-ebook-header">
        <span>
          DIGITAL LIBRARY
        </span>

        <h1>
          Manage eBooks
        </h1>

        <p>
          Upload and manage
          books for your readers.
        </p>
      </div>


      {error && (
        <div className="admin-alert error">
          {error}
        </div>
      )}


      {success && (
        <div className="admin-alert success">
          {success}
        </div>
      )}


      {/* FORM */}

      <form
        className="ebook-editor-card"
        onSubmit={handleSubmit}
      >

        <div className="editor-title">
          <h2>
            {editingId
              ? "Edit eBook"
              : "Add New eBook"}
          </h2>

          <p>
            Upload your book
            directly from your
            device.
          </p>
        </div>


        <div className="ebook-form-grid">

          <label>
            <span>
              Book Title *
            </span>

            <input
              type="text"
              name="title"
              value={
                form.title
              }
              onChange={
                handleChange
              }
              placeholder="Enter ebook title"
              required
            />
          </label>


          <label>
            <span>
              Author *
            </span>

            <input
              type="text"
              name="author"
              value={
                form.author
              }
              onChange={
                handleChange
              }
              required
            />
          </label>


          <label>
            <span>
              Category *
            </span>

            <select
              name="category"
              value={
                form.category
              }
              onChange={
                handleChange
              }
            >
              <option value="Astrology">
                Astrology
              </option>

              <option value="Psychology">
                Psychology
              </option>

              <option value="Spiritual">
                Spiritual
              </option>

              <option value="Paranormal">
                Paranormal
              </option>

              <option value="Self-Help">
                Self-Help
              </option>
            </select>
          </label>


          <label>
            <span>
              Number of Pages *
            </span>

            <input
              type="number"
              name="pages"
              min="1"
              value={
                form.pages
              }
              onChange={
                handleChange
              }
              required
            />
          </label>

        </div>


        <label>
          <span>
            Short Description *
          </span>

          <textarea
            name="excerpt"
            value={
              form.excerpt
            }
            onChange={
              handleChange
            }
            rows="3"
            placeholder="Short description shown on ebook cards"
            required
          />
        </label>


        <label>
          <span>
            Full Description *
          </span>

          <textarea
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            rows="7"
            placeholder="Describe the ebook..."
            required
          />
        </label>


        {/* FILE UPLOADS */}

        <div className="upload-section">

          <div className="upload-box">

            <div className="upload-icon">
              🖼️
            </div>

            <h3>
              Cover Image
            </h3>

            <p>
              JPG, PNG or WebP
              · Max 5MB
            </p>

            <label className="upload-button">
              Select Cover Image

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={
                  handleCoverChange
                }
                hidden
              />
            </label>

            {coverPreview && (
              <div className="cover-preview">
                <img
                  src={
                    coverPreview
                  }
                  alt="Cover preview"
                />
              </div>
            )}

          </div>


          <div className="upload-box">

            <div className="upload-icon">
              📚
            </div>

            <h3>
              Ebook PDF
            </h3>

            <p>
              PDF only · Max
              50MB
            </p>

            <label className="upload-button">
              Select PDF

              <input
                type="file"
                accept="application/pdf"
                onChange={
                  handleEbookFileChange
                }
                hidden
              />
            </label>

            {ebookFile && (
              <div className="selected-file">
                📄{" "}
                {ebookFile.name}
              </div>
            )}

          </div>

        </div>


        {/* PRICE */}

        <div className="price-section-admin">

          <h3>
            Access & Pricing
          </h3>

          <div className="ebook-form-grid">

            <label>
              <span>
                Price
              </span>

              <input
                type="number"
                name="price"
                min="0"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
              />

              <small>
                Set ₹0 for a free
                ebook.
              </small>
            </label>


            {Number(form.price) >
              0 && (
              <>
                <label>
                  <span>
                    Original Price
                  </span>

                  <input
                    type="number"
                    name="originalPrice"
                    min="0"
                    value={
                      form.originalPrice
                    }
                    onChange={
                      handleChange
                    }
                  />
                </label>


                <label>
                  <span>
                    Discount %
                  </span>

                  <input
                    type="number"
                    name="discount"
                    min="0"
                    max="100"
                    value={
                      form.discount
                    }
                    onChange={
                      handleChange
                    }
                  />
                </label>
              </>
            )}

          </div>

        </div>


        {/* TAGS */}

        <label>
          <span>
            Tags
          </span>

          <input
            type="text"
            name="tags"
            value={
              form.tags
            }
            onChange={
              handleChange
            }
            placeholder="astrology, spirituality, meditation"
          />
        </label>


        {/* OPTIONS */}

        <div className="ebook-options">

          <label className="checkbox-label">

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

            <span>
              Featured Ebook
            </span>

          </label>


          <label className="checkbox-label">

            <input
              type="checkbox"
              name="isActive"
              checked={
                form.isActive
              }
              onChange={
                handleChange
              }
            />

            <span>
              Visible to users
            </span>

          </label>

        </div>


        {/* BUTTONS */}

        <div className="ebook-editor-actions">

          <button
            type="submit"
            disabled={
              saving
            }
            className="primary-button"
          >
            {saving
              ? "Uploading..."
              : editingId
              ? "Update Ebook"
              : "Publish Ebook"}
          </button>


          {editingId && (
            <button
              type="button"
              className="secondary-button"
              onClick={
                resetForm
              }
            >
              Cancel
            </button>
          )}

        </div>

      </form>


      {/* LIST */}

      <section className="admin-ebook-list">

        <div className="list-heading">
          <h2>
            Published eBooks
          </h2>

          <span>
            {ebooks.length} books
          </span>
        </div>


        {loading ? (
          <div className="empty-state">
            Loading ebooks...
          </div>
        ) : ebooks.length ===
          0 ? (
          <div className="empty-state">
            No ebooks uploaded
            yet.
          </div>
        ) : (
          <div className="admin-ebook-grid">

            {ebooks.map(
              (ebook) => (
                <article
                  className="admin-ebook-card"
                  key={
                    ebook._id
                  }
                >

                  <div className="admin-card-cover">

                    {ebook.cover ? (
                      <img
                        src={
                          ebook.cover
                        }
                        alt={
                          ebook.title
                        }
                      />
                    ) : (
                      <div>
                        📚
                      </div>
                    )}

                    {ebook.price ===
                      0 && (
                      <span className="free-badge">
                        FREE
                      </span>
                    )}

                  </div>


                  <div className="admin-card-body">

                    <span className="category-badge">
                      {
                        ebook.category
                      }
                    </span>

                    <h3>
                      {
                        ebook.title
                      }
                    </h3>

                    <p>
                      {
                        ebook.excerpt
                      }
                    </p>

                    <div className="admin-card-meta">
                      <span>
                        📄{" "}
                        {
                          ebook.pages
                        }{" "}
                        pages
                      </span>

                      <span>
                        {ebook.price ===
                        0
                          ? "Free"
                          : `₹${ebook.price}`}
                      </span>
                    </div>


                    <div className="admin-card-actions">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(
                            ebook
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            ebook._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </article>
              )
            )}

          </div>
        )}

      </section>

    </div>


  );
};

export default AdminEbooks;