import api from "./api";

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

export const getEbooks =
  async (params = {}) => {
    const response =
      await api.get(
        "/ebooks",
        {
          params,
        }
      );

    return response.data;
  };

export const getAllEbooks =
  async (params = {}) => {
    const response =
      await api.get(
        "/ebooks",
        {
          params,
        }
      );

    return response.data;
  };

export const getFeaturedEbooks =
  async () => {
    const response =
      await api.get(
        "/ebooks/featured"
      );

    return response.data;
  };

export const getEbookBySlug =
  async (slug) => {
    const response =
      await api.get(
        `/ebooks/${encodeURIComponent(
          slug
        )}`
      );

    return response.data;
  };


/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createEbook =
  async (formData) => {
    const response =
      await api.post(
        "/ebooks",
        formData
      );

    return response.data;
  };


/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateEbook =
  async (
    id,
    formData
  ) => {
    const response =
      await api.put(
        `/ebooks/${id}`,
        formData
      );

    return response.data;
  };


/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteEbook =
  async (id) => {
    const response =
      await api.delete(
        `/ebooks/${id}`
      );

    return response.data;
  };