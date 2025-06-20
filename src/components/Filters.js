
import React from 'react';

const Filters = ({ filters, onFilterChange, categories, years }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="bi bi-funnel me-2"></i>
          Filtros
        </h5>
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Año</label>
            <select
              className="form-select"
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
            >
              <option value="">Todos los años</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Rating mínimo</label>
            <select
              className="form-select"
              value={filters.minRating}
              onChange={(e) => onFilterChange('minRating', e.target.value)}
            >
              <option value="">Cualquier rating</option>
              <option value="7">7.0+</option>
              <option value="8">8.0+</option>
              <option value="9">9.0+</option>
            </select>
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-outline-secondary w-100 mt-4"
              onClick={() => onFilterChange('reset')}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
