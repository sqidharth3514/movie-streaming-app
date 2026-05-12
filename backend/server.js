import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import watchlistRoutes from "./routes/watchlist.js";

// 🔥 NEW
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// ✅ FINAL CORS FIX
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// 🔥 MongoDB connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");

  } catch (err) {

    console.error("DB Connection Failed ❌", err.message);

    process.exit(1);
  }
};

connectDB();

// 🔥 ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/watchlist", watchlistRoutes);

// 🔥 NEW USER ROUTES
app.use("/api/user", userRoutes);

// ✅ health check
app.get("/", (req, res) => {
  res.send("Backend chal raha hai 🚀");
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found ❌",
  });
});

// 🔥 server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});