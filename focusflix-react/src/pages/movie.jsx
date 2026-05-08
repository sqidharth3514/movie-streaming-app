import { useLocation } from "react-router-dom";

function Movie() {
  const location = useLocation();
  const movie = location.state;

  if (!movie) return <p>No data</p>;

  return (
    <div className="bg-black text-white min-h-screen p-6">

      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-lg mb-4"
      />

      <p className="text-yellow-400 mb-2">⭐ {movie.vote_average}</p>

      <p className="max-w-xl text-gray-300">{movie.overview}</p>

    </div>
  );
}

export default Movie;