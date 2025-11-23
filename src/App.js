import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import City from "./pages/City";
import Bookings from "./pages/Bookings";


function App() {
    return (
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/city/:name" element={<City />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </main>
        </div>
      );
    }
export default App;
