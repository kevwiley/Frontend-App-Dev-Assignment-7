const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

//gets popular movies and handles errors
export async function getPopularMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to get popular movies');
  }

  const data = await response.json();
  return data;
};

//searches for movies and handles errors
export async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  const data = await response.json();
  return data;
};
