import { createContext, useState, useContext, useEffect } from 'react';

//create Context
const MovieContext = createContext();

//create hook for Context
export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error('useMovies usage error');
  }

  return context;
}

//create the provider component
export function MovieProvider({ children }) {
  //watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  //save watchlist changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  //add movie to watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  //remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.filter((movie) => movie.id !== movieId)
    );
  };

  //share watchlist and functions with other components
  const value = { watchlist, addToWatchlist, removeFromWatchlist, };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
}
