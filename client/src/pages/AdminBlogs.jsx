// import React, { useEffect, useMemo, useRef, useState } from "react";

// import {
//   FaArrowLeft,
//   FaBold,
//   FaCalendarAlt,
//   FaCheck,
//   FaChevronDown,
//   FaClock,
//   FaCode,
//   FaEdit,
//   FaEye,
//   FaHeading,
//   FaImage,
//   FaItalic,
//   FaLink,
//   FaListOl,
//   FaListUl,
//   FaParagraph,
//   FaPlus,
//   FaQuoteLeft,
//   FaSearch,
//   FaStrikethrough,
//   FaTrash,
//   FaUnderline,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaAlignJustify,
// } from "react-icons/fa";

// import AdminLayout from "../components/AdminLayout";
// import "./AdminBlogs.css";

// const INITIAL_BLOGS = [
//   {
//     id: 1,
//     title: "Understanding Your Horoscope",
//     slug: "understanding-your-horoscope",
//     author: "Admin",
//     category: "Astrology",
//     tags: ["Astrology", "Horoscope"],
//     excerpt:
//       "A practical introduction to understanding your horoscope and the deeper patterns within it.",
//     content:
//       "<h2>Understanding Your Horoscope</h2><p>Your horoscope can offer a reflective framework for understanding patterns, possibilities, and personal growth.</p><p>In this article, we explore the fundamental elements that make up a horoscope.</p>",
//     date: "2024-01-20",
//     status: "published",
//     views: 1250,
//     featuredImage: "",
//   },
//   {
//     id: 2,
//     title: "Spiritual Awakening Guide",
//     slug: "spiritual-awakening-guide",
//     author: "Admin",
//     category: "Spiritual",
//     tags: ["Spirituality", "Awareness"],
//     excerpt:
//       "Explore the journey of spiritual awareness and meaningful inner transformation.",
//     content:
//       "<h2>Spiritual Awakening</h2><p>Spiritual growth is often a gradual process of awareness and reflection.</p>",
//     date: "2024-01-18",
//     status: "published",
//     views: 890,
//     featuredImage: "",
//   },
//   {
//     id: 3,
//     title: "Psychology of Success",
//     slug: "psychology-of-success",
//     author: "Admin",
//     category: "Psychology",
//     tags: ["Psychology", "Success"],
//     excerpt:
//       "Understanding the psychological principles behind sustainable personal growth.",
//     content:
//       "<p>Success is influenced by habits, beliefs, environment, and consistent action.</p>",
//     date: "2024-01-15",
//     status: "draft",
//     views: 0,
//     featuredImage: "",
//   },
// ];

// const CATEGORIES = [
//   "Astrology",
//   "Psychology",
//   "Spiritual",
//   "Paranormal",
//   "Research",
// ];

// const FONT_FAMILIES = [
//   {
//     label: "Arial",
//     value: "Arial, sans-serif",
//   },
//   {
//     label: "Georgia",
//     value: "Georgia, serif",
//   },
//   {
//     label: "Times New Roman",
//     value: '"Times New Roman", serif',
//   },
//   {
//     label: "Verdana",
//     value: "Verdana, sans-serif",
//   },
//   {
//     label: "Tahoma",
//     value: "Tahoma, sans-serif",
//   },
//   {
//     label: "Trebuchet MS",
//     value: '"Trebuchet MS", sans-serif',
//   },
//   {
//     label: "Courier New",
//     value: '"Courier New", monospace',
//   },
//   {
//     label: "Lucida Console",
//     value: '"Lucida Console", monospace',
//   },
//   {
//     label: "Palatino",
//     value: '"Palatino Linotype", "Book Antiqua", Palatino, serif',
//   },
// ];

// const FONT_SIZES = [
//   { label: "10 px", value: "10px" },
//   { label: "12 px", value: "12px" },
//   { label: "14 px", value: "14px" },
//   { label: "16 px", value: "16px" },
//   { label: "18 px", value: "18px" },
//   { label: "20 px", value: "20px" },
//   { label: "24 px", value: "24px" },
//   { label: "28 px", value: "28px" },
//   { label: "32 px", value: "32px" },
//   { label: "36 px", value: "36px" },
//   { label: "40 px", value: "40px" },
// ];

// function slugify(text) {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }

// function getWordCount(html) {
//   const div = document.createElement("div");
//   div.innerHTML = html || "";

//   const text = div.textContent || "";

//   return text.trim()
//     ? text.trim().split(/\s+/).length
//     : 0;
// }

// function getReadingTime(words) {
//   return Math.max(1, Math.ceil(words / 200));
// }

// export default function AdminBlogs() {
// const [blogs, setBlogs] = useState([]);

//   const [view, setView] = useState("list");
//   const [editingId, setEditingId] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [filterCategory, setFilterCategory] = useState("all");

//   const [savedMessage, setSavedMessage] = useState("");
//   const [showPreview, setShowPreview] = useState(false);

//   const editorRef = useRef(null);

//   const imageInputRef = useRef(null);
//   const coverImageInputRef = useRef(null);

//   const emptyForm = {
//     title: "",
//     slug: "",
//     category: "Astrology",
//     tags: [],
//     excerpt: "",
//     content: "",
//     status: "draft",
//     coverImage: "",
//   };

//   const [formData, setFormData] = useState(emptyForm);
//   const [tagInput, setTagInput] = useState("");

//   const filteredBlogs = useMemo(() => {
//     return blogs.filter((blog) => {
//       const search = searchTerm.toLowerCase();

//       const matchesSearch =
//         blog.title.toLowerCase().includes(search) ||
//         blog.category.toLowerCase().includes(search) ||
//         blog.tags?.some((tag) =>
//           tag.toLowerCase().includes(search)
//         );

//       const matchesStatus =
//         filterStatus === "all" ||
//         blog.status === filterStatus;

//       const matchesCategory =
//         filterCategory === "all" ||
//         blog.category === filterCategory;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesCategory
//       );
//     });
//   }, [
//     blogs,
//     searchTerm,
//     filterStatus,
//     filterCategory,
//   ]);

//   const wordCount = getWordCount(formData.content);
//   const readingTime = getReadingTime(wordCount);

//   useEffect(() => {
//     if (view === "editor" && editorRef.current) {
//       editorRef.current.innerHTML =
//         formData.content || "";
//     }
//   }, [view, editingId]);

