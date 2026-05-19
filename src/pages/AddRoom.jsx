import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import useTitle from "../hooks/useTitle";

const amenitiesList = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];
export default function AddRoom() {
  useTitle("StudyNook – Add Room");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: 1,
    hourlyRate: 1,
    amenities: [],
  });

  const toggleAmenity = (amenity) => {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/rooms", form);
      toast.success("Room added successfully");
      navigate("/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add room");
    }
  };

  return (
    <>
      <section className="add-room-page">
        <div className="add-room-hero">
          <span className="add-badge">Owner Panel</span>
          <h1>Add a Study Room</h1>
          <p>
            Create a professional room listing with image, floor, capacity,
            hourly rate, and amenities. Once added, students can view and book
            it from the rooms page.
          </p>

          <div className="preview-card">
            <b>Listing Preview</b>
            <span>Image • Amenities • Hourly rate • Booking count</span>
          </div>
        </div>

        <form className="add-room-form" onSubmit={submit}>
          <h2>Room Information</h2>
          <p className="form-subtitle">
            Fill in the details carefully to make the room easy to find.
          </p>

          <div className="form-grid">
            <div className="field full-field">
              <label>Room Name</label>
              <input
                required
                type="text"
                placeholder="e.g., North Wing Quiet Room"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="field full-field">
              <label>Description</label>
              <textarea
                required
                placeholder="Write a short description of the room"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="field full-field">
              <label>Image URL</label>
              <input
                required
                type="url"
                placeholder="Paste room image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Floor</label>
              <input
                required
                type="text"
                placeholder="e.g., 3rd Floor"
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Capacity</label>
              <input
                required
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: Number(e.target.value) })
                }
              />
            </div>

            <div className="field">
              <label>Hourly Rate</label>
              <input
                required
                type="number"
                min="1"
                value={form.hourlyRate}
                onChange={(e) =>
                  setForm({ ...form, hourlyRate: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="amenities-box">
            <label className="amenities-title">Amenities</label>

            <div className="checks">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className={
                    form.amenities.includes(amenity)
                      ? "check-item active"
                      : "check-item"
                  }
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <button className="submit-room-btn" type="submit">
            Add Room
          </button>
        </form>
      </section>

      <style>{`
        .add-room-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 44px;
          align-items: center;
          padding: 70px 8%;
          background:
            radial-gradient(circle at top left, rgba(20, 184, 166, 0.2), transparent 34%),
            linear-gradient(135deg, #f8fafc 0%, #e6f7f7 100%);
        }

        .add-room-hero {
          min-height: 650px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 36px;
          padding: 60px 50px;
          color: white;
          background:
            linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.72)),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1500&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 80px rgba(15, 23, 42, 0.24);
          animation: fadeUp 0.65s ease both;
        }

        .add-badge {
          width: fit-content;
          margin-bottom: 18px;
          padding: 9px 15px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(10px);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .add-room-hero h1 {
          margin: 0;
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1.04;
          letter-spacing: -0.04em;
        }

        .add-room-hero p {
          max-width: 560px;
          margin: 22px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 18px;
          line-height: 1.75;
        }

        .preview-card {
          display: grid;
          gap: 6px;
          max-width: 380px;
          margin-top: 34px;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(14px);
        }

        .preview-card b {
          font-size: 20px;
        }

        .preview-card span {
          color: rgba(255, 255, 255, 0.78);
          font-size: 14px;
        }

        .add-room-form {
          padding: 38px;
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
          animation: fadeUp 0.8s ease both;
        }

        .add-room-form h2 {
          margin: 0;
          color: #0f172a;
          font-size: 34px;
          letter-spacing: -0.03em;
        }

        .form-subtitle {
          margin: 8px 0 24px;
          color: #64748b;
          line-height: 1.6;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .field {
          display: grid;
          gap: 7px;
        }

        .full-field {
          grid-column: 1 / -1;
        }

        .field label,
        .amenities-title {
          color: #0f172a;
          font-size: 14px;
          font-weight: 800;
        }

        .field input,
        .field textarea {
          width: 100%;
          border: 1px solid #dbe7ea;
          border-radius: 16px;
          padding: 14px 15px;
          background: white;
          outline: none;
          font-size: 15px;
          transition: 0.25s ease;
        }

        .field textarea {
          min-height: 115px;
          resize: vertical;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.12);
        }

        .amenities-box {
          margin-top: 20px;
        }

        .checks {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 13px;
          border-radius: 999px;
          background: #f8fafc;
          color: #475569;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .check-item:hover {
          transform: translateY(-2px);
          border-color: #14b8a6;
        }

        .check-item.active {
          background: #ecfeff;
          color: #0f766e;
          border-color: #99f6e4;
        }

        .check-item input {
          accent-color: #0f766e;
        }

        .submit-room-btn {
          width: 100%;
          margin-top: 24px;
          border: none;
          border-radius: 17px;
          padding: 15px 18px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          box-shadow: 0 16px 35px rgba(20, 184, 166, 0.28);
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .submit-room-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 45px rgba(20, 184, 166, 0.38);
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

        @media (max-width: 1050px) {
          .add-room-page {
            grid-template-columns: 1fr;
            padding: 50px 5%;
          }

          .add-room-hero {
            min-height: auto;
            padding: 52px 34px;
          }
        }

        @media (max-width: 650px) {
          .add-room-page {
            padding: 38px 5%;
          }

          .add-room-hero {
            border-radius: 26px;
            padding: 42px 24px;
          }

          .add-room-form {
            padding: 28px 22px;
            border-radius: 24px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
