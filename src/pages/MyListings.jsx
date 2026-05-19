import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import useTitle from "../hooks/useTitle";

export default function MyListings() {
  useTitle("StudyNook – My Listings");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/rooms/mine")
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <main className="my-listings-page">
        <section className="listings-hero">
          <div>
            <span className="eyebrow">Owner Dashboard</span>
            <h1>My Listings</h1>
            <p>
              Manage the study rooms you have added, review details, and keep
              your available spaces ready for students.
            </p>

            <Link to="/add-room" className="hero-btn">
              Add New Room
            </Link>
          </div>
        </section>

        <section className="section">
          {loading ? (
            <div className="loader">Loading your listings...</div>
          ) : rooms.length > 0 ? (
            <div className="grid listings-grid">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <div className="empty-listings">
              <h2>You have not added any rooms yet.</h2>
              <p>
                Start by adding your first study room with image, capacity,
                amenities, and hourly rate.
              </p>
              <Link to="/add-room" className="hero-btn">
                Add Your First Room
              </Link>
            </div>
          )}
        </section>
      </main>

      <style>{`
        .my-listings-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.16), transparent 35%),
            linear-gradient(180deg, #f8fafc 0%, #eef6f7 100%);
          padding-bottom: 70px;
        }

        .listings-hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 70px 20px 30px;
        }

        .listings-hero > div {
          border-radius: 34px;
          padding: 65px 50px;
          color: white;
          background:
            linear-gradient(90deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.68)),
            url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.22);
          animation: fadeUp 0.6s ease both;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .listings-hero h1 {
          margin: 0;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 1.05;
        }

        .listings-hero p {
          max-width: 620px;
          margin: 18px 0 28px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 18px;
          line-height: 1.7;
        }

        .hero-btn {
          display: inline-block;
          padding: 14px 22px;
          border-radius: 999px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 16px 35px rgba(20, 184, 166, 0.3);
          transition: 0.25s ease;
        }

        .hero-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(20, 184, 166, 0.4);
        }

        .listings-grid {
          animation: fadeUp 0.7s ease both;
        }

        .empty-listings {
          padding: 65px 30px;
          text-align: center;
          border-radius: 30px;
          background: white;
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.06);
          animation: fadeUp 0.6s ease both;
        }

        .empty-listings h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 30px;
        }

        .empty-listings p {
          max-width: 560px;
          margin: 0 auto 24px;
          color: #64748b;
          line-height: 1.7;
        }

        .loader {
          padding: 60px 20px;
          text-align: center;
          border-radius: 24px;
          background: white;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
          color: #64748b;
          font-weight: 700;
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

        @media (max-width: 700px) {
          .listings-hero {
            padding-top: 42px;
          }

          .listings-hero > div {
            padding: 46px 24px;
            border-radius: 26px;
          }

          .listings-hero p {
            font-size: 16px;
          }

          .empty-listings {
            padding: 48px 22px;
          }
        }
      `}</style>
    </>
  );
}
