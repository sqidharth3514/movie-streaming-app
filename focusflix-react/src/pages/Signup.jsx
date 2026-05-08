import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded w-[300px]">
        <h2 className="text-2xl mb-4">Signup</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full mb-3 p-2 bg-gray-800" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full mb-3 p-2 bg-gray-800" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full mb-3 p-2 bg-gray-800" />

        <button onClick={handleSignup} className="bg-red-600 w-full py-2 rounded">
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;