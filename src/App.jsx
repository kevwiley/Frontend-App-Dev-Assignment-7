import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  //stores search results for Header and Home
  const [searchResults, setSearchResults] = useState(null);

  return (
    <Router>
      <div className="app">
        <Header setSearchResults={setSearchResults} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;