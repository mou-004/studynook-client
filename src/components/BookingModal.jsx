import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const getHour = (time) => Number(time.split(":")[0]);

export default function BookingModal({ room, onClose, onBooked }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    startTime: "08:00",
    endTime: "09:00",
    note: "",
  });

  const endTimes = times.filter((time) => getHour(time) > getHour(form.startTime));

  const totalCost = useMemo(() => {
    return (
      Math.max(0, getHour(form.endTime) - getHour(form.startTime)) *
      room.hourlyRate
    );
  }, [form, room]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/bookings", {
        ...form,
        roomId: room._id,
      });

      toast.success("Room booked successfully!");
      onBooked?.();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="overlay">
      <form className="modal booking-modal" onSubmit={submit}>
        <h2>Book {room.name}</h2>

        <label>
          Date
          <input
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </label>

        <label>
          Start Time
          <select
            value={form.startTime}
            onChange={(e) =>
              setForm({
                ...form,
                startTime: e.target.value,
                endTime:
                  times.find((time) => getHour(time) > getHour(e.target.value)) ||
                  "20:00",
              })
            }
          >
            {times.slice(0, -1).map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </label>

        <label>
          End Time
          <select
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          >
            {endTimes.map((time) => (
              <option key={time}>{time}</option>
            ))}
          </select>
        </label>

        <label>
          Special Note
          <textarea
            placeholder="Optional note"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
          />
        </label>

        <h3>Total Cost: ${totalCost}</h3>

        <div className="row">
          <button className="btn" type="submit">
            Confirm Booking
          </button>

          <button className="btn ghost" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}