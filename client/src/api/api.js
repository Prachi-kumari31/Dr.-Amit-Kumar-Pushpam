// import axios from "axios";

// const API_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const userToken = localStorage.getItem("token");
//     const adminToken = localStorage.getItem("adminToken");

//     const token = adminToken || userToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


// import axios from "axios";

// /*
// |--------------------------------------------------------------------------
// | API BASE URL
// |--------------------------------------------------------------------------
// |
// | Development:
// | REACT_APP_API_URL=http://localhost:5000/api
// |
// | Production:
// | REACT_APP_API_URL=https://your-backend-domain.com/api
// |
// */

// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 20000,
// });

// /*
// |--------------------------------------------------------------------------
// | REQUEST INTERCEPTOR
// |--------------------------------------------------------------------------
// |
// | Supports both:
// | - normal user JWT
// | - admin JWT
// |
// | Your backend uses protect/adminProtect separately, so the frontend
// | sends the appropriate token depending on what is stored.
// |
// */

// api.interceptors.request.use(
//   (config) => {
//     const userToken = localStorage.getItem("token");
//     const adminToken = localStorage.getItem("adminToken");

//     /*
//      * Admin API calls can explicitly set:
//      * config.useAdminToken = true
//      *
//      * Otherwise normal user token is used.
//      */

//     const token = config.useAdminToken
//       ? adminToken
//       : userToken;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     /*
//      * Remove our custom property before Axios sends request.
//      */
//     delete config.useAdminToken;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /*
// |--------------------------------------------------------------------------
// | RESPONSE INTERCEPTOR
// |--------------------------------------------------------------------------
// */

// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (!error.response) {
//       return Promise.reject({
//         ...error,
//         message:
//           "Unable to connect to the server. Please check your internet connection or backend server.",
//       });
//     }

//     const status = error.response.status;

//     if (status === 401) {
//       /*
//        * Do not automatically remove tokens here.
//        * The application may want to handle logout itself.
//        */
//       console.warn("Authentication required.");
//     }

//     if (status === 403) {
//       console.warn("You do not have permission for this action.");
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


// import axios from "axios";

// const API_BASE_URL =
//   process.env.REACT_APP_API_URL ||
//   "http://localhost:5000/api";
// const API_BASE_URL =
//   process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 20000,
// });

// /*
// |--------------------------------------------------------------------------
// | REQUEST INTERCEPTOR
// |--------------------------------------------------------------------------
// */

// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("userToken") ||
//       localStorage.getItem("adminToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /*
// |--------------------------------------------------------------------------
// | RESPONSE INTERCEPTOR
// |--------------------------------------------------------------------------
// */

// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (!error.response) {
//       return Promise.reject(
//         new Error(
//           "Unable to connect to the server. Please check your internet connection or backend server."
//         )
//       );
//     }

//     if (error.response.status === 401) {
//       console.warn("Authentication required.");
//     }

//     if (error.response.status === 403) {
//       console.warn("You are not authorized.");
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


// import axios from "axios";

// const API_URL =
//   process.env.REACT_APP_API_URL ||
//   "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /*
// |--------------------------------------------------------------------------
// | Request interceptor
// |--------------------------------------------------------------------------
// */

// api.interceptors.request.use(
//   (config) => {

//     const token =
//       localStorage.getItem("adminToken");

//     if (token) {
//       config.headers = config.headers || {};

//       config.headers.Authorization =
//         `Bearer ${token}`;
//     }

//     return config;
//   },

//   (error) => {
//     return Promise.reject(error);
//   }
// );

// /*
// |--------------------------------------------------------------------------
// | Response interceptor
// |--------------------------------------------------------------------------
// */

// api.interceptors.response.use(
//   (response) => response,

//   (error) => {

//     if (error.response?.status === 401) {

//       console.error(
//         "Admin authentication failed:",
//         error.response.data
//       );

//       /*
//        * Remove invalid token.
//        */

//       localStorage.removeItem(
//         "adminToken"
//       );
//     }

//     if (error.response?.status === 403) {

//       console.error(
//         "Admin permission denied:",
//         error.response.data
//       );
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://dr-amit-kumar-pushpam-1.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("adminToken");

    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      console.error(
        "Admin authentication failed:",
        data
      );

      /*
      |--------------------------------------------------------------------------
      | Remove expired/invalid admin token
      |--------------------------------------------------------------------------
      */

      localStorage.removeItem("adminToken");

      /*
      | Don't remove rememberAdminUsername.
      */

      window.dispatchEvent(
        new Event("adminSessionExpired")
      );
    }

    if (status === 403) {
      console.error(
        "Admin permission denied:",
        data
      );
    }

    return Promise.reject(error);
  }
);

export default api;