import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>BrighterBeginnings</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/cities">Cities</Link>
        <Link to="/organizations">Organizations</Link>
        <Link to="/scholarships">Scholarships</Link>
      </div>
    </nav>
  );
};
export default NavBar;
