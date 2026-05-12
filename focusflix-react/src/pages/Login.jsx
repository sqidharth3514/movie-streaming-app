/*import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("🔥 LOGIN RESPONSE:", data);

      if (res.ok) {
        // ✅ old data clear (important)
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // ✅ save fresh data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("✅ Saved user:", data.user);

        alert("Login successful");

        // ✅ HARD RELOAD (THIS IS THE REAL FIX)
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server not reachable ❌");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded w-[300px]">
        <h2 className="text-2xl mb-4">Login</h2>

        <form onSubmit={handleLogin}>

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full mb-3 p-2 bg-gray-800"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full mb-3 p-2 bg-gray-800"
          />

          <button
            type="submit"
            className="bg-red-600 w-full py-2 rounded"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;*/


import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // 🌙 DARK MODE CHECK
  const darkMode = localStorage.getItem("theme") !== "light";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("🔥 LOGIN RESPONSE:", data);

      if (res.ok) {
        // ✅ CLEAR OLD DATA
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // ✅ SAVE NEW DATA
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("✅ Saved user:", data.user);

        alert("Login successful");

        // ✅ HARD RELOAD
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Server not reachable ❌");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition duration-300 ${
        darkMode
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >

      {/* LOGIN CARD */}
      <div
        className={`p-8 rounded-2xl shadow-2xl w-[340px] transition duration-300 ${
          darkMode
            ? "bg-gray-900"
            : "bg-gray-100"
        }`}
      >

        <h2 className="text-3xl font-bold mb-6 text-center">
          🎬 FocusFlix Login
        </h2>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            className={`w-full mb-4 p-3 rounded outline-none transition ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white border border-gray-300 text-black"
            }`}
          />

          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            className={`w-full mb-5 p-3 rounded outline-none transition ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white border border-gray-300 text-black"
            }`}
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition w-full py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        {/* EXTRA TEXT */}
        <p className="text-center text-sm text-gray-400 mt-5">
          Welcome back to FocusFlix 🍿
        </p>

      </div>
    </div>
  );
}

export default Login;