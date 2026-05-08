


/*import { useEffect, useState } from "react";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function HeroBanner({ onPlay, onSave, watchlist }) {
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  // 🎬 Load random movie
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();

      const random =
        data.results[Math.floor(Math.random() * data.results.length)];

      setMovie(random);

      // 🎥 Fetch trailer
      const vidRes = await fetch(
        `https://api.themoviedb.org/3/movie/${random.id}/videos?api_key=${API_KEY}`
      );
      const vidData = await vidRes.json();

      const trailer = vidData.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) setVideoKey(trailer.key);
    }

    fetchMovie();
  }, []);

  if (!movie) return null;

  const isSaved = watchlist?.some(m => m.id === movie.id);

  return (
    <div className="relative h-[85vh] flex items-end px-10 pb-16 overflow-hidden">

      {/ 🎥 VIDEO BACKGROUND /}
      {videoKey ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full scale-150 pointer-events-none"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
          title="Trailer"
          allow="autoplay"
        ></iframe>
      ) : (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>
      )}

      {/ 🔥 Overlay (dark effect) /}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* 🎬 Content /}
      <div className="relative max-w-2xl z-10">

        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          {movie.title}
        </h1>

        <p className="text-yellow-400 mb-2">
          ⭐ {movie.vote_average}
        </p>

        <p className="text-gray-300 mb-6 line-clamp-3 text-lg">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => onPlay(movie)}
            className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-red-600 hover:text-white transition"
          >
            ▶ Play
          </button>

          <button
            onClick={() => onSave(movie)}
            className={`px-6 py-2 rounded ${
              isSaved ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            {isSaved ? "❤️ Saved" : "🤍 My List"}
          </button>
        </div>
      </div>

    </div>
  );
}

export default HeroBanner;*/
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
