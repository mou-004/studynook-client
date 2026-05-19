import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import useTitle from "../hooks/useTitle";
export default function MyBookings() {
  useTitle("StudyNook – My Bookings");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadBookings = () => {
    setLoading(true);

    api
      .get("/api/bookings/mine")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const isFutureBooking = (booking) => {
    return new Date(`${booking.date}T${booking.startTime}`) > new Date();
  };

  const cancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      await api.patch(`/api/bookings/${selectedBooking._id}/cancel`);
      toast.success("Booking cancelled");
      setSelectedBooking(null);
      loadBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <>
      <main className="bookings-page">
        <section className="bookings-hero">
          <div>
            <span className="eyebrow">Student Dashboard</span>
            <h1>My Bookings</h1>
            <p>
              Track your confirmed and cancelled room bookings in one clean,
              simple dashboard.
            </p>
          </div>
        </section>

        <section className="section">
          {loading ? (
            <div className="loader">Loading your bookings...</div>
          ) : items.length > 0 ? (
            <div className="booking-cards">
              {items.map((booking) => (
                <article className="booking-card" key={booking._id}>
                 <img
                   src={booking.room?.image || fallbackImage}
                     alt={booking.room?.name || "Study room"}
                        onError={(e) => {
                         e.target.src = fallbackImage;
                           }}
                               />
                  <div className="booking-content">
                    <div>
                      <span className={`badge ${booking.status}`}>
                        {booking.status}
                      </span>
                      <h3>{booking.room?.name || "Deleted Room"}</h3>
                    </div>

                    <div className="booking-info">
                      <p>
                        <b>Date:</b> {booking.date}
                      </p>
                      <p>
                        <b>Time:</b> {booking.startTime} - {booking.endTime}
                      </p>
                      <p>
                        <b>Total Cost:</b> ${booking.totalCost}
                      </p>
                    </div>

                    {booking.status === "confirmed" &&
                      isFutureBooking(booking) && (
                        <button
                          className="danger"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          Cancel Booking
                        </button>
                      )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-bookings">
              <h2>You have no bookings yet.</h2>
              <p>
                Explore available study rooms and reserve a quiet space for your
                next focused session.
              </p>
            </div>
          )}
        </section>
      </main>

      {selectedBooking && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h2>Cancel this booking?</h2>
            <p>
              This action will mark your booking as cancelled. You can book
              another available slot later.
            </p>

            <div className="confirm-actions">
              <button className="danger" onClick={cancelBooking}>
                Yes, Cancel
              </button>
              <button
                className="cancel-btn"
                onClick={() => setSelectedBooking(null)}
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bookings-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.16), transparent 35%),
            linear-gradient(180deg, #f8fafc 0%, #eef6f7 100%);
          padding-bottom: 70px;
        }

        .bookings-hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 70px 20px 30px;
        }

        .bookings-hero > div {
          border-radius: 34px;
          padding: 65px 50px;
          color: white;
          background:
            linear-gradient(90deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.68)),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop");
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

        .bookings-hero h1 {
          margin: 0;
          font-size: clamp(36px, 5vw, 62px);
          line-height: 1.05;
        }

        .bookings-hero p {
          max-width: 620px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 18px;
          line-height: 1.7;
        }

        .booking-cards {
          display: grid;
          gap: 22px;
          animation: fadeUp 0.7s ease both;
        }

        .booking-card {
          display: grid;
          grid-template-columns: 230px 1fr;
          overflow: hidden;
          border-radius: 28px;
          background: white;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
          transition: 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 70px rgba(15, 23, 42, 0.14);
        }

        .booking-card img {
          width: 100%;
          height: 100%;
          min-height: 220px;
          object-fit: cover;
        }

        .booking-content {
          display: grid;
          gap: 18px;
          padding: 26px;
        }

        .booking-content h3 {
          margin: 12px 0 0;
          color: #0f172a;
          font-size: 26px;
        }

        .booking-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .booking-info p {
          margin: 0;
          padding: 14px;
          border-radius: 16px;
          background: #f8fafc;
          color: #475569;
        }

        .badge {
          display: inline-block;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          text-transform: capitalize;
        }

        .badge.confirmed {
          background: #dcfce7;
          color: #166534;
        }

        .badge.cancelled {
          background: #fee2e2;
          color: #991b1b;
        }

        .danger {
          width: fit-content;
          border: none;
          border-radius: 14px;
          padding: 12px 18px;
          color: white;
          background: linear-gradient(135deg, #dc2626, #ef4444);
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(239, 68, 68, 0.28);
        }

        .loader,
        .empty-bookings {
          padding: 65px 30px;
          text-align: center;
          border-radius: 30px;
          background: white;
          box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(15, 23, 42, 0.06);
        }

        .empty-bookings h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 30px;
        }

        .empty-bookings p,
        .loader {
          color: #64748b;
          font-weight: 700;
        }

        .confirm-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(8px);
        }

        .confirm-modal {
          width: 100%;
          max-width: 430px;
          padding: 30px;
          border-radius: 28px;
          background: white;
          box-shadow: 0 30px 90px rgba(15, 23, 42, 0.28);
          animation: scaleIn 0.25s ease both;
        }

        .confirm-modal h2 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 28px;
        }

        .confirm-modal p {
          margin: 0 0 24px;
          color: #64748b;
          line-height: 1.7;
        }

        .confirm-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cancel-btn {
          border: none;
          border-radius: 14px;
          padding: 12px 18px;
          color: #0f172a;
          background: #e2e8f0;
          font-weight: 800;
          cursor: pointer;
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.94);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 850px) {
          .booking-card {
            grid-template-columns: 1fr;
          }

          .booking-card img {
            height: 250px;
          }

          .booking-info {
            grid-template-columns: 1fr;
          }

          .bookings-hero > div {
            padding: 50px 30px;
          }
        }

        @media (max-width: 560px) {
          .bookings-hero {
            padding-top: 42px;
          }

          .bookings-hero > div {
            padding: 42px 24px;
            border-radius: 26px;
          }

          .booking-content {
            padding: 22px;
          }

          .confirm-modal {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
