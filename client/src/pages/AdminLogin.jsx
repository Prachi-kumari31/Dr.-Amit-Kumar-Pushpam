import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  // FaArrowLeft,
} from "react-icons/fa";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  /*
   * IMPORTANT:
   * Do NOT automatically redirect here.
   *
   * Previously you had:
   *
   * if (user && user.role === "admin") {
   *    return <Navigate to="/admin" />
   * }
   *
   * That was causing the login page to open the dashboard directly.
   */

  useEffect(() => {
    const savedUsername = localStorage.getItem(
      "rememberAdminUsername"
    );

    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoginLoading(true);

    try {
      /*
       * Your Express backend expects:
       *
       * {
       *   username,
       *   password
       * }
       */

      const loggedInUser = await login(
        username.trim(),
        password
      );

      if (!loggedInUser) {
        throw new Error("Invalid username or password.");
      }

      /*
       * Remember username only.
       * Never store the password.
       */

      if (rememberMe) {
        localStorage.setItem(
          "rememberAdminUsername",
          username.trim()
        );
      } else {
        localStorage.removeItem("rememberAdminUsername");
      }

      /*
       * Successful login
       */
      navigate("/admin", { replace: true });

    } catch (err) {
      console.error("Admin login error:", err);

      const backendMessage =
        err?.response?.data?.message;

      setError(
        backendMessage ||
          err?.message ||
          "Invalid username or password."
      );

    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      {/* ============================================
          TOP HEADER
      ============================================ */}

      <header className="login-header">

        <div
          className="login-logo"
          onClick={() => navigate("/")}
        >
          <div className="logo-mark">
            <span></span>
            <span></span>
          </div>

          <div className="logo-text">
            <strong>PROSPER</strong>
            <small>FOUNDATION</small>
          </div>
        </div>

        <div className="ai-badge">
          Made with AI
        </div>

      </header>


      {/* ============================================
          BACKGROUND DECORATIONS
      ============================================ */}

      <div className="background-decoration decoration-one"></div>
      <div className="background-decoration decoration-two"></div>
      <div className="background-decoration decoration-three"></div>

      <div className="gold-circle circle-one"></div>
      <div className="gold-circle circle-two"></div>

      <div className="hexagon hexagon-one"></div>
      <div className="hexagon hexagon-two"></div>


      {/* ============================================
          MAIN LOGIN AREA
      ============================================ */}

      <main className="login-main">

        <div className="login-heading">

          <span className="heading-line"></span>

          <h1>
            Admin Login
          </h1>

          <div className="heading-subtitle">
            <span></span>
            <p>Access Your Dashboard</p>
            <span></span>
          </div>

        </div>


        {/* ==========================================
            LOGIN CARD
        ========================================== */}

        <div className="login-card">

          <form
            onSubmit={handleSubmit}
            noValidate
          >

            {/* Error */}

            {error && (
              <div className="login-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}


            {/* Username */}

            <div className="input-group">

              <div className="input-icon">
                <FaEnvelope />
              </div>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Username"
                autoComplete="username"
                disabled={loginLoading}
              />

            </div>


            {/* Password */}

            <div className="input-group">

              <div className="input-icon">
                <FaLock />
              </div>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                autoComplete="current-password"
                disabled={loginLoading}
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                disabled={loginLoading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <>
                    <FaEyeSlash />
                    <span>Hide</span>
                  </>
                ) : (
                  <>
                    <FaEye />
                    <span>Show</span>
                  </>
                )}
              </button>

            </div>


            {/* Remember Me */}

            <div className="login-options">

              <label className="remember-option">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(
                      e.target.checked
                    )
                  }
                  disabled={loginLoading}
                />

                <span className="custom-checkbox"></span>

                <span>
                  Remember username
                </span>

              </label>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="login-button"
              disabled={loginLoading}
            >

              {loginLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                "Login"
              )}

            </button>

          </form>


          {/* ========================================
              CARD FOOTER
          ======================================== */}

          <div className="login-card-footer">

            <button
              type="button"
              onClick={() => {
                setError(
                  "Please contact the administrator to reset your password."
                );
              }}
            >
              Forgot Password?
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>

          </div>

        </div>


        {/* Security message */}

        <div className="security-message">

          <FaLock />

          <span>
            Secure administrator access •
            Authorized personnel only
          </span>

        </div>

      </main>


      {/* ============================================
          CITY / BOTTOM DECORATION
      ============================================ */}

      <div className="city-decoration">

        <div className="building building-1"></div>
        <div className="building building-2"></div>
        <div className="building building-3"></div>
        <div className="building building-4"></div>
        <div className="building building-5"></div>
        <div className="building building-6"></div>
        <div className="building building-7"></div>
        <div className="building building-8"></div>
        <div className="building building-9"></div>
        <div className="building building-10"></div>

      </div>


      {/* Bottom gold wave */}

      <div className="bottom-wave"></div>

    </div>
  );
};

export default AdminLogin;