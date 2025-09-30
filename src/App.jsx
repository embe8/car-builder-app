import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ModelsList from './components/ModelsList';
import CarBuilder from './components/CarBuilder';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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