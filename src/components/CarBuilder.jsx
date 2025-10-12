import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VehicleService from '../services/VehicleService';
import { Model, Trim } from '../utils/vehicleData.js';

const CarBuilder = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTrim, setSelectedTrim] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  // modal for payment estimator
  const [showEstimator, setShowEstimator] = useState(false);
  const openEstimator = () => setShowEstimator(true);
  const closeEstimator = () => setShowEstimator(false);
  // payment estimator
  // Add these states after your existing state declarations
  const [paymentType, setPaymentType] = useState('lease'); // 'lease' or 'finance'
  const [leaseDetails, setLeaseDetails] = useState({
    cashDown: '',
    creditScore: '',
    termLength: '',
    annualMileage: ''
  });
  const [financeDetails, setFinanceDetails] = useState({
    cashDown: '',
    creditScore: '',
    termLength: ''
  });

  // display print options for Print Build button
  const handlePrint = () => {
    window.print();
  };
  
  // payment estimator function
  // Add these functions after your existing functions
const calculateLeasePayment = () => {
  if (!selectedModel || !selectedTrim) return 0;
  
  const basePrice = Model.calculateBasePrice(selectedModel);
  const trimPrice = Trim.calculateTotalPrice(selectedTrim);;
  const packagesTotal = selectedPackages.reduce((sum, pkg) => sum + pkg.cost, 0);
  const totalPrice = basePrice + trimPrice + packagesTotal;
  
  // Simple lease calculation (you can make this more sophisticated)
  const capitalizedCost = totalPrice - (parseInt(leaseDetails.cashDown) || 0);
  const residualValue = totalPrice * 0.6; // 60% residual
  const depreciation = capitalizedCost - residualValue;
  const moneyFactor = getMoneyFactor(leaseDetails.creditScore);
  const financeCharge = (capitalizedCost + residualValue) * moneyFactor;
  
  return Math.round((depreciation + financeCharge) / (parseInt(leaseDetails.termLength) || 36));
};

