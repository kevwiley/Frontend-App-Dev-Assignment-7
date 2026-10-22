import { useState } from 'react';

function MovieCard({ movie }) {
  //checks if movie is already saved
  const [isFavorite, setIsFavorite] = useState(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );

    return savedMovies.some((savedMovie) => savedMovie.id === movie.id);
  });

  //adds or removes movie from favorites
  const handleFavoriteClick = () => {
    const savedMovies = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );

    let updatedMovies;

    if (isFavorite) {
      //remove movie from favorites
      updatedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id
      );
    } else {
      //add  movie if not already saved
      updatedMovies = [...savedMovies, movie];
    }

    //save the updated favorites list
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedMovies));

    //updates the button
    setIsFavorite(!isFavorite);

    //lets the favorites page know list changed
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/300x450/667eea/ffffff?text=No+Poster'
          }
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}</span>
          <span className="movie-year">{movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown'}</span>
        </div>
        <button className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
