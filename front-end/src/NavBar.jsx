import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
        <h1>BrighterBeginnings</h1>
        <div className="links">
            <Link to="/about">About</Link>
        </div>
    </nav>
  );
};
export default NavBar;

