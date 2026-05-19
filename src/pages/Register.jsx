import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import useTitle from "../hooks/useTitle";
export default function Register() {
  useTitle("StudyNook – Register");

  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const googleBtnRef = useRef(null);

  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });

  useEffect(() => {
    const renderGoogleButton = () => {
      if (!window.google || !googleBtnRef.current) return;

      if (window.__googleInitDone) return;
      window.__googleInitDone = true;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            if (!response?.credential) {
              throw new Error("No Google credential received");
            }

            await googleLogin(response.credential);
            toast.success("Google registration successful");
            navigate("/");
          } catch (err) {
            toast.error(
              err?.response?.data?.message || "Google registration failed"
            );
          }
        },
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
      });
    };

    renderGoogleButton();
  }, [googleLogin, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      form.password.length < 6 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password)
    ) {
      setError(
        "Password must be at least 6 characters and include uppercase and lowercase letters."
      );
      return;
    }

    try {
      await api.post("/api/auth/register", form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <section className="register-page">
        <div className="register-shell">
          <div className="register-left">
            <span className="auth-badge">Join StudyNook</span>
            <h1>Create your account and start booking smarter.</h1>
            <p>
              Find quiet study rooms, manage your bookings, and list your own
              available spaces with a secure student-friendly platform.
            </p>

            <div className="auth-features">
              <div>
                <b>✓</b>
                <span>Book peaceful study rooms</span>
              </div>

              <div>
                <b>✓</b>
                <span>Manage your own listings</span>
              </div>

              <div>
                <b>✓</b>
                <span>Secure JWT cookie authentication</span>
              </div>
            </div>
          </div>

          <form className="register-card" onSubmit={submit}>
            <h2>Register</h2>
            <p className="form-subtitle">Create your StudyNook profile.</p>

            <label>Name</label>
            <input
              required
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Email</label>
            <input
              required
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label>Photo URL</label>
            <input
              required
              type="text"
              placeholder="Paste your profile photo URL"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
            />

            <label>Password</label>
            <input
              required
              type="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            {error && <p className="error">{error}</p>}

            <button className="auth-btn" type="submit">
              Register
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="google-box">
              <div ref={googleBtnRef}></div>
            </div>

            <p className="auth-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>

      <style>{`
        .register-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 70px 8%;
          background:
            radial-gradient(circle at 10% 10%, rgba(20, 184, 166, 0.22), transparent 32%),
            linear-gradient(135deg, #f8fafc 0%, #e6f7f7 100%);
        }

        .register-shell {
          width: 100%;
          max-width: 1180px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          align-items: stretch;
        }

        .register-left,
        .register-card {
          min-height: 640px;
        }

        .register-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 36px;
          padding: 56px;
          color: white;
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.72)),
            url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1500&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.25);
          animation: fadeUp 0.6s ease both;
        }

        .auth-badge {
          width: fit-content;
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

        .register-left h1 {
          margin: 0;
          font-size: clamp(38px, 5vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.04em;
        }

        .register-left p {
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
          max-width: 430px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.13);
          backdrop-filter: blur(12px);
        }

        .auth-features b {
          display: grid;
          place-items: center;
          min-width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #14b8a6;
          color: white;
        }

        .register-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 42px;
          border-radius: 36px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
          animation: fadeUp 0.75s ease both;
        }

        .register-card h2 {
          margin: 0;
          color: #0f172a;
          font-size: 38px;
          letter-spacing: -0.03em;
        }

        .form-subtitle {
          margin: 8px 0 24px;
          color: #64748b;
        }

        .register-card label {
          display: block;
          margin-bottom: 7px;
          color: #0f172a;
          font-size: 14px;
          font-weight: 800;
        }

        .register-card input {
          width: 100%;
          margin-bottom: 15px;
          padding: 14px 15px;
          border: 1px solid #dbe7ea;
          border-radius: 16px;
          background: white;
          color: #0f172a;
          outline: none;
          font-size: 15px;
          transition: 0.25s ease;
        }

        .register-card input:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.12);
        }

        .error {
          margin: 0 0 15px;
          padding: 12px 14px;
          border-radius: 14px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 14px;
          font-weight: 700;
          line-height: 1.5;
        }

        .auth-btn {
          width: 100%;
          border: none;
          border-radius: 16px;
          padding: 14px 18px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          box-shadow: 0 14px 32px rgba(20, 184, 166, 0.28);
          font-weight: 900;
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
          align-items: center;
          min-height: 44px;
          margin-top: 4px;
        }

        .google-box > div {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .auth-link {
          margin: 20px 0 0;
          text-align: center;
          color: #64748b;
        }

        .auth-link a {
          color: #0f766e;
          font-weight: 900;
          text-decoration: none;
        }

        .auth-link a:hover {
          text-decoration: underline;
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

        @media (max-width: 980px) {
          .register-page {
            padding: 45px 5%;
          }

          .register-shell {
            grid-template-columns: 1fr;
          }

          .register-left,
          .register-card {
            min-height: auto;
          }

          .register-left {
            padding: 52px 34px;
          }
        }

        @media (max-width: 560px) {
          .register-page {
            padding: 35px 14px;
          }

          .register-left {
            border-radius: 26px;
            padding: 42px 24px;
          }

          .register-card {
            padding: 28px 22px;
            border-radius: 24px;
          }

          .register-card h2 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
