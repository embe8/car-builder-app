import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VehicleService from '../services/VehicleService';

const CarBuilder = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  // modal for payment estimator
  /*const [showEstimator, setShowEstimator] = useState(false);
  const openEstimator = () => setShowEstimator(true);
  const closeEstimator = () => setShowEstimator(false);*/

  // display print options for Print Build button
  const handlePrint = () => {
    window.print();
  };

  // calculate total price dynamically
useEffect(() => {
  let total = 0;
  
  // Base model price (cheapest trim price avail. for the model)
  /*if (selectedModel) {
    total += selectedModel.calculateBasePrice();
  }*/
  
  // Trim price (difference from base price)
  if (selectedTrim) {
    total += selectedTrim.startingPrice;
  }
  
  // Selected packages
  if (selectedPackages.length > 0) {
    total += selectedPackages.reduce((sum, pkg) => sum + pkg.cost, 0);
  }
  
  setTotalPrice(total);
}, [selectedModel, selectedTrim, selectedPackages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modelId = params.get('model') || sessionStorage('selectedModelId');
    if (!modelId) return;
    (async () => {
      try{
      const vehicleService = new VehicleService();
      const models = await vehicleService.fetchModelsWithTrims();
      const found = models.find(m => String(m.id) === String(modelId));
      if(found) 
        {
        setSelectedModel(found);
        setCurrentStep(1);
      } 
      else 
      {
        console.error('Model not found');

      }
    } catch (error) 
    {
      console.error('Error fetching model:', error);
    }
  })();
}, []);

  

  const steps = [
    { number: 1, title: 'Select Model', active: currentStep === 1 },
    { number: 2, title: 'Choose Trim', active: currentStep === 2 },
    { number: 3, title: 'Add Packages', active: currentStep === 3 },
    { number: 4, title: 'Review & Order', active: currentStep === 4 }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-success text-white p-4 rounded">
            <h1 className="display-4 mb-2">Car Builder</h1>
            <p className="lead mb-0">Design your perfect car step by step and see real-time pricing.</p>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Progress Steps */}
        <div className="col-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="d-flex align-items-center">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                      step.active ? 'bg-primary text-white' : 'bg-light text-muted'
                    }`} style={{ width: '40px', height: '40px' }}>
                      {step.number}
                    </div>
                    <span className={`ms-2 ${step.active ? 'text-primary fw-bold' : 'text-muted'}`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="mx-3">
                        <i className="fas fa-chevron-right text-muted"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {/* Step 1: Model Selection */}
              {currentStep === 1 && (
                <div>
                  <h3 className="mb-4">Select Your Model</h3>
                  {selectedModel ? (
                    <div className="alert alert-success">
                      
                      <h5>Selected Model: {selectedModel.name}</h5>
                      <p className="mb-2">
                        <strong>Body Type:</strong> {selectedModel.bodyType} | 
                        <strong> Year:</strong> {selectedModel.year} | 
                        <strong> Starting Price:</strong> ${selectedModel.calculateBasePrice().toLocaleString()}
                      </p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setCurrentStep(2)}
                      >
                        Continue to Trim Selection
                      </button>
                    </div>
                  ) : (
                    <div className="row">
                      {/* Show available models for selection if none selected */}
                      <div className="col-12">
                        <p>No model selected. Please go back to the models list to select a model.</p>
                        <Link to="/models" className="btn btn-primary">Browse Models</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
                            

              {/* Step 2: Trim Selection */}
              {currentStep === 2 && selectedModel && (
                <div>
                  <h3 className="mb-4">Choose Your Trim</h3>
                  <div className="row">
                    {/* loop over each trim in the array and compare to selected trim*/}
                    {selectedModel.trims && selectedModel.trims.length > 0 ? (
                      selectedModel.trims.map((trim) => (
                    <div key={trim.id} className="col-12 mb-3">
                        <div className={`card ${selectedTrim?.id === trim.id ? 'border-success' : ''}`}>
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">{trim.name}</h5>
                              <p className="text-muted mb-0">Base trim with essential features</p>
                            </div>
                            <div className="text-end">
                              <h6 className="text-success mb-1">+${trim.startingPrice}</h6>
                              {/* Change style if trim id matches*/}
                              <button className={`btn ${selectedTrim?.id === trim.id ? 'btn-success' : 'btn-outline-primary'} btn-sm`}
                              onClick={() => setSelectedTrim(trim)}
                              >{selectedTrim?.id === trim.id ? 'Selected' : 'Select'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      ))) :
                    (<div className="col-12 mb-3">
                      <div className="alert alert-warning"> 
                        <h5 className="mb-1">No Trims Available</h5>
                        <p className="text-muted mb-0">No available trims for this model</p>
                      </div>
                    </div>
              )}
              </div>
              </div>)}

              {/* Step 3: Add Packages */}
{currentStep === 3 && selectedModel && selectedTrim && (
  <div>
    <div className="alert alert-info mb-4">
      <h5>Building: {selectedModel.getDisplayName()} - {selectedTrim.name}</h5>
      <p className="mb-0">Add optional packages to customize your vehicle</p>
    </div>
    <h3 className="mb-4">Add Packages</h3>
    <div className="row">
      {selectedTrim.getPackages() && selectedTrim.getPackages().length > 0 ? (
        selectedTrim.getPackages().map((packageObj, index) => {
          // Find the corresponding trimPackage to get the cost
          const trimPackage = selectedTrim.trimPackages.find(tp => tp.packageId === packageObj.id);
          return (
            <div key={packageObj.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="form-check">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`package-${packageObj.id}`}
                      checked={selectedPackages.some(pkg => pkg.packageId === packageObj.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          // Add the trimPackage (which has cost info) to selectedPackages
                          setSelectedPackages(prev => [...prev, trimPackage]);
                        } else {
                          setSelectedPackages(prev => 
                            prev.filter(pkg => pkg.packageId !== packageObj.id)
                          );
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={`package-${packageObj.id}`}>
                      <strong>{packageObj.name}</strong>
                      <br />
                      <small className="text-muted">
                        +${trimPackage?.cost.toLocaleString() || '0'}
                      </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-12">
          <div className="alert alert-warning">
            <h5>No Packages Available</h5>
            <p>This trim doesn't have any optional packages configured yet.</p>
          </div>
        </div>
      )}
    </div>
  </div>
)}
              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div id="print-area">
                  <h3 className="mb-4">Review Your Build</h3>
                  <div className="alert alert-success">
                    <h5>Your Custom Car</h5>
                    <p className="mb-0">
                      {selectedModel?.getDisplayName()} {selectedTrim?.name}
                      {selectedPackages.length > 0 && ` with ${selectedPackages.length} package${selectedPackages.length > 1 ? 's' : ''}`}
                    </p>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/*<tr>
                          <td>Base Model</td>
                          <td>$26,420</td>
                        </tr>*/}
                        {selectedTrim && (
                          <tr>
                          <td>{selectedTrim?.name}</td>
                          <td>${selectedTrim.startingPrice.toLocaleString()}</td>
                        </tr>
                        )}

                        {selectedPackages.map((pkg, index) => (
                        <tr key={index}>
                          <td>{pkg.package?.name || 'Package'}</td>
                          <td>+${pkg.cost.toLocaleString()}</td>
                        </tr>
                        ))}

                        <tr className="table-success">
                          <td><strong>Total</strong></td>
                          <td><strong>${totalPrice.toLocaleString()}</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {/*Previous button not displayed if currenstep = 1*/}
              <div className="d-flex justify-content-between mt-4">
                {currentStep === 1 ? (
                  <Link to="/models" className="btn btn-outline-secondary">
                    Back to Models
                  </Link>
                ) : (
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  >
                    Previous
                  </button>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={currentStep === 4}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary Sidebar */}
        <div className="col-lg-4">
          <div className="card sticky-top">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Price Summary</h5>
            </div>
            <div className="card-body">
             
              {/*<div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Base Price:</span>
                  <span>${selectedModel.calculateBasePrice().toLocaleString()}</span>
                </div>*/}
                {selectedModel && selectedTrim && (
                <div className="d-flex justify-content-between">
                  <span>Trim: ({selectedTrim.name})</span>
                  <span>${selectedTrim.startingPrice.toLocaleString()}</span>
                </div>
                )}
                {selectedPackages.length > 0 && (
                <div className="d-flex justify-content-between">
                  <span>Packages ({selectedPackages.length}):</span>
                  <span>+${selectedPackages.reduce((sum, pkg) => sum + pkg.cost, 0).toLocaleString()}</span>
                </div>
                )}
              </div>
                
              <hr />
              <div className="d-flex justify-content-between h5">
                <span>Total:</span>
                <span className="text-primary">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="d-grid mt-3">
                {/*<button className="btn btn-success">Search Inventory</button>*/}
                <button className="btn btn-outline-secondary d-rpint-none" onClick={handlePrint}>Print Build</button>
                <button className="btn btn-outline-primary mt-2">Use Payment Estimator</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CarBuilder;