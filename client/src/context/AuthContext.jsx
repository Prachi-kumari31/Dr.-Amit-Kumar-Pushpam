import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

// ==========================================
// BACKEND API URL
// ==========================================

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000/api";

// ==========================================
// AXIOS INSTANCE
// ==========================================

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ==========================================
// ADD JWT TOKEN AUTOMATICALLY
// ==========================================

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// AUTH PROVIDER
// ==========================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // CHECK EXISTING ADMIN SESSION
  // ========================================

  useEffect(() => {
    const checkAuth = async () => {
      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(
          "/admin-auth/profile"
        );

        console.log(
          "PROFILE RESPONSE:",
          response.data
        );

        if (response.data?.success) {
          const admin =
            response.data.data ||
            response.data.admin;

          setUser({
            ...admin,
            role: "admin",
          });

          localStorage.setItem(
            "adminUser",
            JSON.stringify(admin)
          );
        } else {
          localStorage.removeItem(
            "adminToken"
          );

          localStorage.removeItem(
            "adminUser"
          );

          localStorage.removeItem(
            "isAdmin"
          );

          setUser(null);
        }
      } catch (error) {
        console.error(
          "AUTH CHECK ERROR:",
          error?.response?.data ||
            error.message
        );

        localStorage.removeItem(
          "adminToken"
        );

        localStorage.removeItem(
          "adminUser"
        );

        localStorage.removeItem(
          "isAdmin"
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ========================================
  // ADMIN LOGIN
  // ========================================

  const login = async (
    username,
    password
  ) => {
    try {
      console.log(
        "LOGIN REQUEST:",
        {
          username,
          passwordProvided:
            Boolean(password),
        }
      );

      if (!username || !password) {
        throw new Error(
          "Username and password are required."
        );
      }

      const response = await api.post(
        "/admin-auth/login",
        {
          username: username.trim(),
          password,
        }
      );

      console.log(
        "LOGIN RESPONSE:",
        response.data
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Invalid username or password."
        );
      }

      // ======================================
      // SUPPORT BOTH RESPONSE FORMATS
      // ======================================

      const token =
        response.data.token ||
        response.data.data?.token;

      const admin =
        response.data.data?.admin ||
        response.data.data ||
        response.data.admin;

      if (!token) {
        throw new Error(
          "Login successful but JWT token was not received."
        );
      }

      if (!admin) {
        throw new Error(
          "Login successful but admin data was not received."
        );
      }

      // ======================================
      // STORE TOKEN
      // ======================================

      localStorage.setItem(
        "adminToken",
        token
      );

      // ======================================
      // STORE ADMIN DATA
      // ======================================

      localStorage.setItem(
        "adminUser",
        JSON.stringify(admin)
      );

      // ======================================
      // COMPATIBILITY
      // ======================================

      localStorage.setItem(
        "isAdmin",
        "true"
      );

      // ======================================
      // UPDATE STATE
      // ======================================

      const loggedInAdmin = {
        ...admin,
        role: "admin",
      };

      setUser(loggedInAdmin);

      console.log(
        "ADMIN LOGIN SUCCESSFUL:",
        loggedInAdmin
      );

      return loggedInAdmin;

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error?.response?.data
      );

      throw error;
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = async () => {
    try {
      await api.post(
        "/admin-auth/logout"
      );
    } catch (error) {
      console.log(
        "Logout API error:",
        error?.response?.data ||
          error.message
      );
    } finally {
      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminUser"
      );

      localStorage.removeItem(
        "isAdmin"
      );

      setUser(null);
    }
  };

  // ========================================
  // CONTEXT
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// USE AUTH HOOK
// ==========================================

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

export default AuthContext;