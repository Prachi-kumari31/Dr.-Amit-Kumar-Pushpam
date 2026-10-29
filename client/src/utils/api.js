const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://dr-amit-kumar-pushpam-1.onrender.com/api";

export const apiFetch = async (endpoint, options = {}) => {
  try {
    /*
     * Make sure endpoint starts with /
     */
    const cleanEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

    /*
     * Get authentication token
     */
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("adminToken") ||
      sessionStorage.getItem("token");

    /*
     * Headers
     */
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    /*
     * Add JWT token
     */
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    /*
     * Final URL
     *
     * http://localhost:5000/api
     * +
     * /comments/admin
     *
     * =
     * http://localhost:5000/api/comments/admin
     */
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    console.log("API Request:", url);

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    /*
     * Try to read JSON response
     */
    let data = {};

    const contentType =
      response.headers.get("content-type");

    if (
      contentType &&
      contentType.includes("application/json")
    ) {
      data = await response.json();
    } else {
      const text = await response.text();

      data = {
        message: text || "Server returned an empty response.",
      };
    }

    /*
     * Handle HTTP errors
     */
    if (!response.ok) {
      throw new Error(
        data?.message ||
          `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};