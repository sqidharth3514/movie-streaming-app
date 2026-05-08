/*import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: Number,
  title: String,
  poster: String,
});

export default mongoose.model("Watchlist", watchlistSchema);*/

import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: Number,
  title: String,
  poster: String,
});

export default mongoose.model("Watchlist", watchlistSchema);