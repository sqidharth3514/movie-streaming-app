import Watchlist from "../models/Watchlist.js";

// ➕ Add
export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;

    const item = new Watchlist({
      userId: req.user.id,
      movieId,
      title,
      poster,
    });

    await item.save();

    res.json({ message: "Added to watchlist" });
  } catch (err) {
    res.status(500).json({ message: "Error adding" });
  }
};

// 📥 Get
export const getWatchlist = async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching" });
  }
};

// ❌ Remove
export const removeFromWatchlist = async (req, res) => {
  try {
    await Watchlist.findOneAndDelete({
      userId: req.user.id,
      movieId: req.params.id,
    });

    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: "Error removing" });
  }
};