import React from "react";
import { Link } from "react-router-dom";
import { cities } from "../Data";
import '../styles/App.css'
import hero1 from '../assets/hero1.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import hero4 from '../assets/hero4.jpg';
import hero5 from '../assets/hero5.jpg';

function Home() {
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-gallery" aria-hidden="true">
          <img className="gimg g1" src={hero1} alt="Hero 1" />
         <img className="gimg g2" src={hero2} alt="Hero 2" />
         <img className="gimg g3" src={hero3} alt="Hero 3" />
          <img className="gimg g4" src={hero4} alt="Hero 4" />
          <img className="gimg g5" src={hero5} alt="Hero 5" />
        </div>
        <div className="hero-inner">
          <h1>Welcome to Lebanon</h1>
          <p>Click a city to explore its landmarks, hotels and restaurants.</p>
        </div>
      </div>
      <section className="cities-grid page-content-bg">
        {cities.map((city) => (
          <article
            key={city.name}
            className="city-card card"
            role="button"
            tabIndex="0"
            onClick={() => window.location.href = `/city/${city.name}`}
            onKeyDown={(e) => { if(e.key === "Enter") window.location.href = `/city/${city.name}`; }}
          >
            <img src={city.images[0].src} alt={city.name} />
            <div className="card-body">
              <h3 className="title">{city.name}</h3>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Home;

