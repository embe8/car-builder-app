import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ModelsList from './components/ModelsList';
import CarBuilder from './components/CarBuilder';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container container-fluid'>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/models">Vehicles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/:id" element={<Details />} /> 
          <Route path="/builder" element={<CarBuilder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;