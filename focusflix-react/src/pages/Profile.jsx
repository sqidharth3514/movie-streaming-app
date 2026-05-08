import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Load user
  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setName(parsed.name);
      setAvatar(parsed.avatar || "");
    }
  };

  // ❤️ Load watchlist
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

  // ✏️ Save profile
  const handleSave = () => {
    const updatedUser = { ...user, name, avatar };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditing(false);
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">

      <h1 className="text-3xl mb-6">👤 Profile</h1>

      <div className="bg-gray-900 p-6 rounded w-[320px]">

        {/* 🧑 Avatar */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={
              avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="w-24 h-24 rounded-full mb-3 object-cover"
          />

          {editing && (
            <input
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="p-2 bg-gray-800 w-full mb-2"
            />
          )}
        </div>

        {/* ✏️ Name */}
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 bg-gray-800 w-full mb-3"
          />
        ) : (
          <p className="mb-2"><b>Name:</b> {user?.name}</p>
        )}

        <p className="mb-2"><b>Email:</b> {user?.email}</p>
        <p><b>Saved Movies:</b> {watchlist.length}</p>

        {/* Buttons */}
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 mt-4 px-4 py-2 rounded w-full"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 mt-4 px-4 py-2 rounded w-full"
          >
            Edit Profile
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 mt-2 px-4 py-2 rounded w-full"
        >
          Logout
        </button>

      </div>

      {/* ❤️ Watchlist Preview */}
      <h2 className="text-xl mt-8 mb-4">❤️ Your Watchlist</h2>

      <div className="flex gap-4 overflow-x-auto">
        {watchlist.map((movie) => (
          <div key={movie.movieId} className="w-[120px]">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster}`}
              className="rounded"
            />
            <p className="text-xs mt-1">{movie.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Profile;