//   const openCreateEditor = () => {
//     setEditingId(null);
//     setFormData(emptyForm);
//     setTagInput("");
//     setSavedMessage("");
//     setShowPreview(false);
//     setView("editor");
//   };

//   const openEditEditor = (blog) => {
//     setEditingId(blog.id);

//     setFormData({
//       title: blog.title || "",
//       slug: blog.slug || slugify(blog.title),
//       category: blog.category || "Astrology",
//       tags: blog.tags || [],
//       excerpt: blog.excerpt || "",
//       content: blog.content || "",
//       status: blog.status || "draft",
//       coverImage: blog.coverImage || "",
//     });

//     setTagInput("");
//     setSavedMessage("");
//     setShowPreview(false);
//     setView("editor");
//   };

//   const handleTitleChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       title: value,
//       slug: editingId
//         ? prev.slug
//         : slugify(value),
//     }));
//   };

//   const updateContent = () => {
//     if (!editorRef.current) return;

//     setFormData((prev) => ({
//       ...prev,
//       content: editorRef.current.innerHTML,
//     }));
//   };

//   /*
//    * ==========================================
//    * TEXT FORMATTING
//    * ==========================================
//    */

//   const executeCommand = (
//     command,
//     value = null
//   ) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     document.execCommand(
//       command,
//       false,
//       value
//     );

//     updateContent();
//   };

//   /*
//    * FONT FAMILY
//    */

//   const changeFontFamily = (fontFamily) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     document.execCommand(
//       "fontName",
//       false,
//       fontFamily
//     );

//     updateContent();
//   };

//   /*
//    * FONT SIZE
//    *
//    * execCommand fontSize supports 1-7.
//    * We temporarily use that and then convert
//    * the generated <font> element to px.
//    */

//   const changeFontSize = (size) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     document.execCommand(
//       "fontSize",
//       false,
//       "7"
//     );

//     const fonts =
//       editorRef.current.querySelectorAll(
//         'font[size="7"]'
//       );

//     fonts.forEach((font) => {
//       font.removeAttribute("size");
//       font.style.fontSize = size;
//     });

//     updateContent();
//   };

//   /*
//    * ==========================================
//    * ALIGNMENT
//    * ==========================================
//    */

//   const changeAlignment = (alignment) => {
//     if (!editorRef.current) return;

//     editorRef.current.focus();

//     const commandMap = {
//       left: "justifyLeft",
//       center: "justifyCenter",
//       right: "justifyRight",
//       justify: "justifyFull",
//     };

//     document.execCommand(
//       commandMap[alignment],
//       false,
//       null
//     );

//     updateContent();
//   };

//   /*
//    * ==========================================
//    * BLOCK FORMATTING
//    * ==========================================
//    */

//   const addHeading = () => {
//     executeCommand(
//       "formatBlock",
//       "h2"
//     );
//   };

//   const addParagraph = () => {
//     executeCommand(
//       "formatBlock",
//       "p"
//     );
//   };

//   const addQuote = () => {
//     executeCommand(
//       "formatBlock",
//       "blockquote"
//     );
//   };

//   /*
//    * ==========================================
//    * LINK
//    * ==========================================
//    */

//   const addLink = () => {
//     if (!editorRef.current) return;

//     const url = window.prompt(
//       "Enter website URL:"
//     );

//     if (!url) return;

//     editorRef.current.focus();

//     document.execCommand(
//       "createLink",
//       false,
//       url
//     );

//     updateContent();
//   };

//   /*
//    * ==========================================
//    * IMAGE FROM URL
//    * ==========================================
//    */

//   const addImageFromURL = () => {
//     if (!editorRef.current) return;

//     const url = window.prompt(
//       "Enter image URL:"
//     );

//     if (!url) return;

//     editorRef.current.focus();

//     document.execCommand(
//       "insertImage",
//       false,
//       url
//     );

//     updateContent();
//   };

//   /*
//    * ==========================================
//    * IMAGE FROM DEVICE
//    * ==========================================
//    */

//   const handleEditorImageUpload = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       if (!editorRef.current) return;

//       editorRef.current.focus();

//       document.execCommand(
//         "insertImage",
//         false,
//         reader.result
//       );

//       updateContent();
//     };

//     reader.readAsDataURL(file);

//     e.target.value = "";
//   };

//   /*
//    * ==========================================
//    * IMAGE BUTTON
//    *
//    * Shows:
//    * 1. Device
//    * 2. URL
//    * ==========================================
//    */

//   const addImage = () => {
//     const choice = window.prompt(
//       "Choose image source:\n\n1 - Select from device\n2 - Enter image URL"
//     );

//     if (choice === "1") {
//       imageInputRef.current?.click();
//     }

//     if (choice === "2") {
//       addImageFromURL();
//     }
//   };

//   /*
//    * ==========================================
//    * FEATURED IMAGE FROM DEVICE
//    * ==========================================
//    */

//   const handlecoverImageUpload = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setFormData((prev) => ({
//         ...prev,
//        coverImage: reader.result,
//       }));
//     };

//     reader.readAsDataURL(file);

//     e.target.value = "";
//   };

//   /*
//    * ==========================================
//    * FEATURED IMAGE URL
//    * ==========================================
//    */

//   const addcoverImageFromURL = () => {
//     const url = window.prompt(
//       "Enter featured image URL:"
//     );

//     if (!url) return;

//     setFormData((prev) => ({
//       ...prev,
//       coverImage: url,
//     }));
//   };

//   /*
//    * ==========================================
//    * FEATURED IMAGE
//    * ==========================================
//    */

//   const addcoverImage = () => {
//     const choice = window.prompt(
//       "Choose featured image source:\n\n1 - Select from device\n2 - Enter image URL"
//     );

//     if (choice === "1") {
//       coverImageInputRef.current?.click();
//     }

//     if (choice === "2") {
//       addcoverImageFromURL();
//     }
//   };

//   /*
//    * ==========================================
//    * TAGS
//    * ==========================================
//    */

//   const addTag = () => {
//     const value = tagInput.trim();

//     if (!value) return;

//     if (formData.tags.includes(value)) {
//       setTagInput("");
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       tags: [...prev.tags, value],
//     }));

//     setTagInput("");
//   };

//   const removeTag = (tag) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter(
//         (item) => item !== tag
//       ),
//     }));
//   };

//   const handleTagKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       addTag();
//     }
//   };

