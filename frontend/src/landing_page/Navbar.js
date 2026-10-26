import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link className="navbar-logo" to="/" onClick={closeMenu}>
          <img src="/media/images/logo.svg" alt="Zerodha" />
        </Link>

        {/* Main navigation links */}
        <div className="navbar-links">
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>

          <NavLink to="/about" className="navbar-link">
            About
          </NavLink>

          <NavLink to="/product" className="navbar-link">
            Products
          </NavLink>

          <NavLink to="/pricing" className="navbar-link">
            Pricing
          </NavLink>

          <NavLink to="/support" className="navbar-link">
            Support
          </NavLink>
        </div>

        {/* Three-line hamburger menu */}
        <button
          type="button"
          className={`hamburger-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="hamburger-dropdown">
            <h6>Menu</h6>

            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/signup" onClick={closeMenu}>
              Signup / Login
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              About Us
            </NavLink>

            <NavLink to="/product" onClick={closeMenu}>
              Products
            </NavLink>

            <NavLink to="/pricing" onClick={closeMenu}>
              Pricing
            </NavLink>

            <NavLink to="/support" onClick={closeMenu}>
              Support
            </NavLink>

            <hr />

            <a
              href="https://zerodha.com/varsity/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Varsity
            </a>

            <a
              href="https://tradingqna.com/"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Trading Q&A
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;