import express from "express";
import Watchlist from "../models/Watchlist.js";
import protect from "../middleware/auth.js"; // 👈 default import

const router = express.Router();


// ➕ ADD movie
router.post("/", protect, async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;

    const exists = await Watchlist.findOne({
      userId: req.user.id, // ✅ FIX
      movieId,
    });

    if (exists) {
      return res.json({ message: "Already added" });
    }

    const item = await Watchlist.create({
      userId: req.user.id, // ✅ FIX
      movieId,
      title,
      poster,
    });

    res.json(item);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 📥 GET all
router.get("/", protect, async (req, res) => {
  try {
    const items = await Watchlist.find({
      userId: req.user.id, // ✅ FIX
    });

    res.json(items);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ❌ REMOVE
router.delete("/:id", protect, async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({
      userId: req.user.id, // ✅ FIX
      movieId: req.params.id,
    });

    res.json({ message: "Removed" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;