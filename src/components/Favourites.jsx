function Favourites({ favourites, onRemoveFavourite }) {
  return (
    <section className="favourites-section">
      <h2>❤️ My Favourites</h2>

      {favourites.length === 0 ? (
        <p>No favourite movies added yet.</p>
      ) : (
        <div className="movie-list">
          {favourites.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/200x300?text=No+Poster"
                }
                alt={movie.Title}
              />

              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>

              <button onClick={() => onRemoveFavourite(movie.imdbID)}>
                Remove ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favourites;
