import MovieGrid from '../components/MovieGrid';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getPopularMovies } from '../services/movieService';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetches popular movies when the component loads and handles errors
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getPopularMovies();
        setMovies(data.results);
      } catch (err) {
        console.error('Failed to load popular movies:', err);
        setError('Failed to load movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  //displays search results
  const displayedMovies =
    searchResults !== null ? searchResults : movies;

  //shows loading spinner while fetching movies
  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  //errors if fetching popular movies failed
  if (error && searchResults === null) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults !== null ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      {error && searchResults !== null && ( <ErrorMessage message={error} /> )}
      <MovieGrid movies={displayedMovies} />
    </main>
  );
};

export default Home;