const calculateFinancePayment = () => {
  if (!selectedModel || !selectedTrim) return 0;
  
  const basePrice = Model.calculateBasePrice(selectedModel);
  const trimPrice = selectedTrim.startingPrice;
  const packagesTotal = selectedPackages.reduce((sum, pkg) => sum + pkg.cost, 0);
  const totalPrice = basePrice + trimPrice + packagesTotal;
  
  const loanAmount = totalPrice - (parseInt(financeDetails.cashDown) || 0);
  const interestRate = getInterestRate(financeDetails.creditScore);
  const termMonths = parseInt(financeDetails.termLength) || 60;
  
  const monthlyRate = interestRate / 100 / 12;
  const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                  (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return Math.round(payment);
};

const getMoneyFactor = (creditScore) => {
  const scores = {
    'excellent': 0.0008,
    'good': 0.0012,
    'fair': 0.0018,
    'poor': 0.0025,
    'extremely-poor': 0.0035
  };
  return scores[creditScore] || 0.0018;
};

const getInterestRate = (creditScore) => {
  const rates = {
    'excellent': 3.5,
    'good': 4.5,
    'fair': 6.0,
    'poor': 8.5,
    'extremely-poor': 12.0
  };
  return rates[creditScore] || 6.0;
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
          <div className="bg-secondary text-white p-2 rounded">
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
                    <span className={`ms-2 ${step.active ? 'text-dark fw-bold' : 'text-muted'}`}>
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
                        <strong>Body Type:</strong> {selectedModel.bodyName} | 
                        <strong> Year:</strong> {selectedModel.year} | 
                        <strong> Starting Price:</strong> ${Model.calculateBasePrice(selectedModel).toLocaleString()}
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
      <h5>Building: {Model.getDisplayName(selectedModel)} - {selectedTrim.name}</h5>
      <p className="mb-0">Add optional packages to customize your vehicle</p>
    </div>
    <h3 className="mb-4">Add Packages</h3>
    <div className="row">
      {selectedTrim.trimPackages && selectedTrim.trimPackages.length > 0 ? (
        selectedTrim.trimpPackages.map((packageObj, index) => {
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
                <button className="btn btn-outline-secondary d-print-none" onClick={handlePrint}>Print Build</button>
                <button className="btn btn-outline-primary mt-2" onClick={openEstimator}>Use Payment Estimator</button>           
              </div>
            </div>      
          </div>      
        </div>
{/* Payment Estimator Modal */}
{showEstimator && (
  <>
    <div className="modal fade show d-block" role="dialog" aria-modal="true" style={{ zIndex: 1050 }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Payment Estimator</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setShowEstimator(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Left Side - Inputs */}
              <div className="col-md-6">
                {/* Payment Type Tabs */}
                <ul className="nav nav-tabs mb-4">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${paymentType === 'lease' ? 'active' : ''}`}
                      onClick={() => setPaymentType('lease')}
                    >
                      Lease
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${paymentType === 'finance' ? 'active' : ''}`}
                      onClick={() => setPaymentType('finance')}
                    >
                      Finance
                    </button>
                  </li>
                </ul>

                {/* Lease Form */}
                {paymentType === 'lease' && (
                  <div>
                    <h6>Lease Details</h6>
                    <div className="mb-3">
                      <label className="form-label">Cash Down Payment</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={leaseDetails.cashDown}
                        onChange={(e) => setLeaseDetails({...leaseDetails, cashDown: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Credit Score</label>
                      <select 
                        className="form-select"
                        value={leaseDetails.creditScore}
                        onChange={(e) => setLeaseDetails({...leaseDetails, creditScore: e.target.value})}
                      >
                        <option value="">Select Credit Score</option>
                        <option value="excellent">Excellent (750+)</option>
                        <option value="good">Good (700-749)</option>
                        <option value="fair">Fair (650-699)</option>
                        <option value="poor">Poor (600-649)</option>
                        <option value="extremely-poor">Extremely Poor (Below 600)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Lease Term</label>
                      <select 
                        className="form-select"
                        value={leaseDetails.termLength}
                        onChange={(e) => setLeaseDetails({...leaseDetails, termLength: e.target.value})}
                      >
                        <option value="">Select Term</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                        <option value="48">48 Months</option>
                        <option value="60">60 Months</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Annual Mileage</label>
                      <select 
                        className="form-select"
                        value={leaseDetails.annualMileage}
                        onChange={(e) => setLeaseDetails({...leaseDetails, annualMileage: e.target.value})}
                      >
                        <option value="">Select Mileage</option>
                        <option value="10000">10,000 miles</option>
                        <option value="12000">12,000 miles</option>
                        <option value="15000">15,000 miles</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Finance Form */}
                {paymentType === 'finance' && (
                  <div>
                    <h6>Finance Details</h6>
                    <div className="mb-3">
                      <label className="form-label">Down Payment</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={financeDetails.cashDown}
                        onChange={(e) => setFinanceDetails({...financeDetails, cashDown: e.target.value})}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Credit Score</label>
                      <select 
                        className="form-select"
                        value={financeDetails.creditScore}
                        onChange={(e) => setFinanceDetails({...financeDetails, creditScore: e.target.value})}
                      >
                        <option value="">Select Credit Score</option>
                        <option value="excellent">Excellent (750+)</option>
                        <option value="good">Good (700-749)</option>
                        <option value="fair">Fair (650-699)</option>
                        <option value="poor">Poor (600-649)</option>
                        <option value="extremely-poor">Extremely Poor (Below 600)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Loan Term</label>
                      <select 
                        className="form-select"
                        value={financeDetails.termLength}
                        onChange={(e) => setFinanceDetails({...financeDetails, termLength: e.target.value})}
                      >
                        <option value="">Select Term</option>
                        <option value="24">24 Months</option>
                        <option value="36">36 Months</option>
                        <option value="48">48 Months</option>
                        <option value="60">60 Months</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Payment Summary */}
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">
                      {paymentType === 'lease' ? 'Lease' : 'Finance'} Payment Summary
                    </h6>
                  </div>
                  <div className="card-body">
                    {selectedModel && selectedTrim && (
                      <div>
                        <div className="d-flex justify-content-between mb-2">
                          <span>Vehicle Price:</span>
                          <span>${totalPrice.toLocaleString()}</span>
                        </div>
                        
                        {paymentType === 'lease' ? (
                          <>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Cash Down:</span>
                              <span>-${(parseInt(leaseDetails.cashDown) || 0).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Residual Value:</span>
                              <span>${Math.round(totalPrice * 0.6).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Term:</span>
                              <span>{leaseDetails.termLength || '36'} months</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Annual Mileage:</span>
                              <span>{leaseDetails.annualMileage || '12,000'} miles</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between h5">
                              <span>Estimated Monthly Payment:</span>
                              <span className="text-primary">
                                ${calculateLeasePayment().toLocaleString()}/month
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Down Payment:</span>
                              <span>-${(parseInt(financeDetails.cashDown) || 0).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Loan Amount:</span>
                              <span>${(totalPrice - (parseInt(financeDetails.cashDown) || 0)).toLocaleString()}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Interest Rate:</span>
                              <span>{getInterestRate(financeDetails.creditScore)}%</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span>Term:</span>
                              <span>{financeDetails.termLength || '60'} months</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between h5">
                              <span>Estimated Monthly Payment:</span>
                              <span className="text-primary">
                                ${calculateFinancePayment().toLocaleString()}/month
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={() => setShowEstimator(false)}>
              Close
            </button>
            <button className="btn btn-primary" onClick={() => setShowEstimator(false)}>
              Print Estimate
            </button>
          </div>
        </div>
      </div>
    </div>
    <div 
      className="modal-backdrop fade show" 
      onClick={() => setShowEstimator(false)}
      style={{ zIndex: 1040 }}
    ></div>
  </>
)}      
      </div>

      
  );
};

export default CarBuilder;