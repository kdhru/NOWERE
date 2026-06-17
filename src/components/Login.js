import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../config/api.js";
import "../pages/ChatHome.css";
import google_logo from "../assets/google_logo.png";

function Login() {
  const [searchParams] = useSearchParams();
  const isError = searchParams.get("error") === "failed";
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status on load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(config.ENDPOINTS.AUTH.STATUS, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setLoggedIn(data.loggedIn);
        }
      } catch (err) {
        console.error("Login check failed:", err);
      }
    };

    checkLoginStatus();

    // Re-check every 3 seconds, stop after success
    const interval = setInterval(async () => {
      if (!loggedIn) {
        checkLoginStatus();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [loggedIn]);

  const handleGoogleLogin = () => {
    window.location.href = config.ENDPOINTS.AUTH.LOGIN;
  };

  if (loggedIn) return null;

  return (
    <div className="overlay">
      <div className="login-box">
        <div style={{ textAlign: "center" }}>
          {isError && (
            <p className="error-text" style={{ color: "red", fontWeight: "bold" }}>
              ❌ Login failed, please try again
            </p>
          )}
          <h2>Welcome to Chat</h2>
          <button
            onClick={handleGoogleLogin}
            className="google-btn"
            style={{ cursor: "pointer" }}
          >
            <img src={google_logo} alt="Google Logo" className="google-icon" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;