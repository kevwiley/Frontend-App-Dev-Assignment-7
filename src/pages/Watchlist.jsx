import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';

function Watchlist() {
  //get saved movies and function to remove movie from Context
  const { watchlist } = useMovies();

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Watchlist</h2>
        <p>Movies you want to watch later</p>
      </div>

      {/* display watchlist if it contains movies */}
      {watchlist.length > 0 ? (
        <MovieGrid movies={watchlist} />
      ) : (
        //show message if watchlist empty
        <div className="empty-state">
          <p>Your watchlist is empty. Add movies you'd like to watch!</p>
        </div>
      )}
    </main>
  );
}

export default Watchlist;