//   /*
//    * ==========================================
//    * SAVE BLOG
//    * ==========================================
//    */

//   const saveBlog = (
//     status = formData.status
//   ) => {
//     if (!formData.title.trim()) {
//       alert("Please enter a blog title.");
//       return;
//     }

//     if (!formData.content.trim()) {
//       alert(
//         "Please write some blog content."
//       );
//       return;
//     }

//     const today =
//       new Date()
//         .toISOString()
//         .split("T")[0];

//     const blogData = {
//       ...formData,
//       status,
//       date: today,
//       author: "Admin",

//       views: editingId
//         ? blogs.find(
//             (blog) =>
//               blog.id === editingId
//           )?.views || 0
//         : 0,
//     };

//     if (editingId) {
//       setBlogs((prev) =>
//         prev.map((blog) =>
//           blog.id === editingId
//             ? {
//                 ...blog,
//                 ...blogData,
//               }
//             : blog
//         )
//       );
//     } else {
//       setBlogs((prev) => [
//         {
//           id: Date.now(),
//           ...blogData,
//         },
//         ...prev,
//       ]);
//     }

//     setFormData((prev) => ({
//       ...prev,
//       status,
//     }));

//     setSavedMessage(
//       status === "published"
//         ? "Blog published successfully."
//         : "Draft saved successfully."
//     );

//     setTimeout(
//       () => setSavedMessage(""),
//       3000
//     );
//   };

//   /*
//    * ==========================================
//    * DELETE
//    * ==========================================
//    */

//   const deleteBlog = (id) => {
//     const blog = blogs.find(
//       (item) => item.id === id
//     );

//     if (!blog) return;

//     const confirmed =
//       window.confirm(
//         `Delete "${blog.title}" permanently?`
//       );

//     if (!confirmed) return;

//     setBlogs((prev) =>
//       prev.filter(
//         (item) => item.id !== id
//       )
//     );
//   };

//   const goBackToList = () => {
//     setView("list");
//     setShowPreview(false);
//     setSavedMessage("");
//   };

//   /*
//    * ==========================================
//    * EDITOR VIEW
//    * ==========================================
//    */

//   if (view === "editor") {
//     return (
//       <AdminLayout>
//         <div className="blog-editor-page">

//           {/* Hidden image inputs */}

