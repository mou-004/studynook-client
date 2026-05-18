import { Link } from "react-router-dom";

const fallback =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80";

export default function RoomCard({ room }) {
  const chips = (room.amenities || []).slice(0, 3);

  return (
    <article className="card reveal">
      <div className="cardImg">
        <img
          src={room.image || fallback}
          alt={room.name}
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />

        <span className="rate">${room.hourlyRate}/hr</span>
      </div>

      <div className="cardBody">
        <h3>{room.name}</h3>

        <p>
          {room.description?.slice(0, 100)}
          {room.description?.length > 100 ? "..." : ""}
        </p>

        <div className="meta">
          <span>{room.floor}</span>
          <span>{room.capacity} people</span>
        </div>

        <div className="chips">
          {chips.map((amenity) => (
            <small key={amenity}>{amenity}</small>
          ))}

          {room.amenities?.length > 3 && (
            <small>+{room.amenities.length - 3} more</small>
          )}
        </div>

        <Link className="btn full" to={`/rooms/${room._id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}