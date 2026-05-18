# StudyNook – Library Study Room Booking

Live Site URL: add your deployed Vercel URL here

## Features
- Browse, search, filter, and book library study rooms.
- Secure login/register system with JWT HTTP-only cookie support from backend.
- Latest 6 rooms shown dynamically on the homepage using database sorting and limiting.
- Room owners can add, update, and delete only their own listings.
- Booking system prevents overlapping confirmed bookings for the same room and time slot.
- My Bookings dashboard with status badges and cancellation option.
- Responsive design for mobile, tablet, and desktop.
- Toast notifications, custom 404 page, loading states, and dynamic browser titles.

## Run locally
```bash
npm install
npm run dev
```

Create `.env` from `.env.example` first.