//           <input
//             ref={imageInputRef}
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={
//               handleEditorImageUpload
//             }
//           />

//           <input
//             ref={coverImageInputRef}
//             type="file"
//             accept="image/*"
//             style={{ display: "none" }}
//             onChange={
//               handlecoverImageUpload
//             }
//           />

//           {/* Editor Header */}

//           <div className="editor-topbar">

//             <button
//               className="editor-back-btn"
//               onClick={goBackToList}
//             >
//               <FaArrowLeft />
//               Back to Blogs
//             </button>

//             <div className="editor-top-actions">

//               {savedMessage && (
//                 <span className="save-status">
//                   <FaCheck />
//                   {savedMessage}
//                 </span>
//               )}

//               <button
//                 className="editor-preview-btn"
//                 onClick={() =>
//                   setShowPreview(true)
//                 }
//               >
//                 <FaEye />
//                 Preview
//               </button>

//               <button
//                 className="editor-draft-btn"
//                 onClick={() =>
//                   saveBlog("draft")
//                 }
//               >
//                 Save Draft
//               </button>

//               <button
//                 className="editor-publish-btn"
//                 onClick={() =>
//                   saveBlog("published")
//                 }
//               >
//                 Publish
//               </button>

//             </div>
//           </div>

//           {/* Editor Layout */}

//           <div className="editor-layout">

//             {/* Main Writing Area */}

//             <main className="editor-main">

//               <div className="editor-paper">

//                 <input
//                   className="blog-title-input"
//                   type="text"
//                   placeholder="Add a compelling title..."
//                   value={formData.title}
//                   onChange={(e) =>
//                     handleTitleChange(
//                       e.target.value
//                     )
//                   }
//                 />

//                 <input
//                   className="blog-slug-input"
//                   type="text"
//                   placeholder="blog-url-slug"
//                   value={formData.slug}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       slug: slugify(
//                         e.target.value
//                       ),
//                     }))
//                   }
//                 />

//                 {/* TOOLBAR */}

//                 <div className="editor-toolbar">

//                   {/* FONT FAMILY */}

//                   <select
//                     className="editor-font-family"
//                     defaultValue="Georgia, serif"
//                     onChange={(e) =>
//                       changeFontFamily(
//                         e.target.value
//                       )
//                     }
//                     title="Font Family"
//                   >
//                     {FONT_FAMILIES.map(
//                       (font) => (
//                         <option
//                           key={font.value}
//                           value={font.value}
//                           style={{
//                             fontFamily:
//                               font.value,
//                           }}
//                         >
//                           {font.label}
//                         </option>
//                       )
//                     )}
//                   </select>

//                   {/* FONT SIZE */}

//                   <select
//                     className="editor-font-size"
//                     defaultValue="17px"
//                     onChange={(e) =>
//                       changeFontSize(
//                         e.target.value
//                       )
//                     }
//                     title="Font Size"
//                   >
//                     {FONT_SIZES.map(
//                       (size) => (
//                         <option
//                           key={size.value}
//                           value={size.value}
//                         >
//                           {size.label}
//                         </option>
//                       )
//                     )}
//                   </select>

//                   <span className="toolbar-divider" />

//                   {/* BOLD */}

//                   <button
//                     type="button"
//                     title="Bold"
//                     onClick={() =>
//                       executeCommand(
//                         "bold"
//                       )
//                     }
//                   >
//                     <FaBold />
//                   </button>

//                   {/* ITALIC */}

//                   <button
//                     type="button"
//                     title="Italic"
//                     onClick={() =>
//                       executeCommand(
//                         "italic"
//                       )
//                     }
//                   >
//                     <FaItalic />
//                   </button>

//                   {/* UNDERLINE */}

//                   <button
//                     type="button"
//                     title="Underline"
//                     onClick={() =>
//                       executeCommand(
//                         "underline"
//                       )
//                     }
//                   >
//                     <FaUnderline />
//                   </button>

//                   {/* STRIKE */}

//                   <button
//                     type="button"
//                     title="Strikethrough"
//                     onClick={() =>
//                       executeCommand(
//                         "strikeThrough"
//                       )
//                     }
//                   >
//                     <FaStrikethrough />
//                   </button>

//                   <span className="toolbar-divider" />

//                   {/* HEADING */}

//                   <button
//                     type="button"
//                     title="Heading"
//                     onClick={addHeading}
//                   >
//                     <FaHeading />
//                   </button>

//                   {/* PARAGRAPH */}

//                   <button
//                     type="button"
//                     title="Paragraph"
//                     onClick={addParagraph}
//                   >
//                     <FaParagraph />
//                   </button>

//                   {/* QUOTE */}

//                   <button
//                     type="button"
//                     title="Quote"
//                     onClick={addQuote}
//                   >
//                     <FaQuoteLeft />
//                   </button>

//                   <span className="toolbar-divider" />

//                   {/* BULLET LIST */}

//                   <button
//                     type="button"
//                     title="Bullet List"
//                     onClick={() =>
//                       executeCommand(
//                         "insertUnorderedList"
//                       )
//                     }
//                   >
//                     <FaListUl />
//                   </button>

//                   {/* NUMBERED LIST */}

//                   <button
//                     type="button"
//                     title="Numbered List"
//                     onClick={() =>
//                       executeCommand(
//                         "insertOrderedList"
//                       )
//                     }
//                   >
//                     <FaListOl />
//                   </button>

//                   <span className="toolbar-divider" />

//                   {/* ALIGN LEFT */}

//                   <button
//                     type="button"
//                     title="Align Left"
//                     onClick={() =>
//                       changeAlignment("left")
//                     }
//                   >
//                     <FaAlignLeft />
//                   </button>

//                   {/* ALIGN CENTER */}

//                   <button
//                     type="button"
//                     title="Align Center"
//                     onClick={() =>
//                       changeAlignment(
//                         "center"
//                       )
//                     }
//                   >
//                     <FaAlignCenter />
//                   </button>

//                   {/* ALIGN RIGHT */}

//                   <button
//                     type="button"
//                     title="Align Right"
//                     onClick={() =>
//                       changeAlignment(
//                         "right"
//                       )
//                     }
//                   >
//                     <FaAlignRight />
//                   </button>

//                   {/* JUSTIFY */}

//                   <button
//                     type="button"
//                     title="Justify"
//                     onClick={() =>
//                       changeAlignment(
//                         "justify"
//                       )
//                     }
//                   >
//                     <FaAlignJustify />
//                   </button>

//                   <span className="toolbar-divider" />

//                   {/* LINK */}

//                   <button
//                     type="button"
//                     title="Insert Link"
//                     onClick={addLink}
//                   >
//                     <FaLink />
//                   </button>

//                   {/* IMAGE */}

//                   <button
//                     type="button"
//                     title="Insert Image"
//                     onClick={addImage}
//                   >
//                     <FaImage />
//                   </button>

//                   {/* CODE */}

//                   <button
//                     type="button"
//                     title="Code"
//                     onClick={() =>
//                       executeCommand(
//                         "formatBlock",
//                         "pre"
//                       )
//                     }
//                   >
//                     <FaCode />
//                   </button>

//                 </div>

//                 {/* RICH EDITOR */}

//                 <div
//                   ref={editorRef}
//                   className="rich-editor"
//                   contentEditable
//                   suppressContentEditableWarning
//                   data-placeholder="Start writing your article..."
//                   onInput={updateContent}
//                 />

//                 <div className="editor-writing-info">

//                   <span>
//                     {wordCount} words
//                   </span>

//                   <span>•</span>

//                   <span>
//                     {readingTime} min read
//                   </span>

//                   <span>•</span>

//                   <span>
//                     {formData.status ===
//                     "published"
//                       ? "Published"
//                       : "Draft"}
//                   </span>

//                 </div>

//               </div>
//             </main>

//             {/* SIDEBAR */}

//             <aside className="blog-settings">

//               {/* PUBLISH */}

//               <section className="settings-card">

//                 <div className="settings-card-header">

//                   <h3>Publish</h3>

//                   <FaChevronDown />

//                 </div>

//                 <div className="publish-status">

//                   <span>Status</span>

//                   <select
//                     value={formData.status}
//                     onChange={(e) =>
//                       setFormData(
//                         (prev) => ({
//                           ...prev,
//                           status:
//                             e.target.value,
//                         })
//                       )
//                     }
//                   >
//                     <option value="draft">
//                       Draft
//                     </option>

//                     <option value="published">
//                       Published
//                     </option>
//                   </select>

//                 </div>

//                 <div className="publish-date">

//                   <FaCalendarAlt />

//                   <div>
//                     <small>
//                       Publish date
//                     </small>

//                     <strong>
//                       Immediately
//                     </strong>
//                   </div>

//                 </div>

//                 <button
//                   className="sidebar-publish-btn"
//                   onClick={() =>
//                     saveBlog(
//                       formData.status ===
//                         "published"
//                         ? "published"
//                         : "draft"
//                     )
//                   }
//                 >
//                   {formData.status ===
//                   "published"
//                     ? "Update Blog"
//                     : "Save Draft"}
//                 </button>

//               </section>

//               {/* CATEGORY */}

//               <section className="settings-card">

//                 <div className="settings-card-header">

//                   <h3>Category</h3>

//                   <FaChevronDown />

//                 </div>

//                 <select
//                   className="settings-select"
//                   value={formData.category}
//                   onChange={(e) =>
//                     setFormData(
//                       (prev) => ({
//                         ...prev,
//                         category:
//                           e.target.value,
//                       })
//                     )
//                   }
//                 >
//                   {CATEGORIES.map(
//                     (category) => (
//                       <option
//                         key={category}
//                       >
//                         {category}
//                       </option>
//                     )
//                   )}
//                 </select>

//               </section>

//               {/* TAGS */}

//               <section className="settings-card">

//                 <div className="settings-card-header">

//                   <h3>Tags</h3>

//                   <FaChevronDown />

//                 </div>

//                 <div className="tag-input">

//                   <input
//                     type="text"
//                     placeholder="Add a tag..."
//                     value={tagInput}
//                     onChange={(e) =>
//                       setTagInput(
//                         e.target.value
//                       )
//                     }
//                     onKeyDown={
//                       handleTagKeyDown
//                     }
//                   />

//                   <button
//                     type="button"
//                     onClick={addTag}
//                   >
//                     <FaPlus />
//                   </button>

//                 </div>

//                 <div className="tags-container">

//                   {formData.tags.map(
//                     (tag) => (
//                       <span
//                         key={tag}
//                         className="editor-tag"
//                       >
//                         {tag}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             removeTag(tag)
//                           }
//                         >
//                           ×
//                         </button>
//                       </span>
//                     )
//                   )}

//                 </div>

//               </section>

//               {/* EXCERPT */}

//               <section className="settings-card">

//                 <div className="settings-card-header">

//                   <h3>Excerpt</h3>

//                   <FaChevronDown />

//                 </div>

//                 <textarea
//                   className="excerpt-input"
//                   placeholder="Write a short description for your blog..."
//                   value={formData.excerpt}
//                   onChange={(e) =>
//                     setFormData(
//                       (prev) => ({
//                         ...prev,
//                         excerpt:
//                           e.target.value,
//                       })
//                     )
//                   }
//                   rows={5}
//                 />

//                 <small className="field-help">
//                   This appears on blog
//                   cards and search
//                   results.
//                 </small>

//               </section>

//               {/* FEATURED IMAGE */}

//               <section className="settings-card">

//                 <div className="settings-card-header">

//                   <h3>
//                     Featured Image
//                   </h3>

//                   <FaChevronDown />

//                 </div>

//                 {formData.coverImage ? (
//                   <div className="featured-preview">

//                     <img
//                       src={
//                         formData.coverImage
//                       }
//                       alt="Featured"
//                     />

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setFormData(
//                           (prev) => ({
//                             ...prev,
//                             coverImage:
//                               "",
//                           })
//                         )
//                       }
//                     >
//                       Remove
//                     </button>

//                   </div>
//                 ) : (
//                   <button
//                     type="button"
//                     className="image-upload-placeholder"
//                     onClick={
//                       addcoverImage
//                     }
//                   >
//                     <FaImage />

//                     <strong>
//                       Add Featured Image
//                     </strong>

//                     <span>
//                       Select from device
//                       or add image URL
//                     </span>
//                   </button>
//                 )}

//               </section>

//               {/* DELETE */}

//               {editingId && (
//                 <section className="settings-card danger-card">

//                   <button
//                     type="button"
//                     onClick={() => {
//                       deleteBlog(
//                         editingId
//                       );
//                       goBackToList();
//                     }}
//                   >
//                     <FaTrash />
//                     Delete this blog
//                   </button>

//                 </section>
//               )}

//             </aside>

//           </div>

//           {/* PREVIEW */}

//           {showPreview && (
//             <div
//               className="preview-overlay"
//               onClick={() =>
//                 setShowPreview(false)
//               }
//             >
//               <div
//                 className="preview-window"
//                 onClick={(e) =>
//                   e.stopPropagation()
//                 }
//               >

//                 <div className="preview-header">

//                   <div>

//                     <small>
//                       Blog Preview
//                     </small>

//                     <h3>
//                       {formData.title ||
//                         "Untitled Blog"}
//                     </h3>

//                   </div>

//                   <button
//                     onClick={() =>
//                       setShowPreview(
//                         false
//                       )
//                     }
//                   >
//                     ×
//                   </button>

//                 </div>

//                 {formData.coverImage && (
//                   <img
//                     src={
//                       formData.coverImage
//                     }
//                     alt=""
//                     className="preview-image"
//                   />
//                 )}

//                 <div className="preview-meta">

//                   <span>
//                     {formData.category}
//                   </span>

//                   <span>•</span>

//                   <span>
//                     {readingTime} min read
//                   </span>

//                 </div>

//                 {formData.excerpt && (
//                   <p className="preview-excerpt">
//                     {formData.excerpt}
//                   </p>
//                 )}

//                 <article
//                   className="preview-content"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       formData.content ||
//                       "<p>No content yet.</p>",
//                   }}
//                 />

//               </div>
//             </div>
//           )}

//         </div>
//       </AdminLayout>
//     );
//   }

//   /*
//    * ==========================================
//    * BLOG LIST VIEW
//    * ==========================================
//    */

//   return (
//     <AdminLayout>
//       <div className="admin-blogs">

//         <div className="blogs-page-header">

//           <div>

//             <div className="page-eyebrow">
//               CONTENT MANAGEMENT
//             </div>

//             <h2>Blogs</h2>

//             <p>
//               Create, write, edit and
//               publish your articles.
//             </p>

//           </div>

//           <button
//             className="create-blog-btn"
//             onClick={openCreateEditor}
//           >
//             <FaPlus />
//             Create New Blog
//           </button>

//         </div>

//         {/* STATISTICS */}

//         <div className="blog-stat-row">

//           <div className="blog-stat-card">
//             <span>
//               Total Articles
//             </span>

//             <strong>
//               {blogs.length}
//             </strong>
//           </div>

//           <div className="blog-stat-card">
//             <span>
//               Published
//             </span>

//             <strong>
//               {
//                 blogs.filter(
//                   (blog) =>
//                     blog.status ===
//                     "published"
//                 ).length
//               }
//             </strong>
//           </div>

//           <div className="blog-stat-card">
//             <span>Drafts</span>

//             <strong>
//               {
//                 blogs.filter(
//                   (blog) =>
//                     blog.status ===
//                     "draft"
//                 ).length
//               }
//             </strong>
//           </div>

//           <div className="blog-stat-card">
//             <span>
//               Total Views
//             </span>

//             <strong>
//               {blogs
//                 .reduce(
//                   (sum, blog) =>
//                     sum +
//                     (blog.views || 0),
//                   0
//                 )
//                 .toLocaleString()}
//             </strong>
//           </div>

//         </div>

//         {/* FILTERS */}

//         <div className="blog-filters">

//           <div className="blog-search">

//             <FaSearch />

//             <input
//               type="text"
//               placeholder="Search articles..."
//               value={searchTerm}
//               onChange={(e) =>
//                 setSearchTerm(
//                   e.target.value
//                 )
//               }
//             />

//           </div>

//           <select
//             value={filterStatus}
//             onChange={(e) =>
//               setFilterStatus(
//                 e.target.value
//               )
//             }
//           >
//             <option value="all">
//               All Status
//             </option>

//             <option value="published">
//               Published
//             </option>

//             <option value="draft">
//               Draft
//             </option>
//           </select>

//           <select
//             value={filterCategory}
//             onChange={(e) =>
//               setFilterCategory(
//                 e.target.value
//               )
//             }
//           >
//             <option value="all">
//               All Categories
//             </option>

//             {CATEGORIES.map(
//               (category) => (
//                 <option key={category}>
//                   {category}
//                 </option>
//               )
//             )}
//           </select>

//           <span className="articles-count">
//             {filteredBlogs.length}{" "}
//             articles
//           </span>

//         </div>

//         {/* BLOG LIST */}

//         <div className="blogs-list">

//           {filteredBlogs.map(
//             (blog) => (
//               <article
//                 className="blog-list-card"
//                 key={blog.id}
//               >

//                 <div className="blog-list-image">

//                   {blog.coverImage ? (
//                     <img
//                       src={
//                         blog.coverImage
//                       }
//                       alt={blog.title}
//                     />
//                   ) : (
//                     <div className="blog-placeholder">
//                       <FaImage />
//                     </div>
//                   )}

//                 </div>

//                 <div className="blog-list-content">

//                   <div className="blog-list-top">

//                     <span
//                       className={`blog-status ${blog.status}`}
//                     >
//                       {blog.status ===
//                       "published"
//                         ? "Published"
//                         : "Draft"}
//                     </span>

//                     <span className="blog-category">
//                       {blog.category}
//                     </span>

//                   </div>

//                   <h3>
//                     {blog.title}
//                   </h3>

//                   <p>
//                     {blog.excerpt ||
//                       "No excerpt added for this article."}
//                   </p>

//                   <div className="blog-list-meta">

//                     <span>
//                       <FaClock />

//                       {getReadingTime(
//                         getWordCount(
//                           blog.content
//                         )
//                       )}{" "}
//                       min read
//                     </span>

//                     <span>
//                       <FaEye />

//                       {(
//                         blog.views || 0
//                       ).toLocaleString()}{" "}
//                       views
//                     </span>

//                     <span>
//                       {blog.date}
//                     </span>

//                   </div>

//                 </div>

//                 <div className="blog-list-actions">

//                   <button
//                     className="blog-edit-btn"
//                     onClick={() =>
//                       openEditEditor(
//                         blog
//                       )
//                     }
//                     title="Edit Blog"
//                   >
//                     <FaEdit />
//                     Edit
//                   </button>

//                   <button
//                     className="blog-delete-btn"
//                     onClick={() =>
//                       deleteBlog(
//                         blog.id
//                       )
//                     }
//                     title="Delete Blog"
//                   >
//                     <FaTrash />
//                   </button>

//                 </div>

//               </article>
//             )
//           )}

//           {filteredBlogs.length ===
//             0 && (
//             <div className="empty-blogs">

//               <FaSearch />

//               <h3>
//                 No articles found
//               </h3>

//               <p>
//                 Try changing your
//                 search or filters.
//               </p>

//             </div>
//           )}

//         </div>

//       </div>
//     </AdminLayout>
//   );
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowLeft, FaBold, FaCheck, FaChevronDown, FaClock, FaEdit,
  FaEye, FaHeading, FaImage, FaItalic, FaListOl, FaListUl,
  FaParagraph, FaPlus, FaQuoteLeft, FaSearch, FaStrikethrough,
  FaTrash, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight,
  FaAlignJustify
} from "react-icons/fa";
import AdminLayout from "../components/AdminLayout";
import {
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from "../api/contentApi";
import "./AdminBlogs.css";

const CATEGORIES = ["Astrology", "Psychology", "Spiritual", "Paranormal", "Research"];

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: "Astrology",
  tags: [],
  excerpt: "",
  content: "",
  isPublished: false,
  coverImage: "",
  readTime: 1
};

const slugify = (value = "") =>
  value.toLowerCase().trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const wordCount = (html = "") => {
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent || "").trim()
    ? (el.textContent || "").trim().split(/\s+/).length
    : 0;
};

