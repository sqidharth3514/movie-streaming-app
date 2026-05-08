import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // 🔐 LIVE login check (IMPORTANT FIX)
  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin(); // first time

    window.addEventListener("storage", checkLogin); // 🔥 sync across tabs

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  // 🔍 Search debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      if (onSearch) onSearch(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query, onSearch]);

  // 🧭 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false); // 🔥 instant update
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center transition duration-300 ${
        scrolled ? "bg-black shadow-lg backdrop-blur" : "bg-transparent"
      }`}
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <Link to="/">
          <h1 className="text-3xl font-bold text-red-600 cursor-pointer hover:scale-105 transition">
            FocusFlix
          </h1>
        </Link>

        <Link to="/" className="hover:text-red-500 transition">
          Home
        </Link>

        <Link to="/watchlist" className="hover:text-red-500 transition">
          Watchlist ❤️
        </Link>

        {isLoggedIn && (
          <Link to="/profile" className="hover:text-red-500 transition">
            Profile 👤
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        
        {/* 🔍 Search */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="bg-gray-800 px-4 py-2 rounded text-white outline-none focus:ring-2 focus:ring-red-500 transition w-[220px]"
        />

        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;