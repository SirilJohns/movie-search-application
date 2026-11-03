const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

// Search movies
export const searchMovies = async (movieName) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}&type=movie`,
    );

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data.Search;
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};

// Get individual movie details
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`,
    );

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data;
  } catch (error) {
    console.error("Movie Details Error:", error);
    throw error;
  }
};
