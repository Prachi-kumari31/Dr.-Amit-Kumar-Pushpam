import api from "./api";

/* =========================================================
   PUBLIC
========================================================= */

export const getArticles = async ({
  page = 1,
  limit = 12,
  category = "",
  search = "",
  featured = "",
} = {}) => {
  const response = await api.get(
    "/articles",
    {
      params: {
        page,
        limit,
        ...(category && { category }),
        ...(search && { search }),
        ...(featured && { featured }),
      },
    }
  );

  return response.data;
};

export const getArticleBySlug = async (
  slug
) => {
  const response = await api.get(
    `/articles/slug/${encodeURIComponent(
      slug
    )}`
  );

  return response.data;
};

export const registerArticleView =
  async (articleId) => {
    const response = await api.post(
      `/articles/${articleId}/view`
    );

    return response.data;
  };

export const likeArticle = async (
  articleId
) => {
  const response = await api.post(
    `/articles/${articleId}/like`
  );

  return response.data;
};

export const dislikeArticle =
  async (articleId) => {
    const response = await api.post(
      `/articles/${articleId}/dislike`
    );

    return response.data;
  };

/* =========================================================
   ADMIN
========================================================= */

export const getAdminArticles =
  async ({
    page = 1,
    limit = 20,
    status = "",
    search = "",
  } = {}) => {
    const response = await api.get(
      "/articles/admin/all",
      {
        params: {
          page,
          limit,
          ...(status && { status }),
          ...(search && { search }),
        },
      }
    );

    return response.data;
  };

export const getAdminArticle =
  async (id) => {
    const response = await api.get(
      `/articles/admin/${id}`
    );

    return response.data;
  };

export const createArticle =
  async (data) => {
    const response = await api.post(
      "/articles/admin",
      data
    );

    return response.data;
  };

export const updateArticle =
  async (id, data) => {
    const response = await api.put(
      `/articles/admin/${id}`,
      data
    );

    return response.data;
  };

export const publishArticle =
  async (id) => {
    const response = await api.patch(
      `/articles/admin/${id}/publish`
    );

    return response.data;
  };

export const unpublishArticle =
  async (id) => {
    const response = await api.patch(
      `/articles/admin/${id}/unpublish`
    );

    return response.data;
  };

export const deleteArticle =
  async (id) => {
    const response = await api.delete(
      `/articles/admin/${id}`
    );

    return response.data;
  };

export default {
  getArticles,
  getArticleBySlug,
  registerArticleView,
  likeArticle,
  dislikeArticle,
  getAdminArticles,
  getAdminArticle,
  createArticle,
  updateArticle,
  publishArticle,
  unpublishArticle,
  deleteArticle,
};