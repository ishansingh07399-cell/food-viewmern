# 🍔 FoodView — Short Video Food Discovery Platform (MERN)

A full-stack media-rich **Food Reel Discovery Web Application** built with the MERN stack (MongoDB, Express, React, Node.js). **FoodView** combines the vertical short-video reel experience of Instagram Shorts / TikTok with food delivery and restaurant discovery like Zomato.

---

## ✨ Features

- 📱 **Vertical Video Reel Feed:** Smooth 9:16 vertical snap-scrolling with automatic video play/pause using `IntersectionObserver`.
- 🔐 **Dual Role Authentication:** Separate, secure auth systems for **Users** (food lovers) and **Food Partners** (restaurant owners) backed by HTTP-Only JWT cookies.
- 🎬 **Multipart Video Uploads:** Restaurants can upload dish promotional reels along with names and descriptions.
- ❤️ **Interactive Engagement:** Real-time **Like** counter and **Bookmark/Save** system to store favorite food reels in a personal saved feed.
- 🎨 **Ultra-Premium Glassmorphism UI:** Centered mobile app viewport frame on desktop screens, smooth animations, glowing status indicators, and clean typography.
- ⚡ **Database Seeding Script:** Built-in `seed.js` script to instantly populate sample food partners and video reels into MongoDB.

---

## 🛠️ Tech Stack

### **Frontend**
- **Library/Framework:** React.js, Vite
- **Routing:** React Router v6
- **HTTP Client:** Axios (with cookie credentials)
- **Styling:** Custom Vanilla CSS (Design Tokens, Glassmorphism, Mobile-First Layouts)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT (JSON Web Tokens), `cookie-parser`, `bcryptjs`
- **File Handling:** Multer (Memory Storage)

---

## 📁 Project Structure

```text
zomatomern/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Auth, Food, and FoodPartner logic
│   │   ├── db/               # Database connection setup
│   │   ├── middlewares/      # User & FoodPartner auth middlewares
│   │   ├── models/           # Mongoose Schemas (User, Food, FoodPartner, Like, Save)
│   │   ├── routes/           # Express API Router definitions
│   │   └── services/         # Storage service integrations
│   ├── .env                  # Environment variables (JWT secret, Mongo URI)
│   ├── app.js                # Express app setup & CORS configuration
│   ├── seed.js               # Database seeding script
│   └── server.js             # Server startup entrypoint
│
└── frontend/
    ├── public/
    │   └── videos/           # Static sample video reels
    ├── src/
    │   ├── components/       # BottomNav navigation bar & UI components
    │   ├── pages/            # Auth, Home, CreateFood, Profile, Saved pages
    │   ├── routes/           # AppRoutes configuration
    │   ├── styles/           # CSS design systems (home, auth, theme, bottom-nav)
    │   └── App.jsx           # Main React component
    └── vite.config.js        # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your system:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally at `mongodb://localhost:27017` or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/ishansingh07399-cell/food-viewmern.git
cd food-viewmern
```

### 2. Setup & Run Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:
```env
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=mongodb://localhost:27017/food-view
```

Seed initial sample food reels into MongoDB:
```bash
node seed.js
```

Start the backend server:
```bash
npx nodemon server.js
```
The backend server will run at `http://localhost:3000`.

### 3. Setup & Run Frontend

Open a new terminal tab:
```bash
cd frontend
npm install
npm run dev
```
The frontend dev server will run at `http://localhost:5173`.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/user/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/user/login` | User login | ❌ No |
| `POST` | `/api/auth/food-partner/register` | Register food partner | ❌ No |
| `POST` | `/api/auth/food-partner/login` | Food partner login | ❌ No |
| `GET` | `/api/food` | Fetch all food video reels | 🔒 User Auth |
| `POST` | `/api/food` | Upload a new food reel | 🔒 FoodPartner Auth |
| `POST` | `/api/food/:id/like` | Toggle like on a reel | 🔒 User Auth |
| `POST` | `/api/food/:id/save` | Toggle bookmark on a reel | 🔒 User Auth |
| `GET` | `/api/food/saved` | Fetch user's saved reels | 🔒 User Auth |
| `GET` | `/api/food-partner/profile` | Fetch food partner profile | 🔒 FoodPartner Auth |

---

## 🤝 Acknowledgements

Inspired by the MERN Stack tutorial by **Sheryians Coding School**.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
