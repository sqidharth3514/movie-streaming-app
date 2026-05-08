/*import { useEffect, useState } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  // Remove movie
  const removeMovie = (id) => {
    const updated = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl mb-6">❤️ My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies saved</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {watchlist.map(movie => (
            movie.poster_path && (
              <div key={movie.id} className="relative group">
                
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="rounded-lg"
                />

                {/* Hover Overlay /}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition">
                  
                  <h3 className="text-sm mb-2 text-center px-2">
                    {movie.title}
                  </h3>

                  <button
                    onClick={() => removeMovie(movie.id)}
                    className="bg-red-600 px-3 py-1 text-sm rounded"
                  >
                    Remove ❌
                  </button>

                </div>

              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;*/

import { useEffect, useState } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");

  const loadWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ IMPORTANT
      setWatchlist(Array.isArray(data) ? data : []);

      console.log("WATCHLIST PAGE:", data); // debug
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl mb-6">❤️ My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-400">No movies saved</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {watchlist.map((movie) => (
            <div key={movie.movieId} className="w-[150px]">
              
              {/* ✅ FIXED IMAGE */}
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                className="rounded"
              />

              <p className="text-sm mt-2">{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;