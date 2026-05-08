import { useState } from "react";

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

export default Login;