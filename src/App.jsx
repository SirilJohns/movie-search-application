import { useState, useEffect, useRef } from "react";
import MovieCard from "./components/MovieCard";
import { searchMovies, getMovieDetails } from "./services/movieApi";
import Favourites from "./components/Favourites";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favourites, setFavourites] = useState(() => {
    const savedFavourites = localStorage.getItem("favourites");

    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });
  const detailsRef = useRef(null);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(search);

      setMovies(data);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (imdbID) => {
    try {
      setLoading(true);
      setError("");

      const data = await getMovieDetails(imdbID);
      setSelectedMovie(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMovie && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedMovie]);

  const handleAddFavourite = (movie) => {
    setFavourites((prevFavourites) => {
      const alreadyExists = prevFavourites.some(
        (fav) => fav.imdbID === movie.imdbID,
      );

      if (alreadyExists) {
        return prevFavourites;
      }

      return [...prevFavourites, movie];
    });
  };

  const handleRemoveFavourite = (imdbID) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((movie) => movie.imdbID !== imdbID),
    );
  };

  return (
    <div className="app-container">
      <h1>Movie Search Application</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <h2>Loading...</h2>}

      {error && <p>{error}</p>}

      <div className="filter-buttons">
        <button onClick={() => setShowFavouritesOnly(false)}>All Movies</button>

        <button onClick={() => setShowFavouritesOnly(true)}>
          ❤️ Favourites
        </button>
      </div>

      <div className="movie-list">
        {(showFavouritesOnly ? favourites : movies).map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onViewDetails={handleViewDetails}
            onAddFavourite={handleAddFavourite}
          />
        ))}
      </div>

      <Favourites
        favourites={favourites}
        onRemoveFavourite={handleRemoveFavourite}
      />

      {selectedMovie && (
        <div className="movie-details" ref={detailsRef}>
          <h2>{selectedMovie.Title}</h2>

          <img
            src={
              selectedMovie.Poster !== "N/A"
                ? selectedMovie.Poster
                : "https://placehold.co/200x300?text=No+Poster"
            }
            alt={selectedMovie.Title}
            width="200"
          />

          <p>Release Date: {selectedMovie.Released}</p>
          <p>IMDb Rating: ⭐ {selectedMovie.imdbRating}</p>
          <p>Director: {selectedMovie.Director}</p>
          <p>Actors: {selectedMovie.Actors}</p>
          <p>Language: {selectedMovie.Language}</p>
          <p>Plot: {selectedMovie.Plot}</p>

          <button onClick={() => setSelectedMovie(null)}>Close Details</button>
        </div>
      )}
    </div>
  );
}

export default App;
