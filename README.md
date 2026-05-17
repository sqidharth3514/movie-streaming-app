

# 🎬 FocusFlix

<div align="center">



# 🍿 FocusFlix — Full Stack MERN Movie Streaming Platform

A modern Netflix-inspired movie streaming web application built using the MERN Stack with authentication, watchlist system, responsive UI, movie recommendations, trailer playback, dark mode, profile management, and TMDB API integration.



---

# 📌 Table of Contents

- About Project
- Features
- Screenshots
- Tech Stack
- Folder Structure
- Installation
- Environment Variables
- API Documentation
- Authentication Flow
- Frontend Features
- Backend Features
- Database Schema
- Responsive Design
- Challenges Faced
- Learnings
- Future Improvements
- Deployment
- Credits

---

# 🚀 About The Project

FocusFlix is a full stack MERN movie streaming platform inspired by Netflix and modern OTT applications.

This project was created to practice and improve full stack development skills using modern technologies such as:

- React
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- REST APIs

The application allows users to:

- create accounts
- login securely
- browse trending movies
- search movies
- watch trailers
- save movies to watchlist
- manage profile
- upload avatars
- explore recommendations


The project uses the TMDB API to fetch real movie data.

---

# 🎯 Main Objectives

The primary goals of this project were:

- Learn MERN stack architecture
- Understand frontend-backend integration
- Build secure authentication system
- Practice API integration
- Improve responsive UI design
- Learn MongoDB database operations
- Create modern OTT style UI
- Understand JWT based authorization

---

# ✨ Features

# 🔐 Authentication System

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality
- Token Storage
- Persistent Login

---

# 🎬 Movie Features

- Trending Movies
- Top Rated Movies
- Popular Movies
- Upcoming Movies
- Search Functionality
- Movie Details
- Ratings
- Runtime
- Genres
- Cast Members
- Recommendations

---

# ▶ Trailer System

Users can:

- watch trailers
- open YouTube trailers
- autoplay background trailers
- enjoy cinematic movie experience

---

# ❤️ Watchlist System

Users can:

- save movies
- remove movies
- view watchlist
- access watchlist from profile
- store watchlist in MongoDB

---

# 👤 Profile System

Features include:

- profile page
- user info
- avatar upload
- saved movies count
- logout button
- responsive profile cards

---

# 🌗 Dark Mode

FocusFlix supports:

- dark mode
- light mode
- theme persistence
- localStorage theme saving

---



# 🖼 Screenshots

## 🏠 Home Page

![Home](./Screenshots/home1.png)
![Home](./Screenshots/home1.png)
![Home](./Screenshots/home3.png)



---

## 🎬 Movie Detail Page

![Movie](./Screenshots/movieDetail.png)
![Movie](./Screenshots/movie-detail.png)


---

## 👤 Profile Page

![Profile](./Screenshots/profile.png)

---

# ❤️ Watchlist

![Watchlist](./Screenshots/watchlist.png)

---

# 🔐 Login Page

![Login](./Screenshots/login.png)

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- React Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

# APIs

- TMDB API

---

# 📂 Folder Structure

```bash
focusflix/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│
└── README.md 
```

---

# ⚙ Installation Guide

## 1️⃣ Clone Repository
```bash
  git clone https://github.com/sqidharth3514/movie-streaming-app.git
```
## 2️⃣ Move Into Project
```bash
   cd focusflix
```
 ## 3️⃣ Install Frontend Dependencies
```bash
   cd frontend
   npm install
```
  ## 4️⃣ Start Frontend
```bash
   npm run dev
```
  ## 5️⃣ Install Backend Dependencies
```bash
 cd backend
 npm install
```

## 6️⃣ Start Backend
```bash
 npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside backend folder.

```bash
 PORT=5000

 MONGO_URI=your_mongodb_connection

 JWT_SECRET=your_secret_key
```

---

# 🌐 API Documentation

## 🔐 Auth Routes

## Register User
```bash
 POST /api/auth/register
```
## Login user
```bash
 POST /api/auth/login
```
---


# 🔐 Authentication Flow

User Login
   ↓
JWT Token Generated
   ↓
Token Stored in localStorage
   ↓
Protected API Requests
   ↓
Backend Verifies Token
   ↓
Access Granted

---

# 🗄 Database Schema

## User Schema
```bash
{
  name: String,
  email: String,
  password: String,
  avatar: String
}
```
## Watchlist Schema
```bash
{
  userId: ObjectId,
  movieId: Number,
  title: String,
  poster: String
}
```

---

# ⚡ Performance Optimizations
- Optimized rendering
- Efficient API calls
- Reusable components
- Dynamic loading
- LocalStorage caching

---

# 😵 Challenges Faced

During development many issues were faced:

- JWT errors
- MongoDB connection issues
- CORS problems
- React routing issues
- Watchlist syncing bugs
- Responsive layout problems
- State management confusion

These problems helped improve debugging skills.


---

# 📚 Learnings

This project helped in learning:

- Full Stack MERN Development
- API Integration
- JWT Authentication
- MongoDB CRUD Operations
- React Hooks
- Tailwind CSS
- Responsive Design
- Git & GitHub

---

# 🚀 Future Improvements

Future plans include:

- AI Recommendations
- Real Video Streaming
- Subscription Plans
- Payment Gateway
- Admin Dashboard
- Cloudinary Upload
- Comments System
- Reviews
- Firebase Notifications
- Multi-language Support
- PWA Support
- OTT Animation Effects

---

# 💡 How To Contribute
- Fork Repository
- Create Branch
- Commit Changes
- Push Changes
- Create Pull Request


---


# 🧑‍💻 Author
Sidharth Dangwal

B.Tech Student & Full Stack Developer

# 🙏 Credits

Special thanks to:

- TMDB API
- React Documentation
- Tailwind CSS
- MongoDB
- Express.js
- Node.js

---


# 📜 License

This project is licensed under the MIT License.



