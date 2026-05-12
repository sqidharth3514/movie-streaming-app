/*import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🌗 THEME
  const darkMode = localStorage.getItem("theme") !== "light";

  // 👤 LOAD USER
  const loadUser = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 🖼 LOAD AVATAR
    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  };

  // ❤️ LOAD WATCHLIST
  const loadWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setWatchlist(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUser();
    loadWatchlist();
  }, []);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // 🖼 AVATAR UPLOAD
  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);

      // 💾 SAVE
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`min-h-screen transition duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* 🧭 NAVBAR /}
      <Navbar />

      <div className="pt-28 px-6 pb-10">

        {/* 👤 PROFILE HERO /}
        <div
          className={`rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row gap-10 items-center border ${
            darkMode
              ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          {/* LEFT /}
          <div className="flex flex-col items-center">

            {/* 🖼 AVATAR /}
            <div className="relative">

              {avatar ? (
                <img
                  src={avatar}
                  className="w-44 h-44 rounded-full object-cover border-4 border-red-600 shadow-xl"
                />
              ) : (
                <div className="w-44 h-44 rounded-full bg-gray-700 flex items-center justify-center text-7xl">
                  👤
                </div>
              )}

              {/* ONLINE DOT /}
              <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>

            </div>

            {/* 📤 UPLOAD BUTTON /}
            <label className="mt-5 bg-red-600 px-5 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition font-medium shadow-lg">

              Upload Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatar}
              />
            </label>

          </div>

          {/* RIGHT /}
          <div className="flex-1 w-full">

            {/* NAME /}
            <h1 className="text-5xl font-bold mb-3">
              {user?.name || "User"}
            </h1>

            {/* EMAIL /}
            <p
              className={`text-lg mb-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              📧 {user?.email}
            </p>

            {/* USER ID /}
            <p
              className={`mb-8 text-sm ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              🆔 {user?._id}
            </p>

            {/* 📊 STATS /}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              {/* SAVED /}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-4xl font-bold text-red-500">
                  {watchlist.length}
                </h2>

                <p className="mt-2 text-gray-400">
                  Saved Movies
                </p>
              </div>

              {/* ACCOUNT /}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-3xl font-bold text-yellow-400">
                  Premium
                </h2>

                <p className="mt-2 text-gray-400">
                  Account Type
                </p>
              </div>

              {/* STATUS /}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-3xl font-bold text-green-400">
                  Active
                </h2>

                <p className="mt-2 text-gray-400">
                  Profile Status
                </p>
              </div>

            </div>

            {/* 🚪 LOGOUT /}
            <button
              onClick={handleLogout}
              className="mt-8 bg-red-600 px-7 py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              Logout
            </button>

          </div>
        </div>

        {/* ❤️ WATCHLIST /}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold">
              ❤️ Your Watchlist
            </h2>

            <p className="text-gray-400">
              {watchlist.length} Saved Movies
            </p>

          </div>

          {watchlist.length === 0 ? (

            <div
              className={`rounded-2xl p-10 text-center ${
                darkMode
                  ? "bg-gray-900"
                  : "bg-white"
              }`}
            >
              <p className="text-gray-400 text-lg">
                No movies saved 🍿
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

              {watchlist.map((movie) => (

                <div
                  key={movie.movieId}
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                  className={`rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-xl ${
                    darkMode
                      ? "bg-gray-900"
                      : "bg-white"
                  }`}
                >

                  {/* 🎬 POSTER /}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                    className="w-full h-[260px] object-cover"
                  />

                  {/* INFO /}
                  <div className="p-3">

                    <p className="font-semibold text-sm line-clamp-2">
                      {movie.title}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie.movieId}`);
                      }}
                      className="mt-3 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm transition"
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
    </div>
  );
}

export default Profile;*/

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [avatar, setAvatar] = useState(null);

  // ✨ NEW
  const [stats, setStats] = useState({
    joined: "",
    totalMovies: 0,
    accountType: "Premium",
    status: "Active",
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🌗 THEME
  const darkMode = localStorage.getItem("theme") !== "light";

  // 👤 LOAD USER
  const loadUser = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);

      // ✨ JOIN DATE
      const joinDate = new Date().toLocaleDateString();

      setStats((prev) => ({
        ...prev,
        joined: joinDate,
      }));
    }

    // 🖼 LOAD AVATAR
    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  };

  // ❤️ LOAD WATCHLIST
  const loadWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/watchlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];

      setWatchlist(safeData);

      // ✨ TOTAL MOVIES
      setStats((prev) => ({
        ...prev,
        totalMovies: safeData.length,
      }));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUser();
    loadWatchlist();
  }, []);

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // 🖼 AVATAR UPLOAD
  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);

      // 💾 SAVE
      localStorage.setItem("avatar", reader.result);
    };

    reader.readAsDataURL(file);
  };

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

      <div className="pt-28 px-6 pb-10">

        {/* 👤 PROFILE HERO */}
        <div
          className={`rounded-3xl p-8 shadow-2xl flex flex-col lg:flex-row gap-10 items-center border ${
            darkMode
              ? "bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >

          {/* LEFT */}
          <div className="flex flex-col items-center">

            {/* 🖼 AVATAR */}
            <div className="relative">

              {avatar ? (
                <img
                  src={avatar}
                  className="w-44 h-44 rounded-full object-cover border-4 border-red-600 shadow-xl"
                />
              ) : (
                <div className="w-44 h-44 rounded-full bg-gray-700 flex items-center justify-center text-7xl">
                  👤
                </div>
              )}

              {/* ONLINE DOT */}
              <div className="absolute bottom-3 right-3 w-6 h-6 bg-green-500 border-4 border-black rounded-full"></div>

            </div>

            {/* 📤 UPLOAD BUTTON */}
            <label className="mt-5 bg-red-600 px-5 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition font-medium shadow-lg">

              Upload Photo

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatar}
              />
            </label>

          </div>

          {/* RIGHT */}
          <div className="flex-1 w-full">

            {/* NAME */}
            <h1 className="text-5xl font-bold mb-3">
              {user?.name || "User"}
            </h1>

            {/* EMAIL */}
            <p
              className={`text-lg mb-2 ${
                darkMode
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              📧 {user?.email}
            </p>

            {/* USER ID */}
            <p
              className={`mb-2 text-sm ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              🆔 {user?._id}
            </p>

            {/* ✨ JOINED DATE */}
            <p
              className={`mb-8 text-sm ${
                darkMode
                  ? "text-gray-500"
                  : "text-gray-500"
              }`}
            >
              📅 Joined: {stats.joined}
            </p>

            {/* 📊 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">

              {/* SAVED */}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-4xl font-bold text-red-500">
                  {stats.totalMovies}
                </h2>

                <p className="mt-2 text-gray-400">
                  Saved Movies
                </p>
              </div>

              {/* ACCOUNT */}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-3xl font-bold text-yellow-400">
                  {stats.accountType}
                </h2>

                <p className="mt-2 text-gray-400">
                  Account Type
                </p>
              </div>

              {/* STATUS */}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-3xl font-bold text-green-400">
                  {stats.status}
                </h2>

                <p className="mt-2 text-gray-400">
                  Profile Status
                </p>
              </div>

              {/* ✨ FAVORITE */}
              <div
                className={`rounded-2xl p-5 shadow-lg ${
                  darkMode
                    ? "bg-gray-900"
                    : "bg-gray-100"
                }`}
              >
                <h2 className="text-3xl font-bold text-pink-500">
                  🍿
                </h2>

                <p className="mt-2 text-gray-400">
                  Movie Lover
                </p>
              </div>

            </div>

            {/* 🚪 LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-8 bg-red-600 px-7 py-3 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              Logout
            </button>

          </div>
        </div>

        {/* ❤️ WATCHLIST */}
        <div className="mt-14">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-4xl font-bold">
              ❤️ Your Watchlist
            </h2>

            <p className="text-gray-400">
              {watchlist.length} Saved Movies
            </p>

          </div>

          {watchlist.length === 0 ? (

            <div
              className={`rounded-2xl p-10 text-center ${
                darkMode
                  ? "bg-gray-900"
                  : "bg-white"
              }`}
            >
              <p className="text-gray-400 text-lg">
                No movies saved 🍿
              </p>
            </div>

          ) : (

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

              {watchlist.map((movie) => (

                <div
                  key={movie.movieId}
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                  className={`rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-xl ${
                    darkMode
                      ? "bg-gray-900"
                      : "bg-white"
                  }`}
                >

                  {/* 🎬 POSTER */}
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
                    className="w-full h-[260px] object-cover"
                  />

                  {/* INFO */}
                  <div className="p-3">

                    <p className="font-semibold text-sm line-clamp-2">
                      {movie.title}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/movie/${movie.movieId}`);
                      }}
                      className="mt-3 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg text-sm transition"
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
    </div>
  );
}

export default Profile;