import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in → go straight to dashboard
  if (!loading && isAuthenticated) {
    const dest = location.state?.from?.pathname || "/";
    return <Navigate to={dest} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailOrUsername || !password) {
      setError("Please enter both your email/username and password.");
      return;
    }

    setSubmitting(true);
    try {
      await login(emailOrUsername, password);
      const dest = location.state?.from?.pathname || "/";
      navigate(dest, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <span className="logo-icon">GX</span>
          <span className="login-title">GameX Admin</span>
        </div>
        <p className="login-subtitle">Sign in to manage your website content</p>

        {error && <div className="login-error">{error}</div>}

        <div className="field">
          <label>Email or Username</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="admin@gamex.com"
            autoComplete="username"
            autoFocus
          />
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="login-btn" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f1117;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .login-card {
          width: 100%;
          max-width: 380px;
          background: #161c24;
          border: 1px solid #1e293b;
          border-radius: 16px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
        }
        .login-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }
        .logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 14px; color: white;
          flex-shrink: 0;
        }
        .login-title { font-weight: 700; font-size: 20px; color: white; }
        .login-subtitle { color: #64748b; font-size: 14px; margin-bottom: 24px; }
        .login-error {
          background: #450a0a30;
          border: 1px solid #7f1d1d;
          color: #fca5a5;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .field { margin-bottom: 18px; }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 7px;
        }
        .field input {
          width: 100%;
          background: #1e293b;
          border: 1px solid #2d3f55;
          border-radius: 10px;
          padding: 11px 14px;
          color: #e2e8f0;
          font-size: 14px;
          font-family: inherit;
        }
        .field input:focus { outline: none; border-color: #3b82f6; }
        .login-btn {
          margin-top: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.2s;
        }
        .login-btn:hover:not(:disabled) { filter: brightness(1.15); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .auth-loading {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0f1117;
          color: #64748b;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
        }
      `}</style>
    </div>
  );
}
