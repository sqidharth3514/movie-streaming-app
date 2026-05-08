
/*import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/movie", { state: movie })}
      className="w-[180px] cursor-pointer group"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-lg group-hover:scale-110 transition duration-300"
      />

      <div className="mt-2">
        <h3 className="text-sm">{movie.title}</h3>
        <p className="text-yellow-400 text-xs">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;*/
function MovieCard({ movie, onPlay, onSave, saved }) {
  return (
    <div className="w-[180px] group relative">

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="rounded-lg cursor-pointer group-hover:scale-110 transition"
      />

      <div className="mt-2">
        <h3 className="text-sm">{movie.title}</h3>
        <p className="text-yellow-400 text-xs">⭐ {movie.vote_average}</p>
      </div>

      {/* Hover buttons */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition">

        <button
          onClick={() => onPlay(movie)}
          className="bg-red-600 px-3 py-1 rounded text-sm"
        >
          ▶ Trailer
        </button>

        <button
          onClick={() => onSave(movie)}
          className="bg-green-600 px-3 py-1 rounded text-sm"
        >
          {saved ? "❤️ Saved" : "🤍 Save"}
        </button>

      </div>

    </div>
  );
}

export default MovieCard;
