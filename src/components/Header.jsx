import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../services/movieService';

function Header({ setSearchResults }) {
  const [query, setQuery] = useState('');

  //searches every time input changes
  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    //clears search results when input empty
    if (!value.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      const data = await searchMovies(value);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Failed to find movies:', error);
      setSearchResults([]);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleSearchChange}
          />
          <button className="search-button" onClick={() => { document.querySelector('.search-input')?.focus(); }}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
