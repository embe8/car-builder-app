import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import VehicleService from '../services/VehicleService';

const ModelsList = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const vehicleService = new VehicleService();
  // Set selected model
  const [selectedModel, setSelectedModel] = useState('');

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log('Fetching models...');
        const carModels = await vehicleService.fetchModelsWithTrimsAndFeatures();
        console.log('Car models:', carModels);
        setModels(carModels);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError(err.message);
      }
      setLoading(false);
    };

    fetchModels();
  }, []);

  console.log(models.bodyName);

  // Get unique body types for filter dropdown
  const availableBodyTypes = useMemo(() => {
    const bodyTypes = [...new Set(models.map(model => model.bodyName))].filter(Boolean);
    console.log(bodyTypes);
    return bodyTypes;
  }, [models]);

  // Set selected model when build model is clicked
  const handleSelect = async (model) => {
    setSelectedModel(model);
    sessionStorage.setItem('selectedModelId', String(model.id));
  }

  // Filter and sort models
  const filteredAndSortedModels = useMemo(() => {
    let filtered = models;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(model => 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (model.manufacturerName && model.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Body type filter
    if (selectedBodyType) {
      filtered = filtered.filter(model => model.bodyName === selectedBodyType);
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(model => {
        const basePrice = model.calculateBasePrice();
        const minPrice = priceRange.min ? parseFloat(priceRange.min) : 0;
        const maxPrice = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return basePrice >= minPrice && basePrice <= maxPrice;
      });
    }

    // Sort models
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'year':
          aValue = a.year;
          bValue = b.year;
          break;
        case 'price':
          aValue = a.calculateBasePrice();
          bValue = b.calculateBasePrice();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [models, searchTerm, selectedBodyType, priceRange, sortBy, sortOrder]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBodyType('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setSortOrder('asc');
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Models</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Available Models</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-primary fs-6">{filteredAndSortedModels.length} Models Found</span>
          <div className="input-group" style={{ width: '300px' }}>
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="bodyTypeFilter" className="form-label">Body Type</label>
              <select
                id="bodyTypeFilter"
                className="form-select"
                value={selectedBodyType}
                onChange={(e) => setSelectedBodyType(e.target.value)}
              >
                <option value="">All Body Types</option>
                {availableBodyTypes.map(bodyType => (
                  <option key={bodyType} value={bodyType}>{bodyType}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-2">
              <label htmlFor="minPrice" className="form-label">Min Price</label>
              <input
                type="number"
                id="minPrice"
                className="form-control"
                placeholder="0"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              />
            </div>
            
            <div className="col-md-2">
              <label htmlFor="maxPrice" className="form-label">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                className="form-control"
                placeholder="No limit"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              />
            </div>
            
            <div className="col-md-2">
              <label htmlFor="sortBy" className="form-label">Sort By</label>
              <select
                id="sortBy"
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="year">Year</option>
                <option value="price">Price</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <label htmlFor="sortOrder" className="form-label">Order</label>
              <select
                id="sortOrder"
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            
            <div className="col-md-1 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clearFilters}
                title="Clear all filters"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredAndSortedModels.map((model) => (
          <div key={model.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-img-top bg-light" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="text-center text-muted">
                  <i className="fas fa-car fa-3x mb-2"></i>
                  <p>Car Image</p>
                </div>
              </div>
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{model.getDisplayName()}</h5>
                
                <div className="mb-3">
                  <span className="badge bg-secondary me-2">{model.bodyName}</span>
                </div>

                <div className="mb-3">
                  <h6 className="text-primary">Starting at ${model.calculateBasePrice().toLocaleString()}</h6>
                </div>

                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <Link 
                      to={`/models/${model.id}`} 
                      className="btn btn-primary"
                      onClick={() => handleSelect(model)}
                    >
                      View Details
                    </Link>
                    <Link 
                      to={`/builder?model=${model.id}`} 
                      className="btn btn-outline-primary"
                      onClick={() => handleSelect(model)}
                    >
                      Build This Model
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedModels.length === 0 && models.length > 0 && (
        <div className="text-center py-5">
          <i className="fas fa-search fa-3x text-muted mb-3"></i>
          <h4>No Models Match Your Filters</h4>
          <p className="text-muted">Try adjusting your search criteria or clear the filters to see all models.</p>
          <button className="btn btn-primary" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      )}

      {models.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-car fa-3x text-muted mb-3"></i>
          <h4>No Models Available</h4>
          <p className="text-muted">Check back later for new models.</p>
        </div>
      )}
    </div>
  );
};

export default ModelsList;