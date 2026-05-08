/*import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // 🎬 Movie details
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovie(data);

      // 🎭 Cast
      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const castData = await castRes.json();
      setCast(castData.cast.slice(0, 10));

      // 🔥 Similar movies
      const simRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      );
      const simData = await simRes.json();
      setSimilar(simData.results);
    }

    fetchData();
  }, [id]);

  if (!movie) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">

      {/* 🎬 HERO /}
      <div
        className="h-[70vh] bg-cover bg-center flex items-end p-10"
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2">{movie.overview}</p>
        </div>
      </div>

      {/* 🎭 CAST /}
      <div className="p-6">
        <h2 className="text-2xl mb-4">🎭 Cast</h2>

        <div className="flex gap-4 overflow-x-auto">
          {cast.map(actor => (
            actor.profile_path && (
              <div key={actor.id} className="w-[120px] text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  className="rounded"
                />
                <p className="text-sm mt-1">{actor.name}</p>
              </div>
            )
          ))}
        </div>
      </div>

      {/* 🔥 SIMILAR MOVIES /}
      <div className="p-6">
        <h2 className="text-2xl mb-4">🔥 Similar Movies</h2>

        <div className="flex gap-4 overflow-x-auto">
          {similar.map(m => (
            m.poster_path && (
              <img
                key={m.id}
                src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                className="w-[150px] rounded cursor-pointer hover:scale-110 transition"
                onClick={() => window.location.href = `/movie/${m.id}`}
              />
            )
          ))}
        </div>
      </div>

    </div>
  );
}

export default MovieDetail;*/

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // 🎬 Movie details
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovie(data);

        // 🎭 Cast
        const castRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
        );
        const castData = await castRes.json();
        setCast(castData.cast?.slice(0, 10) || []);

        // 🔥 Similar movies
        const simRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        );
        const simData = await simRes.json();
        setSimilar(simData.results || []);
      } catch (err) {
        console.error("MovieDetail error:", err);
      }
    }

    fetchData();
  }, [id]);

  if (!movie) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* 🎬 HERO */}
      <div
        className="h-[70vh] bg-cover bg-center flex items-end p-10"
        style={{
          backgroundImage: `linear-gradient(to top, black, transparent), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div>
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-300 mt-2 max-w-xl">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* 🎭 CAST */}
      <div className="p-6">
        <h2 className="text-2xl mb-4">🎭 Cast</h2>

        <div className="flex gap-4 overflow-x-auto">
          {cast.map((actor) =>
            actor.profile_path && (
              <div key={actor.id} className="w-[120px] text-center">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  className="rounded"
                />
                <p className="text-sm mt-1">{actor.name}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* 🔥 SIMILAR MOVIES */}
      <div className="p-6">
        <h2 className="text-2xl mb-4">🔥 Similar Movies</h2>

        <div className="flex gap-4 overflow-x-auto">
          {similar.map((m) =>
            m.poster_path && (
              <img
                key={m.id}
                src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                className="w-[150px] rounded cursor-pointer hover:scale-110 transition"
                onClick={() => navigate(`/movie/${m.id}`)}
              />
            )
          )}
        </div>
      </div>

    </div>
  );
}

export default MovieDetail;