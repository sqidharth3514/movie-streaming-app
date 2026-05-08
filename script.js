const API_KEY = "992af8246589cfbfaf6ce771c0cd2c8f";

const container = document.getElementById("movies");
const searchInput = document.getElementById("search");

// ❤️ Watchlist
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// 🎬 Loader
function showLoader() {
  container.innerHTML = "<p class='text-gray-400'>Loading...</p>";
}

// 🎬 Load Trending Movies
async function loadMovies() {
  try {
    showLoader();

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await res.json();

    if (!data.results) throw new Error("No data");

    displayMovies(data.results);

  } catch (error) {
    container.innerHTML = "<p class='text-red-500'>Failed to load movies</p>";
    console.error(error);
  }
}

// 🎥 Display Movies
function displayMovies(movies) {
  container.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const isSaved = watchlist.find(m => m.id === movie.id);

    const div = document.createElement("div");

    div.innerHTML = `
      <div class="relative group w-[200px] cursor-pointer">

        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="rounded-lg shadow-lg transform group-hover:scale-110 transition duration-300">

        <div class="absolute bottom-0 left-0 right-0 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition rounded-b-lg">
          <h3 class="text-sm font-semibold">${movie.title}</h3>
          <p class="text-yellow-400 text-xs">⭐ ${movie.vote_average}</p>

          <button onclick='event.stopPropagation(); toggleWatchlist(${JSON.stringify(movie)})'
            class="mt-1 text-xs px-2 py-1 rounded ${
              isSaved ? "bg-green-600" : "bg-red-600"
            }'>
            ${isSaved ? "Saved ❤️" : "Add ❤️"}
          </button>
        </div>

      </div>
    `;

    // 👉 CLICK = OPEN DETAIL PAGE
    div.onclick = () => showDetails(movie);

    container.appendChild(div);
  });
}

// ❤️ Toggle Watchlist
function toggleWatchlist(movie) {
  const exists = watchlist.find(m => m.id === movie.id);

  if (exists) {
    watchlist = watchlist.filter(m => m.id !== movie.id);
  } else {
    watchlist.push(movie);
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  loadMovies();
}

// 🔍 Search
searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value.trim();

    if (!query) return loadMovies();

    try {
      showLoader();

      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );

      const data = await res.json();

      displayMovies(data.results);

    } catch (error) {
      console.error(error);
    }
  }
});

// ⭐ Top Rated
async function loadTopRated() {
  try {
    showLoader();

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
    );

    const data = await res.json();

    displayMovies(data.results);

  } catch (error) {
    console.error(error);
  }
}

// 🎬 👉 OPEN MOVIE DETAIL PAGE (IMPORTANT CHANGE)
function showDetails(movie) {
  localStorage.setItem("movie", JSON.stringify(movie));
  window.location.href = "movie.html";
}

// 🚀 Start
loadMovies();