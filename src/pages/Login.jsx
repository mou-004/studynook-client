import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import useTitle from "../hooks/useTitle";

export default function Login() {
  useTitle("StudyNook – Login");

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const googleBtnRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const go = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!window.google || !googleBtnRef.current) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        try {
          await googleLogin(response.credential);
          toast.success("Google login successful");
          navigate(go);
        } catch {
          toast.error("Google login failed");
        }
      },
    });

    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: "outline",
      size: "large",
      width: 320,
      text: "continue_with",
    });
  }, [googleLogin, navigate, go]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      toast.success("Login successful");
      navigate(go);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <>
      <section className="login-page">
        <div className="login-left">
          <span className="auth-badge">Welcome Back</span>
          <h1>Log in and book your perfect study space.</h1>
          <p>
            Access your bookings, manage listings, and reserve quiet study rooms
            with a smooth and secure StudyNook experience.
          </p>

          <div className="auth-features">
            <div>
              <b>✓</b>
              <span>Secure HTTP-only cookie authentication</span>
            </div>
            <div>
              <b>✓</b>
              <span>Quick booking with conflict protection</span>
            </div>
            <div>
              <b>✓</b>
              <span>Manage rooms and bookings from dashboard</span>
            </div>
          </div>
        </div>

        <form className="login-card" onSubmit={submit}>
          <h2>Login</h2>
          <p className="form-subtitle">Continue to your StudyNook account.</p>

          <label>Email</label>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <label>Password</label>
          <input
            type="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="auth-btn" type="submit">
            Login
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="google-box" ref={googleBtnRef}></div>

          <p className="auth-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 40px;
          padding: 70px 8%;
          background:
            radial-gradient(circle at 10% 10%, rgba(20, 184, 166, 0.22), transparent 32%),
            linear-gradient(135deg, #f8fafc 0%, #e6f7f7 100%);
        }

        .login-left {
          min-height: 580px;
          border-radius: 36px;
          padding: 65px 55px;
          color: white;
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.72)),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1500&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.25);
          animation: fadeUp 0.6s ease both;
        }

        .auth-badge {
          display: inline-block;
          margin-bottom: 20px;
          padding: 9px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .login-left h1 {
          max-width: 650px;
          margin: 0;
          font-size: clamp(38px, 5vw, 66px);
          line-height: 1.04;
        }

        .login-left p {
          max-width: 560px;
          margin-top: 22px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 18px;
          line-height: 1.7;
        }

        .auth-features {
          display: grid;
          gap: 14px;
          margin-top: 38px;
        }

        .auth-features div {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          max-width: 450px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(12px);
        }

        .auth-features b {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #14b8a6;
          color: white;
        }

        .login-card {
          width: 100%;
          max-width: 470px;
          margin-left: auto;
          padding: 38px;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
          animation: fadeUp 0.75s ease both;
        }

        .login-card h2 {
          margin: 0;
          color: #0f172a;
          font-size: 34px;
        }

        .form-subtitle {
          margin: 8px 0 24px;
          color: #64748b;
        }

        .login-card label {
          display: block;
          margin-bottom: 7px;
          color: #0f172a;
          font-size: 14px;
          font-weight: 700;
        }

        .login-card input {
          width: 100%;
          margin-bottom: 16px;
          padding: 14px 15px;
          border: 1px solid #dbe7ea;
          border-radius: 16px;
          background: white;
          outline: none;
          font-size: 15px;
          transition: 0.25s ease;
        }

        .login-card input:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.12);
        }

        .auth-btn {
          width: 100%;
          border: none;
          border-radius: 16px;
          padding: 14px 18px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          box-shadow: 0 14px 32px rgba(20, 184, 166, 0.28);
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .auth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 35px rgba(15, 23, 42, 0.16);
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 700;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .google-box {
          display: flex;
          justify-content: center;
          min-height: 44px;
        }

        .auth-link {
          margin: 20px 0 0;
          text-align: center;
          color: #64748b;
        }

        .auth-link a {
          color: #0f766e;
          font-weight: 800;
          text-decoration: none;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 950px) {
          .login-page {
            grid-template-columns: 1fr;
            padding: 45px 5%;
          }

          .login-left {
            min-height: auto;
            padding: 52px 34px;
          }

          .login-card {
            max-width: 100%;
            margin: 0;
          }
        }

        @media (max-width: 560px) {
          .login-left {
            border-radius: 26px;
            padding: 42px 24px;
          }

          .login-card {
            padding: 28px 22px;
            border-radius: 24px;
          }
        }
      `}</style>
    </>
  );
}