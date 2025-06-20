
import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import MovieCard from '../components/MovieCard';
import Filters from '../components/Filters';
import Navbar from '../components/Navbar';
import moviesData from '../data/movies.json';

const MovieApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [currentView, setCurrentView] = useState('movies');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    year: '',
    minRating: ''
  });
  const [favorites, setFavorites] = useState([]);
  const [movies] = useState(moviesData);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Obtener categorías y años únicos
  const categories = [...new Set(movies.map(movie => movie.category))];
  const years = [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a);

  // Función de login
  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  // Función de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser('');
    setCurrentView('movies');
  };

  // Función para alternar favoritos
  const toggleFavorite = (movieId) => {
    setFavorites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  // Función para cambiar filtros
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        category: '',
        year: '',
        minRating: ''
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    }
  };

  // Filtrar películas
  const getFilteredMovies = () => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(movie => movie.category === filters.category);
    }

    if (filters.year) {
      filtered = filtered.filter(movie => movie.year === parseInt(filters.year));
    }

    if (filters.minRating) {
      filtered = filtered.filter(movie => movie.rating >= parseFloat(filters.minRating));
    }

    return filtered;
  };

  // Obtener películas favoritas
  const getFavoriteMovies = () => {
    return movies.filter(movie => favorites.includes(movie.id));
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const filteredMovies = getFilteredMovies();
  const favoriteMovies = getFavoriteMovies();

  return (
    <div className="min-vh-100 bg-light">
      <Navbar
        user={user}
        currentView={currentView}
        setCurrentView={setCurrentView}
        favorites={favorites}
        onLogout={handleLogout}
      />

      <div className="container py-4">
        {currentView === 'movies' ? (
          <>
            {/* Barra de búsqueda */}
            <div className="row mb-4">
              <div className="col-md-6 mx-auto">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar películas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Filtros */}
            <Filters
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              years={years}
            />

            {/* Lista de películas */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Películas Disponibles</h3>
              <span className="badge bg-secondary fs-6">
                {filteredMovies.length} película{filteredMovies.length !== 1 ? 's' : ''}
              </span>
            </div>

            {filteredMovies.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-film display-1 text-muted"></i>
                <h4 className="text-muted mt-3">No se encontraron películas</h4>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              </div>
            ) : (
              <div className="row">
                {filteredMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={favorites.includes(movie.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Vista de favoritas */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>
                <i className="bi bi-heart-fill text-danger me-2"></i>
                Mis Películas Favoritas
              </h3>
              <span className="badge bg-danger fs-6">
                {favoriteMovies.length} favorita{favoriteMovies.length !== 1 ? 's' : ''}
              </span>
            </div>

            {favoriteMovies.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-heart display-1 text-muted"></i>
                <h4 className="text-muted mt-3">No tienes películas favoritas</h4>
                <p className="text-muted">
                  Ve a la sección de películas y marca algunas como favoritas
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentView('movies')}
                >
                  Ver Películas
                </button>
              </div>
            ) : (
              <div className="row">
                {favoriteMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieApp;
