import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehicleService from '../services/VehicleService';

const Details = () => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const vehicleService = new VehicleService();

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const data = await vehicleService.fetchModelWithFeatures(id);
        setModel(data);
      } catch (err) {
        console.error('Error fetching model:', err);
        setError(err.message || 'Failed to fetch model data');
      }
    };

    fetchModel();
  }, [id]);

  return (
    
    <div className="container my-5">
    {model && (
      <div className="card bg-light shadow-sm">
        <div className="row align-items-md-stretch">
          <div className="col-md-5">
            <img
              src="/images/AI_car_carousel.png"
              alt="Car"
              className="img-fluid rounded-start h-100 object-fit-cover"
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title">{model.year} {model.name}</h2>
              <p className="card-text">
                <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.
              </p>
              <h4 className="mt-4">Standard Features</h4>

              {error && <p className="text-danger">{error}</p>}

              {model.features && model.features.length > 0 ? (
                <ul className="list-unstyled">
                  {model.features.map((feature) => (
                    <li key={feature.id} className="mb-1">
                      • {feature.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No features available for this model.</p>
              )}
            </div>
          </div>
     
        </div>

      </div>
      
    )}
      {/* Spacing between cards */}
      <div className="my-4"></div>

      {/* Second Card - Dark Background */}
      <div className="card bg-dark text-white p-4">
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <h4>Additional Info</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
            <div className="card-img-top bg-light" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="text-center text-muted">
                  <i className="fas fa-car fa-3x mb-2"></i>
                  <p>Feature Image</p>
                </div>
              </div>
          </div>
          <div className="col-md-6">
            <h4>Additional Info</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
          </div>
        </div>
      </div>
    {!model && !error && <p>Loading...</p>}
  </div>
  
);
};

export default Details;
