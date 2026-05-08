import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import watchlistRoutes from "./routes/watchlist.js";

dotenv.config();

const app = express();

// ✅ FINAL CORS FIX (auto allow all ports)
app.use(
  cors({
    origin: true, // 🔥 important (5173, 5174, 5175, 5176 sab chalega)
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

// 🔥 routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);

// ✅ health check
app.get("/", (req, res) => {
  res.send("Backend chal raha hai 🚀");
});

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found ❌" });
});

// 🔥 server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});