# Restrip — Luxury Hotel Booking Platform

Full-stack hotel booking platform built with **ReactJS**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 📁 Project Structure

```
restrip/
├── client/          # React frontend (Create React App)
│   ├── public/
│   └── src/
│       ├── api/         # Axios-style fetch wrapper + all API calls
│       ├── components/  # Navbar, shared UI (Toast, Spinner, Tag, etc.)
│       ├── context/     # AuthContext (JWT + session restore)
│       ├── hooks/       # useFetch, useHotels, useRooms, useMyBookings
│       └── pages/       # Home, Hotels, HotelDetail, Auth, Bookings, Admin
│
└── server/          # Node.js + Express REST API
    ├── controllers/     # authController, hotelController, roomController, bookingController
    ├── middleware/      # auth.js (verifyToken, verifyAdmin, optionalAuth)
    ├── models/          # User, Hotel, Room, Booking (Mongoose schemas)
    ├── routes/          # auth, hotels, rooms, bookings
    ├── utils/           # errors.js (AppError, catchAsync), seed.js
    └── server.js        # Entry point
```

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 18+
- MongoDB running locally **or** MongoDB Atlas URI

---

### 1. Setup the Server

```bash
cd server
npm install
cp .env .env.local   # already filled with local defaults
```

Edit `server/.env` and set your `MONGO_URI`:
```
# Local MongoDB:
MONGO_URI=mongodb://127.0.0.1:27017/restrip

# OR MongoDB Atlas:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/restrip?retryWrites=true&w=majority
```

**Seed the database** (creates hotels, rooms, admin + demo user):
```bash
node utils/seed.js
```

**Start the server:**
```bash
npm run dev    # development with nodemon
# or
npm start      # production
```

Server runs at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

---

### 2. Setup the Client

```bash
cd client
npm install
```

The `client/.env` is already configured for local development:
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Start the client:**
```bash
npm start
```

App runs at: `http://localhost:3000`

---

## 🔐 Demo Credentials

| Role  | Email                | Password   |
|-------|----------------------|------------|
| Admin | admin@restrip.com    | Admin@123  |
| User  | demo@restrip.com     | Demo@1234  |

---

## 🌐 Live Production URLs

**Frontend (Vercel):** https://client-frn6kczqo-friedrick2003s-projects.vercel.app

**Backend API (Railway):** https://restrip-backend-production.up.railway.app/api

**Backend Health:** https://restrip-backend-production.up.railway.app/api/health

---

## ☁️ Deploy to Cloud (Railway + MongoDB Atlas)

### MongoDB Atlas
1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. **Database Access** → Add user → note credentials
3. **Network Access** → Add IP `0.0.0.0/0`
4. **Connect** → Drivers → copy connection string

### Deploy Server to Railway
1. Push `server/` folder to a GitHub repo
2. [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variables in Railway dashboard:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_ACCESS_SECRET=<64-byte hex — run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_REFRESH_SECRET=<another 64-byte hex>
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
CLIENT_URL=https://your-frontend.vercel.app
```

4. Railway auto-deploys. Copy your backend URL.

### Deploy Server to Render (free alternative)
1. New Web Service → connect GitHub repo
2. Build: `npm install` · Start: `node server.js`
3. Add same environment variables above

### Deploy Client to Vercel
1. Push `client/` folder to GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. Add environment variable:
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```
4. Deploy → done!

---

## 📋 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login, returns JWT |
| POST | /api/auth/refresh | Public | Refresh access token |
| POST | /api/auth/logout | Auth | Logout, clear token |
| GET | /api/auth/me | Auth | Get current user |

### Hotels
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/hotels | Public | List hotels (filters, pagination) |
| GET | /api/hotels/:id | Public | Single hotel + rooms |
| POST | /api/hotels | Admin | Create hotel |
| PUT | /api/hotels/:id | Admin | Update hotel |
| DELETE | /api/hotels/:id | Admin | Soft-delete hotel |

### Rooms
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/rooms?hotelId= | Public | Rooms for a hotel |
| GET | /api/rooms/:id | Public | Single room |
| GET | /api/rooms/:id/availability | Public | Check date availability |
| POST | /api/rooms | Admin | Create room |
| PUT | /api/rooms/:id | Admin | Update room |
| DELETE | /api/rooms/:id | Admin | Soft-delete room |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/bookings | Auth | Create booking (concurrency-safe) |
| GET | /api/bookings/my | Auth | User's own bookings |
| GET | /api/bookings/:id | Auth | Single booking |
| PATCH | /api/bookings/:id/cancel | Auth | Cancel + release dates |
| GET | /api/bookings | Admin | All bookings + revenue |

---

## 🏗️ Key Architecture Features

### Concurrency-Safe Booking
Uses MongoDB atomic `findOneAndUpdate` with `$addToSet` and `$nin` array filter. Two simultaneous requests for the same room and dates will result in exactly one success and one `409 Conflict` — no double booking possible without distributed locks.

### JWT Authentication with RBAC
- Short-lived access tokens (15 min) stored in memory
- Long-lived refresh tokens (7 days) in httpOnly cookies
- Refresh token hash stored in MongoDB — invalidated on logout
- `verifyToken` middleware on all protected routes
- `verifyAdmin` middleware gates all admin-only endpoints

### Performance
- `node-cache` caches hotel listing responses for 60 seconds
- MongoDB indexes on `city`, `cheapestPrice`, `rating`, `userId`, `bookedDates`
- Response `compression` middleware on all endpoints
- Pagination on all list endpoints

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (access + refresh tokens) |
| Security | Helmet, CORS, bcryptjs, express-rate-limit |
| Caching | node-cache (server-side) |
| Deployment | Railway / Render (backend), Vercel (frontend), MongoDB Atlas |
