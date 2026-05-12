

/*import { useEffect, useState } from "react";

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
              
              {/* ✅ FIXED IMAGE /}
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

export default Watchlist;*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const token = localStorage.getItem("token");
  const darkMode = localStorage.getItem("theme") !== "light";

  const navigate = useNavigate();

  // ❤️ LOAD WATCHLIST
  const loadWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ SAFE ARRAY
      setWatchlist(Array.isArray(data) ? data : []);

      console.log("WATCHLIST PAGE:", data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <div
      className={`min-h-screen p-6 transition duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* 🧭 NAVBAR */}
      <Navbar />

      {/* PAGE TITLE */}
      <div className="pt-24">

        <h1 className="text-4xl font-bold mb-8">
          ❤️ My Watchlist
        </h1>

        {/* EMPTY */}
        {watchlist.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No movies saved 🍿
          </p>
        ) : (

          /* MOVIES GRID */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

            {watchlist.map((movie) => (

              <div
                key={movie.movieId}
                onClick={() => navigate(`/movie/${movie.movieId}`)}
                className={`rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >

                {/* 🎬 POSTER */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                  className="w-full h-[250px] object-cover"
                />

                {/* 🎬 INFO */}
                <div className="p-3">

                  <p className="font-semibold text-sm line-clamp-2">
                    {movie.title}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://www.themoviedb.org/movie/${movie.movieId}`,
                        "_blank"
                      );
                    }}
                    className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs transition"
                  >
                    View Details
                  </button>

                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
