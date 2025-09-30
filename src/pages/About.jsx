import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CarBuilder = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const steps = [
    { number: 1, title: 'Select Model', active: currentStep === 1 },
    { number: 2, title: 'Choose Trim', active: currentStep === 2 },
    { number: 3, title: 'Add Features', active: currentStep === 3 },
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
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="card border-primary">
                        <div className="card-body text-center">
                          <div className="bg-light rounded mb-3" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-car fa-2x text-muted"></i>
                          </div>
                          <h5>2024 Toyota Camry</h5>
                          <p className="text-muted">Starting at $26,420</p>
                          <button className="btn btn-primary">Select This Model</button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="card">
                        <div className="card-body text-center">
                          <div className="bg-light rounded mb-3" style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fas fa-car fa-2x text-muted"></i>
                          </div>
                          <h5>2024 Honda Accord</h5>
                          <p className="text-muted">Starting at $27,895</p>
                          <button className="btn btn-outline-primary">Select This Model</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Trim Selection */}
              {currentStep === 2 && (
                <div>
                  <h3 className="mb-4">Choose Your Trim</h3>
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="card border-success">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">LE</h5>
                              <p className="text-muted mb-0">Base trim with essential features</p>
                            </div>
                            <div className="text-end">
                              <h6 className="text-success mb-1">+$0</h6>
                              <button className="btn btn-success btn-sm">Select</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5 className="mb-1">XLE</h5>
                              <p className="text-muted mb-0">Premium features and comfort</p>
                            </div>
                            <div className="text-end">
                              <h6 className="text-success mb-1">+$2,500</h6>
                              <button className="btn btn-outline-primary btn-sm">Select</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Features */}
              {currentStep === 3 && (
                <div>
                  <h3 className="mb-4">Add Features</h3>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="feature1" />
                            <label className="form-check-label" htmlFor="feature1">
                              <strong>Leather Seats</strong> - Premium comfort
                              <br />
                              <small className="text-muted">+$1,200</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="feature2" />
                            <label className="form-check-label" htmlFor="feature2">
                              <strong>Navigation System</strong> - GPS and infotainment
                              <br />
                              <small className="text-muted">+$800</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div>
                  <h3 className="mb-4">Review Your Build</h3>
                  <div className="alert alert-success">
                    <h5>Your Custom Car</h5>
                    <p className="mb-0">2024 Toyota Camry XLE with selected features</p>
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
                        <tr>
                          <td>Base Model</td>
                          <td>$26,420</td>
                        </tr>
                        <tr>
                          <td>XLE Trim</td>
                          <td>$2,500</td>
                        </tr>
                        <tr>
                          <td>Leather Seats</td>
                          <td>$1,200</td>
                        </tr>
                        <tr className="table-success">
                          <td><strong>Total</strong></td>
                          <td><strong>$30,120</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
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
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Base Price:</span>
                  <span>$26,420</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Trim:</span>
                  <span>$2,500</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Features:</span>
                  <span>$1,200</span>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between h5">
                <span>Total:</span>
                <span className="text-primary">$30,120</span>
              </div>
              <div className="d-grid mt-3">
                <button className="btn btn-success">Request Quote</button>
                <button className="btn btn-outline-primary mt-2">Save Build</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarBuilder;