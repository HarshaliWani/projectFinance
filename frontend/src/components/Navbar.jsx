import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login on logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Finance Manager</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link> {/* ✅ Added Home option */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={isLoggedIn ? "/dashboard" : "/login"}>Dashboard</Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-light" onClick={handleLogout}>Logout</button> {/* ✅ Styled same as Login */}
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-light" to="/login">Login</Link> {/* ✅ Button styling */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
