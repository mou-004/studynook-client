import { useEffect, useState } from "react";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import useTitle from "../hooks/useTitle";

const amenities = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function Rooms() {
  useTitle("StudyNook – Available Rooms");

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  useEffect(() => {
    setLoading(true);

    api
      .get("/api/rooms", {
        params: {
          search,
          amenities: selectedAmenities.join(","),
        },
      })
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, [search, selectedAmenities]);

  return (
    <>
      <main className="rooms-page">
        <section className="rooms-hero">
          <div>
            <span className="eyebrow">StudyNook Rooms</span>
            <h1>Available Rooms</h1>
            <p>
              Browse quiet, private, and comfortable study spaces for your next
              focused session.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="filter">
            <input
              type="text"
              placeholder="Search by room name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="amenity-filter">
              {amenities.map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loader">Loading rooms...</div>
          ) : rooms.length > 0 ? (
            <div className="grid">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <div className="empty">No rooms found</div>
          )}
        </section>
      </main>

      <style>{`
        .rooms-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #f8fafc 0%, #eef6f7 100%);
        }

        .rooms-hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 70px 20px 30px;
        }

        .rooms-hero div {
          border-radius: 32px;
          padding: 65px 50px;
          color: white;
          background:
            linear-gradient(90deg, rgba(15, 23, 42, 0.9), rgba(15, 118, 110, 0.65)),
            url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          box-shadow: 0 25px 70px rgba(15, 23, 42, 0.22);
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 12px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.16);
          font-size: 13px;
          font-weight: 700;
        }

        .rooms-hero h1 {
          margin: 0;
          font-size: clamp(36px, 5vw, 60px);
        }

        .rooms-hero p {
          max-width: 600px;
          font-size: 18px;
          line-height: 1.7;
        }

        .filter {
          display: grid;
          gap: 18px;
          margin-bottom: 32px;
          padding: 20px;
          border-radius: 24px;
          background: white;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        }

        .filter input[type="text"] {
          width: 100%;
          padding: 15px 16px;
          border: 1px solid #dbe7ea;
          border-radius: 16px;
          outline: none;
          font-size: 15px;
        }

        .filter input[type="text"]:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.12);
        }

        .amenity-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .amenity-filter label {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 999px;
          background: #ecfeff;
          color: #0f766e;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .amenity-filter input {
          accent-color: #0f766e;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .loader,
        .empty {
          padding: 60px 20px;
          text-align: center;
          border-radius: 24px;
          background: white;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
          color: #64748b;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .rooms-hero div {
            padding: 50px 32px;
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .rooms-hero {
            padding-top: 40px;
          }

          .rooms-hero div {
            padding: 42px 24px;
            border-radius: 24px;
          }
        }
      `}</style>
    </>
  );
}