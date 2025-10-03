import React from 'react';
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
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark custom-navbar'>
        <div className='container-fluid'>
          <ul className="navbar-nav me-auto">
            <li className="nav-item-logo">
              <Link className="nav-link custom-nav-link" to="/home">LOGO</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item-custom-margin">
              <Link className="nav-link custom-nav-link" to="/models">VEHICLES</Link>
            </li>
            <li className="nav-item-custom-margin">
              <Link className="nav-link custom-nav-link" to="/about">ABOUT</Link>
            </li>
          </ul>
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
    </Router>
  );
}

export default App;