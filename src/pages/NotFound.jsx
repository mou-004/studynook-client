import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

export default function NotFound() {
  useTitle("StudyNook – Not Found");

  return (
    <>
      <section className="notfound-page">
        <div className="notfound-card">
          <span className="notfound-code">404</span>

          <h1>Page not found</h1>

          <p>
            The page you are looking for does not exist or may have been moved.
            Go back home and continue exploring StudyNook rooms.
          </p>

          <Link className="notfound-btn" to="/">
            Back to Home
          </Link>
        </div>
      </section>

      <style>{`
        .notfound-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 40px 20px;
          background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.22), transparent 32%),
            linear-gradient(135deg, #f8fafc 0%, #e6f7f7 100%);
        }

        .notfound-card {
          width: 100%;
          max-width: 720px;
          padding: 70px 40px;
          text-align: center;
          border-radius: 36px;
          color: white;
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(15, 118, 110, 0.75)),
            url("https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1400&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.24);
          animation: fadeUp 0.6s ease both;
        }

        .notfound-code {
          display: inline-block;
          margin-bottom: 18px;
          font-size: clamp(70px, 12vw, 140px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -0.08em;
          color: rgba(255, 255, 255, 0.9);
        }

        .notfound-card h1 {
          margin: 0;
          font-size: clamp(32px, 5vw, 56px);
        }

        .notfound-card p {
          max-width: 520px;
          margin: 18px auto 30px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 17px;
          line-height: 1.7;
        }

        .notfound-btn {
          display: inline-block;
          padding: 14px 24px;
          border-radius: 999px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 16px 35px rgba(20, 184, 166, 0.3);
          transition: 0.25s ease;
        }

        .notfound-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(20, 184, 166, 0.4);
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

        @media (max-width: 560px) {
          .notfound-card {
            padding: 55px 24px;
            border-radius: 26px;
          }
        }
      `}</style>
    </>
  );
}