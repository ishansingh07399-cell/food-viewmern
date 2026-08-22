# ⚙️ FoodView — Backend-Driven Media-Rich Food Discovery Platform (MERN)

A production-grade, full-stack **Food Reel Discovery Web Application** built with Node.js, Express.js, MongoDB, and React. Inspired by the 3.5-hour backend deep-dive by **Sheryians Coding School**, **FoodView** powers a short-video reel discovery feed for food lovers while offering restaurants a robust partner platform to showcase dishes.

---

## 🎯 Backend Focus & System Architecture

This repository highlights a **modular, scalable Node.js/Express backend architecture** designed for handling dual-role authentication, multipart media stream buffers, and MongoDB data modeling.

```text
               +-------------------------------------------------+
               |                Client (React/Axios)             |
               +-----------------------+-------------------------+
                                       |
                     HTTP + Credentials (JWT Cookie)
                                       v
               +-------------------------------------------------+
               |              Express.js App Router              |
               +-----------+-------------------------+-----------+
                           |                         |
              +------------v------------+   +--------v----------------+
              | User Auth Middleware    |   | Food Partner Auth       |
              | (JWT Verify + DB Check) |   | (JWT Verify + DB Check) |
              +------------+------------+   +--------+----------------+
                           |                         |
               +-----------v-------------------------v-----------+
               |               Controller Layer                  |
               | (authController, foodController, partnerCtrl)  |
               +-----------+-------------------------+-----------+
                           |                         |
       +-------------------v---+                 +---v-------------------+
       | Mongoose Models       |                 | Storage Service       |
       | (User, Food, Partner, |                 | (ImageKit / Memory    |
       |  Likes, Save)         |                 |  Buffer Uploads)      |
       +-----------------------+                 +-----------------------+
```

---

## ⚙️ Core Backend Architecture & Features

### 1. 🛡️ Dual-Role Authentication & Authorization Engine
- **Role Isolation:** Separate database Schemas and HTTP handlers for **Normal Users** and **Food Partners** (Restaurants).
- **Stateless JWT with HTTP-Only Cookies:** Secure token generation upon login/registration. Tokens are signed via `jsonwebtoken` and delivered in secure cookies to mitigate XSS attacks.
- **Bcrypt Password Hashing:** Salted password hashing (10 rounds) before persisting credentials to MongoDB.
- **Custom Auth Middlewares:**
  - `authUserMiddleware`: Validates user tokens and attaches `req.user`.
  - `authFoodPartnerMiddleware`: Validates partner tokens and attaches `req.foodPartner`.

### 2. 🎬 Multipart Media Uploads & Buffer Processing
- **Multer Middleware:** Configured with `multer.memoryStorage()` to intercept incoming multipart `video` streams in memory without writing temporary files to disk.
- **Cloud Storage Integration:** Decoupled `storageService` utilizing UUID filename generation and streaming binary buffers directly to Cloud Storage (ImageKit/S3).

### 3. 🗄️ Relational Mongoose Schemas & Data Modeling
- **`user.model.js`**: `fullname`, `email` (unique index), `password`.
- **`foodpartner.model.js`**: `name`, `contactName`, `phone`, `address`, `email` (unique index), `password`.
- **`food.model.js`**: Stores `name`, `description`, `video` (Cloud URL), `foodPartner` (ObjectId ref to `foodpartner`), `likeCount`, and `saveCount`.
- **`likes.model.js`**: Intermediary relation model linking `user` ObjectId and `food` ObjectId with composite tracking.
- **`save.model.js`**: Intermediary relation model for bookmarking feeds, populated dynamically via Mongoose `.populate("food")`.

### 4. ⚡ Like & Save Atomic Increments
- Custom atomic database update queries (`$inc: { likeCount: 1 }` and `$inc: { likeCount: -1 }`) ensuring zero race conditions when thousands of users interact with video reels simultaneously.

---

## 📁 Repository Structure

```text
zomatomern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.js            # User & Partner Registration/Login/Logout handlers
│   │   │   ├── food.js            # Video creation, Feed retrieval, Like/Save toggles
│   │   │   └── food-partner.js    # Food Partner profile handlers
│   │   ├── db/
│   │   │   └── db.js              # Mongoose MongoDB connection initializer
│   │   ├── middlewares/
│   │   │   └── auth.js            # JWT Validation & Auth Guards (User vs Partner)
│   │   ├── models/
│   │   │   ├── user.js            # User Schema
│   │   │   ├── foodpartner.js     # Food Partner Schema
│   │   │   ├── food.js            # Food Reel Schema
│   │   │   ├── likes.js           # Like Intermediary Schema
│   │   │   └── save.js            # Save/Bookmark Intermediary Schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth routes (/api/auth)
│   │   │   ├── food.js            # Food & Interaction routes (/api/food)
│   │   │   └── food-partner.js    # Food Partner profile routes (/api/food-partner)
│   │   └── services/
│   │       └── storage.service.js # Cloud Media Upload Service
│   ├── .env                       # Environment Configurations (JWT Secret, Mongo URI)
│   ├── app.js                     # Express App, CORS & Cookie Parser Configuration
│   ├── seed.js                    # Automated Database Seeding Script
│   └── server.js                  # HTTP Server Startup
│
└── frontend/                      # Mobile-First Glassmorphic React Client
```

---

## 🔌 Detailed API Specification

### Auth APIs (`/api/auth`)
- `POST /api/auth/user/register` — Registers a normal user (`fullname`, `email`, `password`).
- `POST /api/auth/user/login` — Authenticates user, sets HTTP-only `token` cookie.
- `GET /api/auth/user/logout` — Clears authentication cookie.
- `POST /api/auth/food-partner/register` — Registers food partner (`name`, `contactName`, `phone`, `address`, `email`, `password`).
- `POST /api/auth/food-partner/login` — Authenticates partner, sets HTTP-only `token` cookie.
- `GET /api/auth/food-partner/logout` — Clears partner authentication cookie.

### Food & Media APIs (`/api/food`)
- `GET /api/food` — Returns array of food reels `{ message, foodItems: [...] }`. *(User Protected)*
- `POST /api/food` — Accepts multipart form data (`name`, `description`, `video` file). Uploads buffer to storage & creates document. *(Partner Protected)*
- `POST /api/food/:id/like` — Toggles like state and atomically updates `likeCount`. *(User Protected)*
- `POST /api/food/:id/save` — Toggles bookmark state and atomically updates `saveCount`. *(User Protected)*
- `GET /api/food/saved` — Returns array of food items saved by the logged-in user using `.populate()`. *(User Protected)*

### Partner Profile APIs (`/api/food-partner`)
- `GET /api/food-partner/profile` — Fetches food partner profile minus password. *(Partner Protected)*

---

## 🚀 Local Setup & Seeding

### 1. Environment Setup
Inside `backend/.env`:
```env
JWT_SECRET=your_jwt_secret_key_here
MONGODB_URI=mongodb://localhost:27017/food-view
```

### 2. Seed Database
Run the seed script to automatically create a sample Food Partner and insert 5 high-quality food reels:
```bash
cd backend
node seed.js
```

### 3. Run Backend Server
```bash
npx nodemon server.js
```

### 4. Run Frontend Client
```bash
cd ../frontend
npm run dev
```

---

## 📚 Learning Credits

Concept & Core Backend Foundation inspired by the 3.5-hour Full-Stack lecture by **Sheryians Coding School**. Extended with custom data modeling, likes/saves controllers, mobile-first responsive feed UI, and database seeding.

---

## 📝 License

Distributed under the MIT License.
