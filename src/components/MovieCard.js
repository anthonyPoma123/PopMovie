
import React from 'react';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = () => {
    onToggleFavorite(movie.id);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm movie-card">
        <div className="position-relative">
          <img
            src={movie.poster}
            className="card-img-top"
            alt={movie.title}
            style={{ height: '300px', objectFit: 'cover' }}
          />
          <button
            className={`btn position-absolute top-0 end-0 m-2 ${
              isFavorite ? 'btn-danger' : 'btn-outline-light'
            }`}
            onClick={handleFavoriteClick}
            style={{ border: 'none', borderRadius: '50%', width: '40px', height: '40px' }}
          >
            <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{movie.title}</h5>
          <div className="mb-2">
            <span className="badge bg-primary me-2">{movie.category}</span>
            <span className="badge bg-secondary">{movie.year}</span>
          </div>
          <div className="mt-auto">
            <div className="d-flex align-items-center">
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span className="fw-bold">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
