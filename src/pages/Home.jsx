import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import VehicleService from '../services/VehicleService';

const Home = () => {
  const [ models, setModels ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const vehicleService = new VehicleService;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        console.log('Fetching models...');
        const carModels = await vehicleService.fetchModelsWithTrims();
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

  // get random models from carModels
  const pickRandom = (modelsArr, num) => {
    const modelsArrCopy = [...modelsArr];
    const randomResult = [];
    while (randomResult.length < num && modelsArrCopy.length > 0){
      //get random index between 0 and array copy length - 1
      const index = Math.floor(Math.random() * modelsArrCopy.length);
      //get one element from array copy (first/only element[0]) and push it to results array
      randomResult.push(modelsArrCopy.splice(index, 1)[0]);
    } 
    return randomResult;
  }

  // only create featured models when query is successful
  const featuredModels = models.length > 0 ? pickRandom(models, 6)
  : [];
 
  //split randomResult into chunks for carousel slides
  const chunkArray = (randomResult, size) => {
    const chunks = [];
    for(let i=0;i<randomResult.length;i+=size){
      // grab chunks of size and push into array eg. (0, 3) A-C (3, 6) D-F etc.
      chunks.push(randomResult.slice(i, i+size));
    }
    return chunks;
  };
  // pass desired number of divisions
  const slides = chunkArray(featuredModels, 3);
  console.log(slides.length);


  
  return (
   <>
      {/* Carousel */}
      <div className='carousel-wrapper'>
          <div id="carCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img src="/images/AI_car_carousel.png" className="d-block w-100" alt="Car 1" />
                </div>
                <div className="carousel-item">
                <img src="/images/AI_car2_carousel.png" className="d-block w-100" alt="Car 2" />
                </div>
            </div>

            {/* Arrows */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
      </div>



<div className="container-fluid py-5 px-0">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">AutoBuilder</h1>
        <p className="lead">Design your own dream car by selecting models, features, and packages.</p>
      </header>

      {/* Action Cards */}
      <div className="row">
        <div className="col mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Start Building</h5>
              <p className="card-text">Choose your model, features, and get a live price estimate.</p>
              <a href="/builder" className="btn btn-secondary">Start Now</a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">View Models</h5>
              <p className="card-text">Browse our available car models and compare specs.</p>
              <a href="/models" className="btn btn-outline-secondary">Explore Models</a>
            </div>
          </div>
        </div>
      </div>

      {/* Featured models used sample/dummy array */}

      <div>
        <h2 className="display-8 fw-bold">Featured Models</h2>
        <div id="modelsCarousel" className="carousel slide position-relative" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* First slide - 3 cards */}
            {slides.map((slideModels, slideIndex) => (
            <div className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`} key={slideIndex}>
              <div className="row">
                {slideModels.map((model) => (
                  <div className="col-md-4" key={model.id}>
                    <div className="model-card position-relative">
                      <div>
                      <img 
                        src="/images/AI_car_carousel.png" 
                        className="d-block w-100" 
                        alt={`${model.year} ${model.name}`}
                      />
                        <h5 className="card-title">{`${model.year} ${model.name}`}</h5>
                      </div>
                    
                    </div>
                    {/* Buttons for lower carousel*/}
                    <div className='row mt-3'>
                        <div className='col-md-4 mb-2 custom-margin-left'>
                          <button
                            className="btn btn-dark"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/models/${model.id}`);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                        <div className='col-md-4 mb-2 custom-margin-left'>
                          <Link to={`/builder?model=${model.id}`} className="btn btn-secondary" onClick={(e) => e.stopPropagation()}>
                            Build Model
                          </Link>                  
                        </div>
                      </div>

                  </div>
                ))}
              </div>
            </div>
          ))}


          {/* Carousel Controls*/}
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target="#modelsCarousel" 
            data-bs-slide="prev"
            style={{ 
              left: '-60px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 10,
              position: 'absolute'
            }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target="#modelsCarousel" 
            data-bs-slide="next"
            style={{ 
              right: '-60px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 10,
              position: 'absolute'
            }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Home;