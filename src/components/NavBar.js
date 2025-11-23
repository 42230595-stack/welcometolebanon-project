import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Welcome to Lebanon</Link>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/bookings">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;
