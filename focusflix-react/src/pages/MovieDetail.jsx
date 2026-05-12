import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function MovieDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommended, setRecommended] = useState([]);

  // 🌗 THEME
  const darkMode = localStorage.getItem("theme") !== "light";

  useEffect(() => {
    fetchMovie();
    fetchTrailer();
    fetchCast();
    fetchRecommendations();

    // 🔝 SCROLL TOP
    window.scrollTo(0, 0);

  }, [id]);

  // 🎬 MOVIE DETAILS
  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );

      const data = await res.json();

      setMovie(data);

    } catch (err) {
      console.error(err);
    }
  };

  // ▶ TRAILER
  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );

      const data = await res.json();

      const trailer = data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setVideoKey(trailer.key);
      }

    } catch (err) {
      console.error(err);
    }
  };

  // 👥 CAST
  const fetchCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );

      const data = await res.json();

      setCast(data.cast.slice(0, 12));

    } catch (err) {
      console.error(err);
    }
  };

  // 🤖 RECOMMENDATIONS
  const fetchRecommendations = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
      );

      const data = await res.json();

      setRecommended(data.results.slice(0, 12));

    } catch (err) {
      console.error(err);
    }
  };

  // ⏳ LOADING
  if (!movie) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-3xl font-bold ${
          darkMode
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* 🧭 NAVBAR */}
      <Navbar />

      {/* 🎬 HERO */}
      <div className="relative min-h-[85vh] flex items-end overflow-hidden">

        {/* 🎥 BACKGROUND TRAILER */}
        {videoKey ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full scale-150 pointer-events-none"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&showinfo=0&modestbranding=1`}
            title="Trailer"
            allow="autoplay"
          />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          ></div>
        )}

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/75"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-10 p-8 md:p-14 items-center lg:items-end">

          {/* 🎬 POSTER */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-[280px] rounded-3xl shadow-2xl hover:scale-105 transition duration-300"
          />

          {/* 🎬 INFO */}
          <div className="max-w-4xl">

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
              {movie.title}
            </h1>

            {/* TAGLINE */}
            {movie.tagline && (
              <p className="italic text-gray-300 text-lg mb-4">
                "{movie.tagline}"
              </p>
            )}

            {/* RATING */}
            <div className="flex items-center gap-4 mb-5 flex-wrap">

              <span className="bg-yellow-500 text-black px-4 py-1 rounded-full font-bold">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              <span className="bg-red-600 px-4 py-1 rounded-full">
                ⏱ {movie.runtime} min
              </span>

              <span className="bg-gray-800 px-4 py-1 rounded-full">
                📅 {movie.release_date}
              </span>

            </div>

            {/* OVERVIEW */}
            <p className="text-gray-200 text-lg leading-8 mb-6">
              {movie.overview}
            </p>

            {/* GENRES */}
            <div className="flex gap-3 flex-wrap mb-8">

              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="bg-red-600 px-5 py-2 rounded-full text-sm font-medium"
                >
                  {g.name}
                </span>
              ))}

            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 flex-wrap">

              {/* ▶ TRAILER */}
              {videoKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${videoKey}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-red-600 hover:bg-red-700 px-7 py-3 rounded-xl transition shadow-xl font-semibold"
                >
                  ▶ Watch Trailer
                </a>
              )}

              {/* 🎬 TMDB */}
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 hover:bg-gray-700 px-7 py-3 rounded-xl transition shadow-xl font-semibold"
              >
                TMDB Page
              </a>

            </div>

          </div>
        </div>
      </div>

      {/* 👥 CAST */}
      <div className="px-8 py-12">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold">
            👥 Cast Members
          </h2>

          <p className="text-gray-400">
            {cast.length} Actors
          </p>

        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">

          {cast.map((actor) => (

            <div
              key={actor.id}
              className={`min-w-[180px] rounded-2xl overflow-hidden hover:scale-105 transition duration-300 shadow-xl ${
                darkMode
                  ? "bg-gray-900"
                  : "bg-white"
              }`}
            >

              {/* IMAGE */}
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  className="h-[250px] w-full object-cover"
                />
              ) : (
                <div className="h-[250px] flex items-center justify-center bg-gray-700 text-5xl">
                  👤
                </div>
              )}

              {/* INFO */}
              <div className="p-4">

                <p className="font-bold text-sm">
                  {actor.name}
                </p>

                <p className="text-gray-400 text-xs mt-2">
                  {actor.character}
                </p>

              </div>

            </div>

          ))}
        </div>
      </div>

      {/* 🤖 RECOMMENDED */}
      <div className="px-8 pb-14">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-4xl font-bold">
            🤖 Recommended Movies
          </h2>

          <p className="text-gray-400">
            {recommended.length} Movies
          </p>

        </div>

        <div className="flex gap-6 overflow-x-auto pb-4">

          {recommended.map((movie) => (

            <div
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className={`min-w-[190px] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-xl ${
                darkMode
                  ? "bg-gray-900"
                  : "bg-white"
              }`}
            >

              {/* POSTER */}
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                className="w-full h-[280px] object-cover"
              />

              {/* INFO */}
              <div className="p-4">

                <p className="font-semibold text-sm line-clamp-2">
                  {movie.title}
                </p>

                <p className="text-yellow-500 text-sm mt-2">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

              </div>

            </div>

          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;