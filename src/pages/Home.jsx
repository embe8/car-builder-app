import React from 'react';

const Home = () => {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">AutoBuilder</h1>
        <p className="lead">Design your own dream car by selecting models, features, and packages.</p>
      </header>

      {/* Carousel */}
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

      {/* Action Cards */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Start Building</h5>
              <p className="card-text">Choose your model, features, and get a live price estimate.</p>
              <a href="/builder" className="btn btn-primary">Start Now</a>
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

      {/* Popular Models Section - FIXED with proper positioning */}
      <div>
        <h2 className="display-8 fw-bold">Featured Models</h2>
        <div id="modelsCarousel" className="carousel slide position-relative" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* First slide - 3 cards */}
            <div className="carousel-item active">
              <div className="row">
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model1">
                      <img 
                        src="/images/AI_car_carousel.png" 
                        className="d-block w-100" 
                        alt="Model1"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 1</h5>
                      </div>
                    </a>
                  </div>   
                </div>
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model2">
                      <img 
                        src="/images/AI_car2_carousel.png" 
                        className="d-block w-100" 
                        alt="Model2"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 2</h5>
                      </div>
                    </a>
                  </div>  
                </div>
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model3">
                      <img 
                        src="/images/AI_car_carousel.png" 
                        className="d-block w-100" 
                        alt="Model3"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 3</h5>
                      </div>
                    </a>
                  </div>  
                </div>
              </div>
            </div>

            {/* Second slide - 3 more cards */}
            <div className="carousel-item">
              <div className="row">
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model4">
                      <img 
                        src="/images/AI_car2_carousel.png" 
                        className="d-block w-100" 
                        alt="Model4"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 4</h5>
                      </div>
                    </a>
                  </div>   
                </div>
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model5">
                      <img 
                        src="/images/AI_car_carousel.png" 
                        className="d-block w-100" 
                        alt="Model5"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 5</h5>
                      </div>
                    </a>
                  </div>  
                </div>
                <div className="col-md-4">
                  <div className="model-card position-relative">
                    <a href="/models/model6">
                      <img 
                        src="/images/AI_car2_carousel.png" 
                        className="d-block w-100" 
                        alt="Model6"
                      />
                      <div className="overlay">
                        <h5 className="card-title">Model 6</h5>
                      </div>
                    </a>
                  </div>  
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Controls - Moved inside carousel and positioned further left/right */}
          <button 
            className="carousel-control-prev" 
            type="button" 
            data-bs-target="#modelsCarousel" 
            data-bs-slide="prev"
            style={{ left: '-50px' }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button 
            className="carousel-control-next" 
            type="button" 
            data-bs-target="#modelsCarousel" 
            data-bs-slide="next"
            style={{ right: '-50px' }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;