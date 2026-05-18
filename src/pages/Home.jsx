import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import RoomCard from "../components/RoomCard";
import useTitle from "../hooks/useTitle";

const heroImg =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80";

const studyImg =
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  useTitle("StudyNook – Home");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/rooms?latest=true")
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <main className="home-page">
        <section className="hero">
          <div className="shape shape-one" />
          <div className="shape shape-two" />

          <div className="heroText">
            <span className="eyebrow">Smart Library Booking Platform</span>

            <h1>Find Your Perfect Study Room.</h1>

            <p>
              Browse available study rooms, compare amenities, book hourly
              slots, and manage everything from a clean personal dashboard.
            </p>

            <div className="heroActions">
              <Link className="btn primaryBtn" to="/rooms">
                Explore Rooms
              </Link>

              <Link className="btn secondaryBtn" to="/add-room">
                List a Room
              </Link>
            </div>

            <div className="heroStats">
              <div>
                <b>6+</b>
                <span>Latest rooms</span>
              </div>
              <div>
                <b>08–20</b>
                <span>Hourly slots</span>
              </div>
              <div>
                <b>0%</b>
                <span>Double booking</span>
              </div>
            </div>
          </div>

          <div className="heroVisual">
            <div className="imageGlow" />
            <img src={heroImg} alt="Modern library study room" />

            <div className="floatingCard cardOne">
              <b>Available Now</b>
              <span>Quiet Zone • Wi-Fi • 4 Seats</span>
            </div>

            <div className="floatingCard cardTwo">
              <b>$5/hr</b>
              <span>Flexible study slot</span>
            </div>
          </div>
        </section>

        <section className="section sectionHead">
          <span className="tag">Latest Spaces</span>
          <h2>Available Study Rooms</h2>
          <p>
            Freshly added rooms from the database using MongoDB sort and limit.
          </p>

          {loading ? (
            <div className="skeletonGrid">
              <div />
              <div />
              <div />
            </div>
          ) : rooms.length > 0 ? (
            <div className="grid animatedGrid">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          ) : (
            <div className="emptyHome">
              <h3>No rooms available yet</h3>
              <p>Add a room to see it appear here.</p>
            </div>
          )}
        </section>

        <section className="section featurePanel">
          <div className="featureText">
            <span className="tag">Why StudyNook?</span>
            <h2>Built for a smoother library booking experience.</h2>
            <p>
              StudyNook gives students a faster way to find peaceful rooms and
              gives room owners a secure way to manage their listings.
            </p>

            <div className="featureList">
              <div>
                <b>01</b>
                <span>Time-conflict detection prevents double booking.</span>
              </div>
              <div>
                <b>02</b>
                <span>Owners can update or delete only their own rooms.</span>
              </div>
              <div>
                <b>03</b>
                <span>Users can manage bookings from a private dashboard.</span>
              </div>
            </div>
          </div>

          <div className="featureImage">
            <img src={studyImg} alt="Student studying in library" />
            <div className="miniCard">
              <b>Focus Mode</b>
              <span>Quiet space reserved successfully</span>
            </div>
          </div>
        </section>

        <section className="section steps">
          <span className="tag">Simple Process</span>
          <h2>Book a room in four easy steps</h2>

          <div className="stepGrid">
            {[
              ["01", "Search", "Find rooms by name, capacity, or amenities."],
              ["02", "Choose", "Select a date and hourly time slot."],
              ["03", "Confirm", "View total cost before final booking."],
              ["04", "Study", "Track everything from your dashboard."],
            ].map(([num, title, text]) => (
              <div className="stepCard" key={num}>
                <b>{num}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
<style>{`
  .home-page {
    overflow: hidden;
    background:
      radial-gradient(circle at top left, rgba(20, 184, 166, 0.2), transparent 35%),
      linear-gradient(180deg, #f8fafc 0%, #edfafa 48%, #ffffff 100%);
  }

  .hero {
    position: relative;
    min-height: auto;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    align-items: center;
    gap: 55px;
    padding: 75px 8%;
  }

  .shape {
    position: absolute;
    border-radius: 999px;
    filter: blur(4px);
    opacity: 0.6;
    animation: floatShape 6s ease-in-out infinite;
  }

  .shape-one {
    width: 120px;
    height: 120px;
    top: 90px;
    left: 35px;
    background: rgba(20, 184, 166, 0.18);
  }

  .shape-two {
    width: 85px;
    height: 85px;
    right: 42%;
    bottom: 80px;
    background: rgba(15, 118, 110, 0.16);
    animation-delay: 1.2s;
  }

  .heroText {
    position: relative;
    z-index: 2;
    animation: slideUp 0.7s ease both;
  }

  .eyebrow,
  .tag {
    display: inline-block;
    margin-bottom: 16px;
    padding: 9px 15px;
    border-radius: 999px;
    background: #ecfeff;
    color: #0f766e;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1 {
    max-width: 760px;
    margin: 0;
    color: #0f172a;
    font-size: clamp(40px, 5.4vw, 68px);
    line-height: 1.04;
    letter-spacing: -0.045em;
  }

  .heroText > p {
    max-width: 650px;
    margin: 22px 0 0;
    color: #64748b;
    font-size: 18px;
    line-height: 1.75;
  }

  .heroActions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 30px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    border-radius: 999px;
    padding: 0 26px;
    font-weight: 900;
    text-decoration: none;
    transition: 0.28s ease;
  }

  .primaryBtn {
    color: white;
    background: linear-gradient(135deg, #0f766e, #14b8a6);
    box-shadow: 0 16px 38px rgba(20, 184, 166, 0.28);
  }

 .secondaryBtn {
  color: #0f766e !important;
  background: #ffffff;
  border: 1px solid #99f6e4;
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
}


  .btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 22px 46px rgba(20, 184, 166, 0.36);
  }

  .heroStats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    max-width: 650px;
    margin-top: 34px;
  }

  .heroStats div {
    padding: 18px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(15, 23, 42, 0.06);
    box-shadow: 0 16px 38px rgba(15, 23, 42, 0.08);
    transition: 0.25s ease;
  }

  .heroStats div:hover {
    transform: translateY(-6px);
  }

  .heroStats b {
    display: block;
    margin-bottom: 5px;
    color: #0f172a;
    font-size: 26px;
  }

  .heroStats span {
    color: #64748b;
    font-size: 14px;
    font-weight: 700;
  }

  .heroVisual {
    position: relative;
    z-index: 2;
    animation: slideUp 0.9s ease both;
  }

  .imageGlow {
    position: absolute;
    inset: 28px;
    border-radius: 38px;
    background: rgba(20, 184, 166, 0.22);
    filter: blur(30px);
  }

  .heroVisual img {
    position: relative;
    width: 100%;
    height: 460px;
    object-fit: cover;
    object-position: center;
    border-radius: 34px;
    box-shadow: 0 24px 65px rgba(15, 23, 42, 0.2);
    transition: 0.45s ease;
  }

  .heroVisual:hover img {
    transform: scale(1.02);
  }

  .floatingCard {
    position: absolute;
    display: grid;
    gap: 6px;
    padding: 16px 18px;
    border-radius: 20px;
    color: white;
    background: rgba(15, 23, 42, 0.72);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);
  }

  .floatingCard b {
    font-size: 17px;
  }

  .floatingCard span {
    color: rgba(255, 255, 255, 0.78);
    font-size: 13px;
  }

  .cardOne {
    left: -18px;
    bottom: 38px;
    animation: floatCard 3s ease-in-out infinite;
  }

  .cardTwo {
    right: -12px;
    top: 52px;
    animation: floatCard 3.4s ease-in-out infinite;
    animation-delay: 0.4s;
  }

  .section {
    max-width: 1180px;
    margin: 0 auto;
    padding: 70px 20px;
  }

  .sectionHead {
    text-align: center;
  }

  .sectionHead h2,
  .featureText h2,
  .steps h2 {
    margin: 0;
    color: #0f172a;
    font-size: clamp(32px, 4vw, 50px);
    line-height: 1.08;
    letter-spacing: -0.035em;
  }

  .sectionHead > p {
    max-width: 650px;
    margin: 16px auto 36px;
    color: #64748b;
    font-size: 17px;
    line-height: 1.7;
  }

  .grid,
  .skeletonGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
  }

  .animatedGrid {
    animation: slideUp 0.7s ease both;
  }

  .animatedGrid > * {
    transition: 0.3s ease;
  }

  .animatedGrid > *:hover {
    transform: translateY(-8px);
  }

  .skeletonGrid div {
    height: 340px;
    border-radius: 28px;
    background: linear-gradient(90deg, #e2e8f0, #f8fafc, #e2e8f0);
    background-size: 200% 100%;
    animation: shimmer 1.2s infinite linear;
  }

  .emptyHome {
    max-width: 620px;
    margin: 0 auto;
    padding: 50px 25px;
    border-radius: 28px;
    background: white;
    box-shadow: 0 22px 55px rgba(15, 23, 42, 0.08);
  }

  .emptyHome h3 {
    margin: 0 0 8px;
    color: #0f172a;
    font-size: 28px;
  }

  .emptyHome p {
    color: #64748b;
  }

  .featurePanel {
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    gap: 45px;
    align-items: center;
  }

  .featureText {
    padding: 46px;
    border-radius: 34px;
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(15, 23, 42, 0.06);
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.08);
  }

  .featureText > p {
    color: #64748b;
    font-size: 17px;
    line-height: 1.75;
  }

  .featureList {
    display: grid;
    gap: 14px;
    margin-top: 26px;
  }

  .featureList div {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 16px;
    border-radius: 20px;
    background: #ecfeff;
    color: #0f766e;
    font-weight: 800;
    transition: 0.25s ease;
  }

  .featureList div:hover {
    transform: translateX(8px);
    background: #ccfbf1;
  }

  .featureList b {
    display: grid;
    place-items: center;
    min-width: 38px;
    height: 38px;
    border-radius: 50%;
    color: white;
    background: #0f766e;
  }

  .featureImage {
    position: relative;
  }

  .featureImage img {
    width: 100%;
    height: 420px;
    object-fit: cover;
    object-position: center;
    border-radius: 34px;
    box-shadow: 0 24px 65px rgba(15, 23, 42, 0.16);
    transition: 0.35s ease;
  }

  .featureImage:hover img {
    transform: scale(1.02);
  }

  .miniCard {
    position: absolute;
    left: 24px;
    bottom: 24px;
    display: grid;
    gap: 5px;
    padding: 16px 18px;
    border-radius: 20px;
    color: white;
    background: rgba(15, 23, 42, 0.76);
    backdrop-filter: blur(16px);
    animation: floatCard 3s ease-in-out infinite;
  }

  .steps {
    text-align: center;
  }

  .stepGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 22px;
    margin-top: 36px;
  }

  .stepCard {
    position: relative;
    overflow: hidden;
    padding: 32px 22px;
    border-radius: 28px;
    background: white;
    box-shadow: 0 22px 58px rgba(15, 23, 42, 0.08);
    transition: 0.3s ease;
  }

  .stepCard::before {
    content: "";
    position: absolute;
    inset: auto -30px -70px auto;
    width: 135px;
    height: 135px;
    border-radius: 50%;
    background: rgba(20, 184, 166, 0.12);
    transition: 0.3s ease;
  }

  .stepCard:hover {
    transform: translateY(-10px);
    box-shadow: 0 32px 80px rgba(15, 23, 42, 0.15);
  }

  .stepCard:hover::before {
    transform: scale(1.6);
  }

  .stepCard b {
    position: relative;
    display: inline-grid;
    place-items: center;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    color: white;
    background: linear-gradient(135deg, #0f766e, #14b8a6);
    font-size: 18px;
  }

  .stepCard h3 {
    position: relative;
    margin: 18px 0 8px;
    color: #0f172a;
    font-size: 23px;
  }

  .stepCard p {
    position: relative;
    margin: 0;
    color: #64748b;
    line-height: 1.65;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(28px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes floatCard {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-12px);
    }
  }

  @keyframes floatShape {
    0%,
    100% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(18px, -20px);
    }
  }

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }

    to {
      background-position: -200% 0;
    }
  }

  @media (max-width: 1050px) {
    .hero,
    .featurePanel {
      grid-template-columns: 1fr;
    }

    .hero {
      padding: 60px 5%;
    }

    .heroVisual img {
      height: 380px;
    }

    .featureImage img {
      height: 340px;
    }

    .stepGrid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 760px) {
    .hero {
      padding: 45px 5%;
    }

    .hero h1 {
      font-size: 40px;
    }

    .heroStats,
    .grid,
    .skeletonGrid,
    .stepGrid {
      grid-template-columns: 1fr;
    }

    .heroVisual img,
    .featureImage img {
      height: 260px;
      border-radius: 24px;
    }

    .cardOne {
      left: 14px;
      bottom: 14px;
    }

    .cardTwo {
      right: 14px;
      top: 14px;
    }

    .floatingCard {
      padding: 13px 15px;
    }

    .featureText {
      padding: 28px 20px;
    }

    .section {
      padding: 55px 20px;
    }
  }
`}</style>
    </>
  );
}