// import api from "./api";

// const contentApi = {
//   getAll: async (params = {}) => {
//     const response = await api.get("/content", {
//       params,
//     });

//     return response.data;
//   },

//   getBySlug: async (slug) => {
//     const response = await api.get(`/content/${slug}`);

//     return response.data;
//   },

//   like: async (id) => {
//     const response = await api.post(`/content/${id}/like`);

//     return response.data;
//   },

//   dislike: async (id) => {
//     const response = await api.post(`/content/${id}/dislike`);

//     return response.data;
//   },

//   getAdminContent: async (params = {}) => {
//     const response = await api.get("/admin/content", {
//       params,
//     });

//     return response.data;
//   },

//   create: async (data) => {
//     const response = await api.post("/admin/content", data);

//     return response.data;
//   },

//   update: async (id, data) => {
//     const response = await api.put(
//       `/admin/content/${id}`,
//       data
//     );

//     return response.data;
//   },

//   delete: async (id) => {
//     const response = await api.delete(
//       `/admin/content/${id}`
//     );

//     return response.data;
//   },

//   publish: async (id) => {
//     const response = await api.patch(
//       `/admin/content/${id}/publish`
//     );

//     return response.data;
//   },
// };

// export default contentApi;


import api from "./api";

/*
|--------------------------------------------------------------------------
| CONTENT
|--------------------------------------------------------------------------
*/

export const getContent = async (params = {}) => {
  const response = await api.get("/content", {
    params,
  });

  return response.data;
};

export const getContentBySlug = async (slug) => {
  const response = await api.get(
    `/content/slug/${encodeURIComponent(slug)}`
  );

  return response.data;
};

export const likeContent = async (id) => {
  const response = await api.post(`/content/${id}/like`);
  return response.data;
};

export const dislikeContent = async (id) => {
  const response = await api.post(`/content/${id}/dislike`);
  return response.data;
};

/*
|--------------------------------------------------------------------------
| BLOG
|--------------------------------------------------------------------------
*/

export const getBlogs = async (params = {}) => {
  const response = await api.get("/blogs", {
    params,
  });

  return response.data;
};

export const getBlogBySlug = async (slug) => {
  const response = await api.get(
    `/blogs/${encodeURIComponent(slug)}`
  );

  return response.data;
};

export const likeBlog = async (id) => {
  const response = await api.post(
    `/blogs/${id}/like`
  );

  return response.data;
};

