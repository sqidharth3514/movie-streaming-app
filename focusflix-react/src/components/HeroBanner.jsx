import { useEffect, useState } from "react";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function HeroBanner({ onPlay, onSave, watchlist }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await res.json();

        if (!data.results || data.results.length === 0) return;

        const random =
          data.results[Math.floor(Math.random() * data.results.length)];

        setMovie(random);
      } catch (err) {
        console.error("Hero error:", err);
      }
    }

    fetchData();
  }, []);

  if (!movie) return null;

  const isSaved = watchlist?.some((m) => m.id === movie.id);

  return (
    <div
      className="h-[80vh] flex items-end p-10 bg-cover bg-center"
      style={{
        backgroundImage: `
        linear-gradient(to top, black, transparent),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
      `,
      }}
    >
      <div className="max-w-xl">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

        <p className="text-gray-300 mb-4">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => onPlay(movie)}
            className="bg-white text-black px-6 py-2 rounded"
          >
            ▶ Play
          </button>

          <button
            onClick={() => onSave(movie)}
            className="bg-gray-700 px-6 py-2 rounded"
          >
            {isSaved ? "❤️ Saved" : "🤍 My List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
