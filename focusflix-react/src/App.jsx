/*import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* 🔓 Public Route /}
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protected Home /}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 🔒 Profile /}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 🔒 Watchlist /}
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />

      {/* 🔒 Movie Detail /}
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;*/

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Watchlist from "./pages/Watchlist";
import MovieDetail from "./pages/MovieDetail";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* 🔓 PUBLIC ROUTE */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 HOME */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* 🔒 PROFILE */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 🔒 WATCHLIST */}
      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />

      {/* 🔒 MOVIE DETAIL */}
      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />

      {/* ❌ INVALID ROUTE */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;