import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ModelsList from './components/ModelsList';
import CarBuilder from './components/CarBuilder';
import Details from './components/Details';
import About from './pages/About';

import './styles/App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Brand/Logo */}
          <Link className="navbar-brand" to="/home">
            LOGO
          </Link>
          
          {/* Mobile toggle button */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/models">
                  VEHICLES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  ABOUT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/:id" element={<Details />} /> 
          <Route path="/builder" element={<CarBuilder />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
     {/* Footer */}
     <footer className="bg-dark text-light mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>Car Configurator</h5>
              <p className="text-white">
                Build and customize your dream car with our interactive configurator.
              </p>
            </div>
            
            <div className="col-md-4 mb-3">
              <h6>Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/home" className="text-light text-decoration-none">Home</Link></li>
                <li><Link to="/models" className="text-light text-decoration-none">Vehicles</Link></li>
                <li><Link to="/builder?model=null" className="text-light text-decoration-none">Car Builder</Link></li>
                <li><Link to="/about" className="text-light text-decoration-none">About</Link></li>
              </ul>
            </div>
            
            <div className="col-md-4 mb-3">
              <h6>Contact Info</h6>
              <ul className="list-unstyled text-white">
                <li><i className="fas fa-envelope me-2"></i>contact@carconfig.com</li>
                <li><i className="fas fa-phone me-2"></i>(555) 123-4567</li>
                <li><i className="fas fa-map-marker-alt me-2"></i>123 Auto Street, Car City</li>
              </ul>
            </div>
          </div>
          
          <hr className="my-3" />
          
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-white">
                &copy; 2025 Portfolio Project. Built with React & Supabase for demonstration purposes.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="social-links">
                <a href="#" className="text-white me-3">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white me-3">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-light me-3">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;