const readingTime = (html = "") => Math.max(1, Math.ceil(wordCount(html) / 200));

const normalizeBlog = (blog) => ({
  ...blog,
  id: blog._id || blog.id,
  title: blog.title || "",
  slug: blog.slug || slugify(blog.title || ""),
  category: blog.category || "Astrology",
  tags: Array.isArray(blog.tags) ? blog.tags : [],
  excerpt: blog.excerpt || "",
  content: blog.content || "",
  coverImage: blog.coverImage || blog.featuredImage || "",
  isPublished: Boolean(
    blog.isPublished ?? (blog.status === "published")
  ),
  views: Number(blog.views || 0),
  date: blog.createdAt || blog.updatedAt || blog.date || ""
});

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [view, setView] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [tagInput, setTagInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [error, setError] = useState("");
  const editorRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getAdminBlogs();
      const raw = Array.isArray(result) ? result : (result?.data || []);
      setBlogs(raw.map(normalizeBlog));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadBlogs(); }, []);

  const filteredBlogs = useMemo(() => blogs.filter((blog) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q ||
      blog.title.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(q));
    const status = blog.isPublished ? "published" : "draft";
    return matchesSearch &&
      (filterStatus === "all" || filterStatus === status) &&
      (filterCategory === "all" || filterCategory === blog.category);
  }), [blogs, searchTerm, filterStatus, filterCategory]);

  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);

  const openCreateEditor = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM });
    setTagInput("");
    setSavedMessage("");
    setShowPreview(false);
    setError("");
    setView("editor");
  };

  const openEditEditor = (blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      slug: blog.slug || slugify(blog.title),
      category: blog.category,
      tags: [...blog.tags],
      excerpt: blog.excerpt,
      content: blog.content,
      isPublished: blog.isPublished,
      coverImage: blog.coverImage,
      readTime: blog.readTime || readingTime(blog.content)
    });
    setTagInput("");
    setSavedMessage("");
    setError("");
    setView("editor");
  };

  useEffect(() => {
    if (view === "editor" && editorRef.current) {
      editorRef.current.innerHTML = formData.content || "";
    }
  }, [view, editingId]);

  const updateField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleTitleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: editingId ? prev.slug : slugify(value)
    }));
  };

  const syncEditor = () => {
    const html = editorRef.current?.innerHTML || "";
    setFormData((prev) => ({
      ...prev,
      content: html,
      readTime: readingTime(html)
    }));
  };

  const executeCommand = (command, value = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncEditor();
  };

  const addBlock = (tag) => {
    editorRef.current?.focus();
    document.execCommand("formatBlock", false, tag);
    syncEditor();
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) executeCommand("createLink", url);
  };

  const addImageFromURL = () => {
    const url = window.prompt("Enter image URL");
    if (!url) return;
    editorRef.current?.focus();
    document.execCommand("insertImage", false, url);
    syncEditor();
  };

  const addCoverImageFromURL = () => {
    const url = window.prompt("Enter featured image URL");
    if (url) updateField("coverImage", url.trim());
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("coverImage", String(reader.result));
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (!tag) return;
    if (!formData.tags.some((x) => x.toLowerCase() === tag.toLowerCase())) {
      updateField("tags", [...formData.tags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag) =>
    updateField("tags", formData.tags.filter((x) => x !== tag));

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const buildPayload = (status) => ({
    title: formData.title.trim(),
    slug: slugify(formData.slug || formData.title),
    category: formData.category,
    tags: formData.tags,
    excerpt: formData.excerpt.trim(),
    content: formData.content,
    coverImage: formData.coverImage || "",
    readTime: readingTime(formData.content),
    isPublished: status === "published"
  });

  const saveBlog = async (status = formData.isPublished ? "published" : "draft") => {
    if (!formData.title.trim()) {
      setError("Please enter a blog title.");
      return;
    }
    if (!formData.excerpt.trim()) {
      setError("Please enter an excerpt.");
      return;
    }
    syncEditor();
    const html = editorRef.current?.innerHTML || formData.content || "";
    if (!html.replace(/<[^>]*>/g, "").trim()) {
      setError("Please write some blog content.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const payload = {
        ...buildPayload(status),
        content: html,
        readTime: readingTime(html)
      };

      if (editingId) {
        await updateBlog(editingId, payload);
        setSavedMessage(status === "published" ? "Blog updated and published." : "Draft updated successfully.");
      } else {
        await createBlog(payload);
        setSavedMessage(status === "published" ? "Blog published successfully." : "Draft saved successfully.");
      }

      await loadBlogs();
      if (!editingId) {
        setEditingId(null);
        setFormData({ ...EMPTY_FORM });
        if (editorRef.current) editorRef.current.innerHTML = "";
      } else {
        setFormData((prev) => ({ ...prev, isPublished: status === "published", content: html }));
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const removeBlog = async (id) => {
    const blog = blogs.find((x) => x.id === id);
    if (!blog || !window.confirm(`Delete "${blog.title}" permanently?`)) return;

    try {
      setError("");
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((x) => x.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormData({ ...EMPTY_FORM });
        setView("list");
      }
      setSavedMessage("Blog deleted successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to delete blog.");
    }
  };

  const goBackToList = () => {
    setView("list");
    setShowPreview(false);
    setSavedMessage("");
    setError("");
  };

  if (view === "editor") {
    return (
        <div className="blog-editor-page">
          <input
            ref={coverImageInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleCoverUpload}
          />

          <div className="editor-topbar">
            <button className="editor-back-btn" onClick={goBackToList}>
              <FaArrowLeft /> Back to Blogs
            </button>

            <div className="editor-top-actions">
              {savedMessage && <span className="save-status"><FaCheck /> {savedMessage}</span>}
              <button className="editor-preview-btn" onClick={() => setShowPreview(true)}>
                <FaEye /> Preview
              </button>
              <button className="editor-draft-btn" disabled={saving} onClick={() => saveBlog("draft")}>
                {saving ? "Saving..." : "Save Draft"}
              </button>
              <button className="editor-publish-btn" disabled={saving} onClick={() => saveBlog("published")}>
                {saving ? "Saving..." : "Publish"}
              </button>
            </div>
          </div>

          {error && <div className="blog-editor-alert">{error}</div>}

          <div className="editor-layout">
            <main className="editor-main">
              <div className="editor-paper">
                <input
                  className="blog-title-input"
                  placeholder="Add a compelling title..."
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
                <input
                  className="blog-slug-input"
                  placeholder="blog-url-slug"
                  value={formData.slug}
                  onChange={(e) => updateField("slug", slugify(e.target.value))}
                />

                <div className="editor-toolbar">
                  <button type="button" title="Bold" onClick={() => executeCommand("bold")}><FaBold /></button>
                  <button type="button" title="Italic" onClick={() => executeCommand("italic")}><FaItalic /></button>
                  <button type="button" title="Underline" onClick={() => executeCommand("underline")}><FaUnderline /></button>
                  <button type="button" title="Strike" onClick={() => executeCommand("strikeThrough")}><FaStrikethrough /></button>
                  <span />
                  <button type="button" title="Heading" onClick={() => addBlock("h2")}><FaHeading /></button>
                  <button type="button" title="Paragraph" onClick={() => addBlock("p")}><FaParagraph /></button>
                  <button type="button" title="Quote" onClick={() => addBlock("blockquote")}><FaQuoteLeft /></button>
                  <button type="button" title="Bulleted list" onClick={() => executeCommand("insertUnorderedList")}><FaListUl /></button>
                  <button type="button" title="Numbered list" onClick={() => executeCommand("insertOrderedList")}><FaListOl /></button>
                  <span />
                  <button type="button" title="Align left" onClick={() => executeCommand("justifyLeft")}><FaAlignLeft /></button>
                  <button type="button" title="Align center" onClick={() => executeCommand("justifyCenter")}><FaAlignCenter /></button>
                  <button type="button" title="Align right" onClick={() => executeCommand("justifyRight")}><FaAlignRight /></button>
                  <button type="button" title="Justify" onClick={() => executeCommand("justifyFull")}><FaAlignJustify /></button>
                  <span />
                  <button type="button" title="Link" onClick={addLink}>↗</button>
                  <button type="button" title="Image URL" onClick={addImageFromURL}><FaImage /></button>
                </div>

                <div
                  ref={editorRef}
                  className="rich-editor"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={syncEditor}
                  data-placeholder="Start writing your blog..."
                />
              </div>
            </main>

            <aside className="editor-sidebar">
              <section className="settings-card publish-card">
                <div className="settings-card-header"><h3>Publishing</h3><FaChevronDown /></div>
                <div className="publish-state">
                  <span className={`state-dot ${formData.isPublished ? "live" : ""}`} />
                  <div>
                    <strong>{formData.isPublished ? "Published" : "Draft"}</strong>
                    <small>{formData.isPublished ? "Visible to website visitors" : "Not visible publicly"}</small>
                  </div>
                </div>
                <button className="sidebar-publish-btn" disabled={saving} onClick={() => saveBlog(formData.isPublished ? "published" : "draft")}>
                  {saving ? "Saving..." : editingId ? "Update Blog" : "Save Blog"}
                </button>
              </section>

              <section className="settings-card">
                <div className="settings-card-header"><h3>Category</h3><FaChevronDown /></div>
                <select className="settings-select" value={formData.category} onChange={(e) => updateField("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </section>

              <section className="settings-card">
                <div className="settings-card-header"><h3>Tags</h3><FaChevronDown /></div>
                <div className="tag-input">
                  <input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <button type="button" onClick={addTag}><FaPlus /></button>
                </div>
                <div className="tags-container">
                  {formData.tags.map((tag) => (
                    <span className="editor-tag" key={tag}>{tag}<button type="button" onClick={() => removeTag(tag)}>×</button></span>
                  ))}
                </div>
              </section>

              <section className="settings-card">
                <div className="settings-card-header"><h3>Excerpt</h3><FaChevronDown /></div>
                <textarea
                  className="excerpt-input"
                  rows={5}
                  placeholder="Write a short description for your blog..."
                  value={formData.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                />
                <small className="field-help">This appears on blog cards and search results.</small>
              </section>

              <section className="settings-card">
                <div className="settings-card-header"><h3>Featured Image</h3><FaChevronDown /></div>
                {formData.coverImage ? (
                  <div className="featured-preview">
                    <img src={formData.coverImage} alt="Featured" />
                    <button type="button" onClick={() => updateField("coverImage", "")}>Remove image</button>
                  </div>
                ) : (
                  <div className="image-upload-actions">
                    <button type="button" className="image-upload-placeholder" onClick={() => coverImageInputRef.current?.click()}>
                      <FaImage /><strong>Add Featured Image</strong><span>Select an image from your device</span>
                    </button>
                    <button type="button" className="image-url-btn" onClick={addCoverImageFromURL}>Use image URL</button>
                  </div>
                )}
              </section>

              <section className="settings-card meta-card">
                <div><span>Reading time</span><strong>{readingTime(formData.content)} min</strong></div>
                <div><span>Words</span><strong>{wordCount(formData.content).toLocaleString()}</strong></div>
              </section>

              {editingId && (
                <section className="settings-card danger-card">
                  <button type="button" onClick={() => removeBlog(editingId)}><FaTrash /> Delete this blog</button>
                </section>
              )}
            </aside>
          </div>

          {showPreview && (
            <div className="preview-overlay" onClick={() => setShowPreview(false)}>
              <div className="preview-window" onClick={(e) => e.stopPropagation()}>
                <div className="preview-header">
                  <div><small>Blog Preview</small><h3>{formData.title || "Untitled Blog"}</h3></div>
                  <button onClick={() => setShowPreview(false)}>×</button>
                </div>
                {formData.coverImage && <img className="preview-image" src={formData.coverImage} alt="" />}
                <div className="preview-meta"><span>{formData.category}</span><span>•</span><span>{readingTime(formData.content)} min read</span></div>
                {formData.excerpt && <p className="preview-excerpt">{formData.excerpt}</p>}
                <article className="preview-content" dangerouslySetInnerHTML={{ __html: formData.content || "<p>No content yet.</p>" }} />
              </div>
            </div>
          )}
        </div>
    );
  }

  return (
    
      <div className="admin-blogs">
        <div className="blogs-page-header">
          <div>
            <div className="page-eyebrow">CONTENT MANAGEMENT</div>
            <h2>Blogs</h2>
            <p>Create, write, edit and publish your articles.</p>
          </div>
          <button className="create-blog-btn" onClick={openCreateEditor}><FaPlus /> Create New Blog</button>
        </div>

        {error && <div className="blog-editor-alert">{error}</div>}
        {savedMessage && <div className="blog-success"><FaCheck /> {savedMessage}</div>}

        <div className="blog-stat-row">
          <div className="blog-stat-card"><span>Total Articles</span><strong>{blogs.length}</strong></div>
          <div className="blog-stat-card"><span>Published</span><strong>{blogs.filter((b) => b.isPublished).length}</strong></div>
          <div className="blog-stat-card"><span>Drafts</span><strong>{blogs.filter((b) => !b.isPublished).length}</strong></div>
          <div className="blog-stat-card"><span>Total Views</span><strong>{totalViews.toLocaleString()}</strong></div>
        </div>

        <div className="blog-filters">
          <div className="blog-search"><FaSearch /><input placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option><option value="published">Published</option><option value="draft">Draft</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="articles-count">{filteredBlogs.length} articles</span>
        </div>

        {loading ? (
          <div className="blogs-loading"><span className="loading-spinner" /> Loading blogs...</div>
        ) : (
          <div className="blogs-list">
            {filteredBlogs.map((blog) => (
              <article className="blog-list-card" key={blog.id}>
                <div className="blog-list-image">
                  {blog.coverImage ? <img src={blog.coverImage} alt={blog.title} /> : <div className="blog-placeholder"><FaImage /></div>}
                </div>
                <div className="blog-list-content">
                  <div className="blog-list-top">
                    <span className={`blog-status ${blog.isPublished ? "published" : "draft"}`}>{blog.isPublished ? "Published" : "Draft"}</span>
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt || "No excerpt added for this article."}</p>
                  <div className="blog-list-meta">
                    <span><FaClock /> { blog.readTime || readingTime(blog.content)} min read</span>
                    <span><FaEye /> {(blog.views || 0).toLocaleString()} views</span>
                    <span>{blog.date ? new Date(blog.date).toLocaleDateString() : "—"}</span>
                  </div>
                  {blog.tags.length > 0 && <div className="list-tags">{blog.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>}
                </div>
                <div className="blog-list-actions">
                  <button className="blog-edit-btn" onClick={() => openEditEditor(blog)}><FaEdit /> Edit</button>
                  <button className="blog-delete-btn" onClick={() => removeBlog(blog.id)}><FaTrash /></button>
                </div>
              </article>
            ))}
            {!filteredBlogs.length && (
              <div className="empty-blogs"><FaSearch /><h3>No articles found</h3><p>Try changing your search or filters, or create your first blog.</p></div>
            )}
          </div>
        )}
      </div>
  
  );
}