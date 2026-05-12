/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";
import Navbar from "../components/Navbar";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function Home() {
  const [movies, setMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🎬 Load Movies
  const loadMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Movies error:", err);
    }
  };

  // 📥 Load Watchlist
  const loadWatchlist = async () => {
    try {
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ safe array fix
      const safeData = Array.isArray(data) ? data : [];
      setWatchlist(safeData);

      console.log("WATCHLIST:", safeData);
    } catch (err) {
      console.error("Watchlist error:", err);
    }
  };

  useEffect(() => {
    loadMovies();
    loadWatchlist();
  }, []);

  // 🔍 Search
  const searchMovies = async (query) => {
    try {
      if (!query) return loadMovies();

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ▶ Play Trailer
  const playTrailer = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();

      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) setVideoKey(trailer.key);
    } catch (err) {
      console.error("Trailer error:", err);
    }
  };

  // ❤️ Toggle Watchlist (FINAL FIX)
  const toggleWatchlist = async (movie) => {
    try {
      if (!token) {
        alert("Login required!");
        return;
      }

      console.log("CLICKED:", movie.id);

      const exists = watchlist.some((m) => m.movieId === movie.id);

      let res;

      if (exists) {
        // ❌ REMOVE
        res = await fetch(
          `http://localhost:5000/api/watchlist/${movie.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // ➕ ADD
        res = await fetch("http://localhost:5000/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: movie.id,
            title: movie.title,
            poster: movie.poster_path,
          }),
        });
      }

      const data = await res.json();
      console.log("API RESPONSE:", data);

      // 🔄 refresh list
      await loadWatchlist();

    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen"> 

      <Navbar onSearch={searchMovies} />

      <HeroBanner
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      {/* 🎬 Movies /}
      <div className="p-6">
        <h1 className="text-3xl mb-6">🎬 Movies</h1>

        <div className="flex gap-4 overflow-x-auto">
          {movies.map((movie) =>
            movie.poster_path ? (
              <div
                key={movie.id}
                className="relative group w-[150px] cursor-pointer flex-shrink-0"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="rounded group-hover:scale-110 transition"
                />

                {/* Hover /}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-center p-2 transition rounded">

                  <p className="text-sm">{movie.title}</p>

                  <p className="text-yellow-400 text-xs mb-2">
                    ⭐ {movie.vote_average}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrailer(movie);
                      }}
                      className="bg-white text-black px-2 py-1 rounded text-xs"
                    >
                      ▶ Play
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(movie);
                      }}
                      className={`px-2 py-1 rounded text-xs ${
                        watchlist.some((m) => m.movieId === movie.id)
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {watchlist.some((m) => m.movieId === movie.id)
                        ? "✔"
                        : "❤️"}
                    </button>
                  </div>

                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* 🎬 Rows /}
      <Row
        title="⭐ Top Rated"
        fetchUrl="https://api.themoviedb.org/3/movie/top_rated?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="🎬 Upcoming"
        fetchUrl="https://api.themoviedb.org/3/movie/upcoming?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="🎭 Popular"
        fetchUrl="https://api.themoviedb.org/3/movie/popular?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      <Modal videoKey={videoKey} onClose={() => setVideoKey(null)} />
    </div>
  );
}

export default Home;*/


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import HeroBanner from "../components/HeroBanner";
import Row from "../components/Row";
import Navbar from "../components/Navbar";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function Home() {
  const [movies, setMovies] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🌗 THEME
  const darkMode = localStorage.getItem("theme") !== "light";

  // 🎬 LOAD MOVIES
  const loadMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );

      const data = await res.json();

      setMovies(data.results || []);

    } catch (err) {
      console.error("Movies error:", err);
    }
  };

  // ❤️ LOAD WATCHLIST
  const loadWatchlist = async () => {
    try {
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      setWatchlist(safeData);

      console.log("WATCHLIST:", safeData);

    } catch (err) {
      console.error("Watchlist error:", err);
    }
  };

  useEffect(() => {
    loadMovies();
    loadWatchlist();
  }, []);

  // 🔍 SEARCH
  const searchMovies = async (query) => {
    try {
      if (!query) {
        return loadMovies();
      }

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      const data = await res.json();

      setMovies(data.results || []);

    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ▶ PLAY TRAILER
  const playTrailer = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
      );

      const data = await res.json();

      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setVideoKey(trailer.key);
      }

    } catch (err) {
      console.error("Trailer error:", err);
    }
  };

  // ❤️ WATCHLIST TOGGLE
  const toggleWatchlist = async (movie) => {
    try {
      if (!token) {
        alert("Login required!");
        return;
      }

      console.log("CLICKED:", movie.id);

      const exists = watchlist.some(
        (m) => String(m.movieId) === String(movie.id)
      );

      let res;

      // ❌ REMOVE
      if (exists) {
        res = await fetch(
          `http://localhost:5000/api/watchlist/${movie.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // ➕ ADD
      else {
        res = await fetch("http://localhost:5000/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: movie.id,
            title: movie.title,
            poster: movie.poster_path,
          }),
        });
      }

      const data = await res.json();

      console.log("API RESPONSE:", data);

      // 🔄 REFRESH
      await loadWatchlist();

    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  return (
    <div
      className={`min-h-screen transition duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* 🧭 NAVBAR */}
      <Navbar onSearch={searchMovies} />

      {/* 🎬 HERO */}
      <HeroBanner
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      {/* 🎬 TRENDING MOVIES */}
      <div className="p-6">

        <div className="flex items-center justify-between mb-6">

          <h1 className="text-3xl font-bold">
            🎬 Trending Movies
          </h1>

          <p className="text-gray-400 text-sm">
            {movies.length} movies found
          </p>

        </div>

        <div className="flex gap-5 overflow-x-auto pb-4">

          {movies.map((movie) =>
            movie.poster_path ? (

              <div
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className={`relative group w-[170px] cursor-pointer flex-shrink-0 rounded-xl overflow-hidden shadow-lg transition duration-300 hover:scale-105 ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >

                {/* 🎬 POSTER */}
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  className="w-full h-[255px] object-cover"
                />

                {/* 🔥 HOVER */}
                <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-3">

                  <h2 className="text-sm font-semibold mb-2">
                    {movie.title}
                  </h2>

                  <p className="text-yellow-400 text-xs mb-4">
                    ⭐ {movie.vote_average}
                  </p>

                  <div className="flex gap-2">

                    {/* ▶ PLAY */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrailer(movie);
                      }}
                      className="bg-white text-black px-3 py-1 rounded text-xs hover:scale-105 transition"
                    >
                      ▶ Play
                    </button>

                    {/* ❤️ SAVE */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(movie);
                      }}
                      className={`px-3 py-1 rounded text-xs transition ${
                        watchlist.some(
                          (m) =>
                            String(m.movieId) === String(movie.id)
                        )
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {watchlist.some(
                        (m) =>
                          String(m.movieId) === String(movie.id)
                      )
                        ? "✔"
                        : "❤️"}
                    </button>

                  </div>
                </div>
              </div>

            ) : null
          )}
        </div>
      </div>

      {/* ⭐ ROWS */}
      <Row
        title="⭐ Top Rated"
        fetchUrl="https://api.themoviedb.org/3/movie/top_rated?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="🎬 Upcoming"
        fetchUrl="https://api.themoviedb.org/3/movie/upcoming?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      <Row
        title="🎭 Popular"
        fetchUrl="https://api.themoviedb.org/3/movie/popular?api_key="
        onPlay={playTrailer}
        onSave={toggleWatchlist}
        watchlist={watchlist}
      />

      {/* ▶ TRAILER MODAL */}
      <Modal
        videoKey={videoKey}
        onClose={() => setVideoKey(null)}
      />
    </div>
  );
}

export default Home;