export const dislikeBlog = async (id) => {
  const response = await api.post(
    `/blogs/${id}/dislike`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ARTICLES
|--------------------------------------------------------------------------
*/

export const getArticles = async (params = {}) => {
  return getContent({
    ...params,
    type: "article",
  });
};

/*
|--------------------------------------------------------------------------
| EBOOKS / BOOKS
|--------------------------------------------------------------------------
*/

export const getEbooks = async (params = {}) => {
  return getContent({
    ...params,
    type: "book",
  });
};

export const getEbook = async (slug) => {
  return getContentBySlug(slug);
};

/*
|--------------------------------------------------------------------------
| POEMS
|--------------------------------------------------------------------------
*/

export const getPoems = async () => {
  const response = await api.get("/poems");
  return response.data;
};

export const getPoem = async (id) => {
  const response = await api.get(`/poems/${id}`);
  return response.data;
};

/*
|--------------------------------------------------------------------------
| STORIES
|--------------------------------------------------------------------------
*/

export const getStories = async () => {
  const response = await api.get("/stories");
  return response.data;
};

export const getStory = async (id) => {
  const response = await api.get(`/stories/${id}`);
  return response.data;
};

/*
|--------------------------------------------------------------------------
| PUBLICATIONS
|--------------------------------------------------------------------------
*/

export const getPublications = async (params = {}) => {
  const response = await api.get("/publications/public", {
    params,
  });

  return response.data;
};

export const getPublication = async (id) => {
  const response = await api.get(
    `/publications/public/${id}`
  );

  return response.data;
};

export const likePublication = async (id) => {
  const response = await api.put(
    `/publications/${id}/like`
  );

  return response.data;
};

export const dislikePublication = async (id) => {
  const response = await api.put(
    `/publications/${id}/dislike`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADMIN CONTENT
|--------------------------------------------------------------------------
*/

export const getAdminContent = async (params = {}) => {
  const response = await api.get("/content/admin/all", {
    params,
  });

  return response.data;
};

export const createContent = async (data) => {
  const response = await api.post(
    "/content/admin",
    data
  );

  return response.data;
};

export const updateContent = async (id, data) => {
  const response = await api.put(
    `/content/admin/${id}`,
    data
  );

  return response.data;
};

export const deleteContent = async (id) => {
  const response = await api.delete(
    `/content/admin/${id}`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADMIN BLOGS
|--------------------------------------------------------------------------
*/

export const getAdminBlogs = async (params = {}) => {
  const response = await api.get("/blogs/admin", {
    params: {
      ...params,
      limit: params.limit || 100,
    },
  });

  return response.data;
};

export const createBlog = async (data) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/blogs/admin", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBlog = async (id, data) => {
  const response = await api.put(`/blogs/admin/${id}`, data);

  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/admin/${id}`);

  return response.data;
};
/*
|--------------------------------------------------------------------------
| ADMIN POEMS
|--------------------------------------------------------------------------
*/

export const getAdminPoems = async () => {
  const response = await api.get("/poems/admin/all");
  return response.data;
};

export const createPoem = async (data) => {
  const response = await api.post("/poems", data);
  return response.data;
};

export const updatePoem = async (id, data) => {
  const response = await api.put(
    `/poems/${id}`,
    data
  );

  return response.data;
};

export const deletePoem = async (id) => {
  const response = await api.delete(
    `/poems/${id}`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADMIN STORIES
|--------------------------------------------------------------------------
*/

export const getAdminStories = async () => {
  const response = await api.get("/stories/admin/all");
  return response.data;
};

export const createStory = async (data) => {
  const response = await api.post("/stories", data);
  return response.data;
};

export const updateStory = async (id, data) => {
  const response = await api.put(
    `/stories/${id}`,
    data
  );

  return response.data;
};

export const deleteStory = async (id) => {
  const response = await api.delete(
    `/stories/${id}`
  );

  return response.data;
};


// Get a single publication by ID
export const getPublicationById = async (id) => {
  try {
    const response = await api.get(`/publications/public/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Unable to load publication."
    );
  }
};
/*
|--------------------------------------------------------------------------
| ADMIN PUBLICATIONS
|--------------------------------------------------------------------------
*/

export const getAdminPublications = async (
  params = {}
) => {
  const response = await api.get(
    "/publications/admin/all",
    {
      params,
    }
  );

  return response.data;
};

export const createPublication = async (data) => {
  const response = await api.post(
    "/publications",
    data
  );

  return response.data;
};

export const updatePublication = async (
  id,
  data
) => {
  const response = await api.put(
    `/publications/${id}`,
    data
  );

  return response.data;
};

export const togglePublicationPublish = async (
  id
) => {
  const response = await api.put(
    `/publications/${id}/publish`
  );

  return response.data;
};

export const deletePublication = async (id) => {
  const response = await api.delete(
    `/publications/${id}`
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| DEFAULT EXPORT
|--------------------------------------------------------------------------
*/

const contentApi = {
  getContent,
  getContentBySlug,
  likeContent,
  dislikeContent,

  getBlogs,
  getBlogBySlug,
  likeBlog,
  dislikeBlog,

  getArticles,

  getEbooks,
  getEbook,

  getPoems,
  getPoem,

  getStories,
  getStory,

  getPublications,
  getPublication,
  getPublicationById,
  likePublication,
  dislikePublication,

  getAdminContent,
  createContent,
  updateContent,
  deleteContent,

  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,

  getAdminPoems,
  createPoem,
  updatePoem,
  deletePoem,

  getAdminStories,
  createStory,
  updateStory,
  deleteStory,

  getAdminPublications,
  createPublication,
  updatePublication,
  togglePublicationPublish,
  deletePublication,
};

export default contentApi;