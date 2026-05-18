import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>StudyNook</h2>
        <p>Quiet study spaces, booked without stress.</p>

        <div className="social">
          <b>f</b>
          <b>𝕏</b>
          <b>in</b>
          <b>◎</b>
        </div>
      </div>

      <div>
        <h4>Useful Links</h4>
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/">About</Link>
      </div>

      <div>
        <h4>Contact</h4>
        <p>Email: hello@studynook.com</p>
        <p>Phone: +880 1700 000000</p>
      </div>

      <p className="copy">
        © {new Date().getFullYear()} StudyNook. All rights reserved.
      </p>
    </footer>
  );
}