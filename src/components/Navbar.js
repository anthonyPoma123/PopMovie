
import React from 'react';

const Navbar = ({ user, currentView, setCurrentView, favorites, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <span className="navbar-brand">
          <i className="bi bi-film me-2"></i>
          MovieApp
        </span>
        
        <div className="navbar-nav flex-row">
          <button
            className={`btn btn-link nav-link text-white me-3 ${
              currentView === 'movies' ? 'active' : ''
            }`}
            onClick={() => setCurrentView('movies')}
          >
            <i className="bi bi-collection-play me-1"></i>
            Películas
          </button>
          <button
            className={`btn btn-link nav-link text-white me-3 ${
              currentView === 'favorites' ? 'active' : ''
            }`}
            onClick={() => setCurrentView('favorites')}
          >
            <i className="bi bi-heart me-1"></i>
            Favoritas ({favorites.length})
          </button>
        </div>

        <div className="d-flex align-items-center">
          <span className="text-white me-3">
            <i className="bi bi-person-circle me-1"></i>
            Hola, {user}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
            <i className="bi bi-box-arrow-right me-1"></i>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
