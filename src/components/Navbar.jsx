import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  return (
    <nav className="nav">
      <Link className="logo" to="/" onClick={closeMenu}>
        <span>SN</span>
        StudyNook
      </Link>

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={open ? "links open" : "links"}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/rooms" onClick={closeMenu}>
          Rooms
        </NavLink>

        {user && (
          <>
            <NavLink to="/add-room" onClick={closeMenu}>
              Add Room
            </NavLink>
            <NavLink to="/my-listings" onClick={closeMenu}>
              My Listings
            </NavLink>
            <NavLink to="/my-bookings" onClick={closeMenu}>
              My Bookings
            </NavLink>
          </>
        )}

        {!user ? (
          <>
            <Link className="btn ghost" to="/login" onClick={closeMenu}>
              Login
            </Link>
            <Link className="btn" to="/register" onClick={closeMenu}>
              Register
            </Link>
          </>
        ) : (
          <div className="profile">
            <img src={user.photo} alt={user.name} />
            <span>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}