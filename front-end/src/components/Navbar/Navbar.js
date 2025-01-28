import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({user, handleLogout}) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AnalysisDocuments
        </Link>
        <ul className="navbar-menu">
          {user ? (
            <li className="navbar-item">
              <button onClick={handleLogout} className="auth-button">
                Logout
              </button>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/auth/login" className="auth-button">Log in</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;