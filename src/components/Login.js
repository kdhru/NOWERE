import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../pages/ChatHome.css";
import google_logo from "../assets/google_logo.png";

function Login() {
    const [searchParams] = useSearchParams();
    const isError = searchParams.get("error") === "failed";
    const apiBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    const [loggedIn, setLoggedIn] = useState(false);

    // ✅ Check login status on load
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get(`${apiBase}/api/user-status`, {
                    withCredentials: true
                });
                setLoggedIn(res.data.loggedIn);
            } catch (err) {
                console.error("Login check failed:", err);
                setLoggedIn(false);
            }
        };

        checkLoginStatus();

        // Re-check every 2 seconds
        const interval = setInterval(checkLoginStatus, 2000);
        return () => clearInterval(interval);
    }, [apiBase]);

    const handleGoogleLogin = () => {
        window.location.href = `${apiBase}/auth/google`;
    };

    // ✅ If logged in → render nothing (hide modal)
    if (loggedIn) return null;

    return (
        <div className="overlay">
            <div className="login-box">
                <div style={{ textAlign: 'center' }}>
                    {isError && (
                        <p className="error-text" style={{color: 'red', fontWeight: 'bold'}}>
                            ❌ Login failed, please try again
                        </p>
                    )}
                    <h2>Welcome to Chat</h2>
                    <button 
                        onClick={handleGoogleLogin} 
                        className="google-btn"
                        style={{cursor: 'pointer'}}
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