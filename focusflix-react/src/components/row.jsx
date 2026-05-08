import { useEffect, useState } from "react";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function Row({ title, fetchUrl, onPlay, onSave, watchlist }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(fetchUrl + API_KEY);
      const data = await res.json();
      setMovies(data.results || []);
    }

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4 px-6">{title}</h2>

      <div className="flex gap-4 overflow-x-auto px-6">
        {movies.map((movie) => {
          // ✅ FIX HERE
          const saved = watchlist?.some(
            (m) => String(m.movieId) === String(movie.id)
          );

          return (
            movie.poster_path && (
              <div
                key={movie.id}
                className="relative group w-[150px] cursor-pointer flex-shrink-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="rounded transition duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-center p-2 rounded">

                  <h3 className="text-sm mb-1">{movie.title}</h3>

                  <p className="text-yellow-400 text-xs mb-2">
                    ⭐ {movie.vote_average}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onPlay(movie)}
                      className="bg-white text-black px-2 py-1 rounded text-xs"
                    >
                      ▶ Play
                    </button>

                    <button
                      onClick={() => onSave(movie)}
                      className={`px-2 py-1 rounded text-xs ${
                        saved ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {saved ? "❤️" : "🤍"}
                    </button>
                  </div>

                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default Row;