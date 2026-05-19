import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import BookingModal from "../components/BookingModal";
import useTitle from "../hooks/useTitle";

const amenities = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const fallback =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80";

export default function RoomDetails() {
  useTitle("StudyNook – Room Details");

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [form, setForm] = useState(null);

  const loadRoom = () => {
    setLoading(true);

    api
      .get(`/api/rooms/${id}`)
      .then((res) => {
        setRoom(res.data);
        setForm({
          ...res.data,
          amenities: res.data.amenities || [],
        });
      })
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRoom();
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (!room) return <div className="empty">Room not found</div>;

  const userId = user?.id || user?._id;
  const ownerId = room.owner?._id || room.owner;
  const isOwner = userId && ownerId && String(userId) === String(ownerId);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${id}`);
      toast.success("Room deleted successfully");
      setDeleteModal(false);
      navigate("/my-listings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/rooms/${id}`, form);
      toast.success("Room updated successfully");
      setEditModal(false);
      loadRoom();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const toggleAmenity = (amenity) => {
    setForm((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }));
  };

  return (
    <>
      <section className="section detail">
        <img
          className="detail-img"
          src={room.image || fallback}
          alt={room.name}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />

        <div className="detail-content">
          <h1>{room.name}</h1>
          <p>{room.description}</p>

          <p>
            <b>Floor:</b> {room.floor}
          </p>
          <p>
            <b>Capacity:</b> {room.capacity} people
          </p>
          <p>
            <b>Hourly Rate:</b> ${room.hourlyRate}/hr
          </p>
          <p>
            <b>Booking Count:</b> {room.bookingCount || 0}
          </p>

          <div className="chips">
            {room.amenities?.map((amenity) => (
              <small key={amenity}>{amenity}</small>
            ))}
          </div>

          <div className="detail-actions">
            {user ? (
              <button
                className="btn detail-btn"
                onClick={() => setBookingModal(true)}
              >
                Book Now
              </button>
            ) : (
              <Link
                className="btn detail-btn"
                to="/login"
                state={{ from: location }}
              >
                Login to Book
              </Link>
            )}

            {isOwner && (
              <>
                <button
                  className="btn ghost detail-btn"
                  onClick={() => setEditModal(true)}
                >
                  Edit
                </button>

                <button
                  className="danger detail-btn"
                  onClick={() => setDeleteModal(true)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {bookingModal && (
        <BookingModal
          room={room}
          onClose={() => setBookingModal(false)}
          onBooked={loadRoom}
        />
      )}

      {deleteModal && (
        <div className="overlay">
          <div className="modal confirm-modal">
            <h2>Delete this room?</h2>
            <p>This room will be permanently deleted.</p>

            <div className="row">
              <button className="danger" onClick={handleDelete}>
                Yes, Delete
              </button>

              <button
                type="button"
                className="btn ghost"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editModal && form && (
        <div className="overlay">
          <form className="modal edit-room-modal" onSubmit={handleSave}>
            <h2>Edit Room</h2>

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              required
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <input
              required
              value={form.floor}
              onChange={(e) => setForm({ ...form, floor: e.target.value })}
            />

            <input
              required
              type="number"
              min="1"
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: Number(e.target.value) })
              }
            />

            <input
              required
              type="number"
              min="5"
              value={form.hourlyRate}
              onChange={(e) =>
                setForm({ ...form, hourlyRate: Number(e.target.value) })
              }
            />

            <div className="checks">
              {amenities.map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>

            <div className="row">
              <button className="btn">Save</button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => setEditModal(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
