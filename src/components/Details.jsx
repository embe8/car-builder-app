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
    <div className="d-flex flex-column gap-3">
      {model && (
        <>
          <h2>{model.year} {model.model_name}</h2>
          <p>Fuel Type: {model.fuel_type}</p>
        </>
      )}

      <h3>Standard Features</h3>

      {error && <p className="text-danger">{error}</p>}

      {model?.features?.length > 0 ? (
        <div className="feature-list">
          {model.features.map((feature) => (
            <div key={feature.feature_id} className="feature-item">
              {feature.feature_name}
            </div>
          ))}
        </div>
      ) : (
        <p>No features available for this model</p>
      )}
    </div>
  );
};

export default Details;
