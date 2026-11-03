function MovieCard({ movie, onViewDetails, onAddFavourite }) {
  return (
    <div className="movie-card">
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

      <button onClick={() => onViewDetails(movie.imdbID)}>View Details</button>
      <button onClick={() => onAddFavourite(movie)}>❤️ Add to Favourites</button>
    </div>
  );
}

export default MovieCard;
